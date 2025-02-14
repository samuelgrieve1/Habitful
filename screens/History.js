import { View, Text, Button, ScrollView, Pressable } from 'react-native';
import { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Styles, LightMode, DarkMode } from '../components/styles/Styles';
import { ThemeContext } from '../components/Contexts';
import { Feather } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import HistoryList from './history/HistoryList';
import HistoryCalendar from './history/HistoryCalendar';
import { parse, compareAsc, formatDistance, differenceInCalendarMonths, endOfYesterday } from 'date-fns';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { format, parseISO } from 'date-fns';
import EditHistory from '../components/EditHistory';
import Modal from 'react-native-modal';
import { db, doc, collection, getDocs, updateDoc, arrayUnion, arrayRemove, deleteDoc, getDoc, setDoc, addDoc, listCollections, query } from '../firebase/index';
import EditHabit from '../components/EditHabit';
import Collapsible from 'react-native-collapsible';

// const Stack = createStackNavigator({
//   screens: {
//     List: HistoryList,
//     Calendar: HistoryCalendar,
//   },
// });

export default function History() {
  const [refreshing, setRefreshing] = useState(false);
  const {theme} = useContext(ThemeContext)
  const [completions, setCompletions] = useState([])
  const [completionsSorted, setCompletionsSorted] = useState([])
  const [earliestMonth, setEarliestMonth] = useState(0)
  const [historyView, setHistoryView] = useState('calendarview')
  const [modalVisibleEditHistory, setModalVisibleEditHistory] = useState(false);
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
  const [habits, setHabits] = useState(null)
  const [currentDate, setCurrentDate] = useState(null)
  const [selectedHabitId, setSelectedHabitId] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)

  // GET HABITS FROM DB AND ADD TO STATE
  const getHabits = async () => {
    const habitsSnapshot = await getDocs(collection(db, "habits"))
    // Check if any habits exist before updating state
    if(habitsSnapshot.docs.length > 0){
      setHabits(
        habitsSnapshot.docs.map((doc)=>({
          ...doc.data(),
          id: doc.id
        }))
      )
    } else {
      setHabits(null)
    }
  }

  // WAS HABIT COMPLETED TODAY?
  const checkedOrUnchecked = (habit) => {
    if(completions != null){
      if(completions[selectedDate]){
        return completions[selectedDate].includes(habit.name)
      }
      return false
    }
  }

  // ADD COMPLETED HABIT TO STORE, Update STYLING of CHECK MARK and NAME
  const addCompletedHabit = async (habitId, habitName, isCompleted) => {
    if(!isCompleted){ 
      await updateDoc(doc(db, "completions", "dates"), {
        [selectedDate]: arrayUnion(habitName)       
      })
    } else {
      await updateDoc(doc(db, "completions", "dates"), {
        [selectedDate]: arrayRemove(habitName)         
      })
    }
    getHabits()
    getCompletions()
  }

  // CLOSE MODAL FROM CHILD COMPONENT
  const closeModalEditHistory = () => {
    setModalVisibleEditHistory(!modalVisibleEditHistory)
    console.log('ppp')
  }

  // RELOAD COMPLETIONS
  const onRefresh = useCallback(() => {
    getCompletions()
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // GET COMPLETIONS FROM DB AND ADD TO STATE
  const getCompletions = async () => {
    const docRef = doc(db, "completions", "dates");
    const completionsSnapshot = await getDoc(docRef);
    setCompletions(completions => ({
      ...completions,
      ...completionsSnapshot.data()
    }))
  }

  // SORT COMPLETIONS BY DATE
  const entriesArray = Object.entries(completions);

  // ASCENDING
  const sortedArrayAsc = entriesArray.sort((a, b) => {
    const dateA = new Date(a[0]);
    const dateB = new Date(b[0]);
    if (dateA.getTime() < dateB.getTime()) return -1;
    if (dateA.getTime() > dateB.getTime()) return 1;
    return 0;
  });
  const sortedStateAsc = Object.fromEntries(sortedArrayAsc);
  
  // DESCENDING
  const sortedArrayDes = entriesArray.sort((a, b) => {
    const dateA = new Date(a[0]);
    const dateB = new Date(b[0]);
    if (dateA.getTime() < dateB.getTime()) return 1;
    if (dateA.getTime() > dateB.getTime()) return -1;
    return 0;
  });
  const sortedStateDes = Object.fromEntries(sortedArrayDes);

  // CALCULATE DIFFERENCE IN MONTHS BETWEEN EARLIEST MONTH COMPLETED AND NOW
  const earliestMonthCompleted = () => {
    const keys = Object.keys(sortedStateAsc)
    const firstDate = keys[0]
    const lastDate = keys[keys.length - 1]
    setEarliestMonth(differenceInCalendarMonths(lastDate, firstDate))
  }

  useEffect (() => {
    setCurrentDate(new Date().toDateString())
    getCompletions()
    getHabits()
  }, [])

  useEffect (() => {
    setCompletionsSorted(sortedStateDes)
    earliestMonthCompleted()
    //setEarliestMonth()
  }, [completions])

  const calendarThemeLm = {
    agendaKnobColor: '#000',
    calendarBackground: '#fff',
    todayTextColor: '#4185e7',
    indicatorColor: '#4185e7',
    dayTextColor: '#000',
    //selectedDayTextColor: 'pink',
    //selectedDayBackgroundColor: 'pink',
    monthTextColor: '#000',
    arrowColor: '#000',
    textSectionTitleColor: '#757575',
    textDisabledColor: '#757575',
    textInactiveColor: 'pink',
  }

  const calendarThemeDm = {
    agendaKnobColor: '#fff',
    calendarBackground: '#000',
    todayTextColor: '#4185e7',
    indicatorColor: '#4185e7',
    dayTextColor: '#fff',
    //selectedDayTextColor: 'pink',
    //selectedDayBackgroundColor: 'pink',
    monthTextColor: '#fff',
    arrowColor: '#fff',
    textSectionTitleColor: '#757575',
    textDisabledColor: '#757575',
    textInactiveColor: 'pink',
  }

  let markedDay = {}

  if(completionsSorted){
    Object.keys(completionsSorted).map(date => {
      markedDay[format(date, 'yyyy-MM-dd')] = {
        selected: true,
        marked: true,
        selectedColor: '#4185e7',
      };
    })
  }


  // [day]: { selected: true, marked: true, selectedColor: "blue" }

  return (
    <>
      <View style={Styles.pageHeaderContainer}>
        <View style={Styles.pageHeaderLeft}></View>
        <View style={Styles.pageHeaderCenter}>
          <Text style={theme == LightMode ? Styles.pageHeaderCenterTitleLm : Styles.pageHeaderCenterTitleDm}>
            History
          </Text>
          <Text style={theme == LightMode ? Styles.pageHeaderCenterSubTitleLm : Styles.pageHeaderCenterSubTitleDm}>
            Review and Make Changes
          </Text>
        </View>
        <View style={Styles.pageHeaderRight}></View>
      </View>

      {/* TABS */}
      <View style={Styles.historyViewBtnContainer}>

        <Pressable
          onPress={() => setHistoryView('listview')}
          style={
            theme == LightMode && historyView == 'listview' && Styles.historyViewBtnSelectedLm  ||
            theme == DarkMode && historyView == 'listview' && Styles.historyViewBtnSelectedDm  ||
            Styles.historyViewBtn}>
          <Text
            style={
              theme == LightMode && historyView == 'listview' && Styles.historyViewBtnTxtSelectedLm ||
              theme == DarkMode && historyView == 'listview' && Styles.historyViewBtnTxtSelectedDm ||
              theme == LightMode && Styles.historyViewBtnTxtLm ||
              theme == DarkMode && Styles.historyViewBtnTxtDm}>
              List
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setHistoryView('calendarview')}
          style={
            theme == LightMode && historyView == 'calendarview' && Styles.historyViewBtnSelectedLm  ||
            theme == DarkMode && historyView == 'calendarview' && Styles.historyViewBtnSelectedDm  ||
            Styles.historyViewBtn}>
          <Text
            style={
              theme == LightMode && historyView == 'calendarview' && Styles.historyViewBtnTxtSelectedLm ||
              theme == DarkMode && historyView == 'calendarview' && Styles.historyViewBtnTxtSelectedDm ||
              theme == LightMode && Styles.historyViewBtnTxtLm ||
              theme == DarkMode && Styles.historyViewBtnTxtDm}>
              Calendar
          </Text>
        </Pressable>
        
        {/* <View style={theme == LightMode ? Styles.historyViewBtnLm : Styles.historyViewBtnDm}>
        <Pressable
          onPress={() => setHistoryView('listview')}
          style={
            theme == LightMode && historyView == 'listview' && Styles.historyViewBtnSelectedLm ||
            theme == DarkMode && historyView == 'listview' && Styles.historyViewBtnSelectedDm}>
          <Text style={theme == LightMode ? Styles.historyViewBtnTxtLm : Styles.historyViewBtnTxtDm}>List</Text>
        </Pressable>
        </View>

        <View style={theme == LightMode ? Styles.historyViewBtnLm : Styles.historyViewBtnDm}>
        <Pressable
          onPress={() => setHistoryView('calendarview')}
          style={
            theme == LightMode && historyView == 'calendarview' && Styles.historyViewBtnSelectedLm ||
            theme == DarkMode && historyView == 'calendarview' && Styles.historyViewBtnSelectedDm}>
          <Text style={theme == LightMode ? Styles.historyViewBtnTxtLm : Styles.historyViewBtnTxtDm}>Calendar</Text>
        </Pressable>
        </View> */}

      </View>

      {/* VIEWS */}
      <View style={Styles.historyContainer}>

        {/* LIST VIEW */}
        <HistoryList
          refreshing={refreshing}
          onRefresh={onRefresh}
          historyView={historyView}
          completionsSorted={completionsSorted}
          setModalVisibleEditHistory={setModalVisibleEditHistory}
          setSelectedDate={setSelectedDate}
          // markingType={'multi-dot'}
        />
        
        {/*
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {historyView == 'listview' &&
            <View style={Styles.listViewContainer}>
              {completionsSorted && Object.keys(completionsSorted).map((date, i) => (
                <View key={i} style={theme == LightMode ? Styles.dateBoxLm : Styles.dateBoxDm}>
                  <Pressable onPress={() => {setModalVisibleEditHistory(true); setSelectedDate(date);}} style={theme == LightMode ? Styles.editHistoryIconContainerLm : Styles.editHistoryIconContainerDm}>
                    {/* <Feather name="edit-2" size={18} color='white' style={theme == LightMode ? Styles.editHistoryIconLm : Styles.editHistoryIconDm} /> */}
                    {/* <Text style={theme == LightMode ? Styles.editHistoryIconLm : Styles.editHistoryIconDm}>Edit</Text>
                  </Pressable>
                  <Text style={theme == LightMode ? Styles.dateTitleLm : Styles.dateTitleDm}>{format(date, 'EEEE, MMM dd, yyyy')}</Text>
                  <Collapsible collapsed={true}>
                  {completionsSorted[date].map((habit, i) => (
                    <Text style={theme == LightMode ? Styles.historyHabitNameLm : Styles.historyHabitNameDm} key={i}><Feather name="check" size={14} color="green" /> {habit}</Text>
                  ))}
                  </Collapsible>
                </View>
              ))}
            </View>
          }
        </ScrollView> */}

        {/* CALENDAR VIEW */}
        {historyView == 'calendarview' &&
          <View style={Styles.calendarViewContainer}>
            <CalendarList
              pastScrollRange={earliestMonth}
              futureScrollRange={0}
              key={theme == LightMode ? 'calendarLm' : 'calendarDm'}
              theme={theme == LightMode ? calendarThemeLm : calendarThemeDm}
              onDayPress={day => {
                setModalVisibleEditHistory(true); setSelectedDate(format(parseISO(day['dateString']), 'EEE MMM dd yyyy'));
              }}
              markedDates={markedDay}
              maxDate={format(endOfYesterday(), 'EEE MMM dd yyyy')}
            />
          </View>
        }
      </View>

      {/* EDIT HISTORY FORM */}
      <Modal
        style={Styles.modal}
        propagateSwipe={true}
        isVisible={modalVisibleEditHistory}
        onBackdropPress={() => setModalVisibleEditHistory(false)}
      >
        <View style={theme == LightMode ? Styles.modalView_lm : Styles.modalView_dm}>
          <EditHistory
            habits={habits}
            completions={completions}
            getCompletions={getCompletions}
            addCompletedHabit={addCompletedHabit}
            closeModal={closeModalEditHistory}
            checkedOrUnchecked={checkedOrUnchecked}
            setSelectedHabitId={setSelectedHabitId}
            selectedDate={selectedDate}
          />
        </View>
      </Modal>
    </>
  )
}