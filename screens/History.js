import { View, Text, Button, ScrollView, Pressable } from 'react-native';
import { useState, useEffect, useContext, useCallback } from 'react';
import { Styles, LightMode, DarkMode } from '../components/styles/Styles';
import { ThemeContext, CustomColorContext } from '../components/Contexts';
import HistoryList from './history/HistoryList';
import { parse, compareAsc, formatDistance, differenceInCalendarMonths, endOfYesterday } from 'date-fns';
import { format, parseISO } from 'date-fns';
import EditHistory from '../components/history/EditHistory';
import Modal from 'react-native-modal';
import { db, doc, collection, getDocs, updateDoc, arrayUnion, arrayRemove, deleteDoc, getDoc, setDoc, addDoc, listCollections, query } from '../firebase/index';
import ScrollableCalendar from './history/ScrollableCalendar';

export default function History() {
  const [refreshing, setRefreshing] = useState(false);
  const {theme} = useContext(ThemeContext)
  const {customColor} = useContext(CustomColorContext)
  const [completions, setCompletions] = useState([])
  const [completionsSorted, setCompletionsSorted] = useState([])
  const [earliestMonth, setEarliestMonth] = useState(0)
  const [historyView, setHistoryView] = useState('listview')
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
  const addCompletedHabit = async (habitName, isCompleted) => {
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
    console.log(Object.keys(completions))
  }, [completions])

  const calendarTheme = {
    agendaKnobColor: '#000',
    calendarBackground: '#fff',
    todayTextColor: customColor ? customColor : '#4185e7',
    indicatorColor: customColor ? customColor : '#4185e7',
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
    todayTextColor: customColor ? customColor : '#4185e7',
    indicatorColor: customColor ? customColor : '#4185e7',
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
        selectedColor: customColor ? customColor : '#4185e7',
      };
    })
  }

  return (
    <View style={Styles.screenContainer}>
      <View style={Styles.pageHeaderContainer}>
        <View style={Styles.pageHeaderLeft}></View>
        <View style={Styles.pageHeaderCenter}>
          <Text
            style={[
              Styles.pageHeaderCenterTitle,
              theme == DarkMode && Styles.pageHeaderCenterTitleDm
            ]}
          >
            History
          </Text>
          <Text
            style={[
              Styles.pageHeaderCenterSubTitle,
              theme == DarkMode && Styles.pageHeaderCenterSubTitleDm
            ]}
          >
            Review and Make Changes
          </Text>
        </View>
        <View style={Styles.pageHeaderRight}></View>
      </View>

      {/* TABS */}
      <View style={Styles.historyViewBtnContainer}>

        <Pressable
          onPress={() => setHistoryView('listview')}
          style={[
            Styles.historyViewBtn,
            historyView == 'listview' && Styles.historyViewBtnSelected,
            theme == DarkMode && historyView == 'listview' && Styles.historyViewBtnSelectedDm && {backgroundColor: customColor}
          ]}>
          <Text
            style={[
              Styles.historyViewBtnTxt,
              historyView == 'listview' && Styles.historyViewBtnTxtSelected,
              theme == DarkMode && historyView == 'listview' && Styles.historyViewBtnTxtDm && Styles.historyViewBtnTxtSelectedDm
            ]}>
              List
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setHistoryView('calendarview')}
          style={[
            Styles.historyViewBtn,
            historyView == 'calendarview' && Styles.historyViewBtnSelected,
            theme == DarkMode && historyView == 'calendarview' && Styles.historyViewBtnSelectedDm && {backgroundColor: customColor}
          ]}>
          <Text
            style={[
              Styles.historyViewBtnTxt,
              historyView == 'calendarview' && Styles.historyViewBtnTxtSelected,
              theme == DarkMode && historyView == 'calendarview' && Styles.historyViewBtnTxtDm && Styles.historyViewBtnTxtSelectedDm
            ]}>
              Calendar
          </Text>
        </Pressable>

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
        />

        {/* CALENDAR VIEW */}
        {historyView == 'calendarview' && earliestMonth > 0 &&
          <ScrollableCalendar
            eventDates={Object.keys(completions)}
          />
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
            completionsSorted={completionsSorted}
            getCompletions={getCompletions}
            addCompletedHabit={addCompletedHabit}
            closeModal={closeModalEditHistory}
            checkedOrUnchecked={checkedOrUnchecked}
            setSelectedHabitId={setSelectedHabitId}
            selectedDate={selectedDate}
          />
        </View>
      </Modal>
    </View>
  )
}