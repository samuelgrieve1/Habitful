import { Text, Pressable, View, ScrollView, StyleSheet, Dimensions, Image, SectionList } from 'react-native';
import Container from '../components/Container';
import { Styles, LightMode, DarkMode } from '../components/styles/Styles';
import { useState, useEffect, useContext } from 'react';
import { db, doc, collection, getDocs, updateDoc, arrayUnion, arrayRemove, deleteDoc, getDoc, setDoc, addDoc, listCollections, query } from '../firebase/index';
import ManageHabitsItem from '../components/habits/ManageHabitsItem';
import AddHabit from '../components/habits/AddHabit';
import EditHabit from '../components/habits/EditHabit';
import { ThemeContext, CustomColorContext } from '../components/Contexts';
import { Feather } from '@expo/vector-icons';
import { FlatList, TouchableOpacity } from 'react-native';
import DragList, {DragListRenderItemInfo} from 'react-native-draglist';
import Modal from 'react-native-modal';
import {Calendar, CalendarList, Agenda, WeekCalendar, CalendarProvider} from 'react-native-calendars';
import { format } from 'date-fns';
import DropdownMenu from '../components/DropdownMenu';
// import { getDoc } from 'firebase/firestore';

export default function Habits() {
  const [habits, setHabits] = useState(null)
  const [currentDate, setCurrentDate] = useState(null)
  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
  const [selectedHabitId, setSelectedHabitId] = useState(null)
  const {theme} = useContext(ThemeContext)
  const {customColor} = useContext(CustomColorContext)
  const [selectedHabitType, setSelectedHabitType] = useState('all')

  // Close modal from child component
  const closeModalAdd = () => {
    setModalVisibleAdd(!modalVisibleAdd)
  }
  const closeModalEdit = () => {
    setModalVisibleEdit(!modalVisibleEdit)
  }

  // GET HABITS FROM DB AND ADD TO STATE
  const getHabits = async () => {
    const habitsSnapshot = await getDocs(collection(db, "habits"))
    // Check if any habits exist before updating state
    if(habitsSnapshot.docs.length > 0){
      //console.log('poop', habitsSnapshot.docs[1].data()['isActive'])
      setHabits(
        habitsSnapshot.docs.map((doc)=>({
          ...doc.data(),
          id: doc.id
        }))
      )
    } else {
      setHabits('no habits')
    }
  }

  // ARCHIVE habit by setting iaActive status to false
  const archiveHabit = async() => {
    try {
      await updateDoc(doc(db, "habits", (selectedHabitId)), {
        isActive: false
      })
      getHabits()
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }
  
  // DELETE habit by setting iaActive status to false
  const deleteHabit = async() => {
    try {
      await deleteDoc(doc(db, "habits", (selectedHabitId)))
      getHabits()
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  // ADD HABIT BTN
  const addHabitBtn = () => {
    return(
    <Pressable style={[Styles.btnAdd, theme == DarkMode && Styles.btnAddDm]} onPress={() => setModalVisibleAdd(true)}>
      <Text style={[Styles.txtAdd, customColor && {color: customColor}]}>Add Habit</Text>
    </Pressable>
    )
  }

  const weekCalendarThemeLm = {
    agendaKnobColor: '#000',
    calendarBackground: '#fff',
    todayTextColor: '#4185e7',
    indicatorColor: '#4185e7',
    dayTextColor: '#000',
    monthTextColor: '#000',
    arrowColor: '#000',
    textSectionTitleColor: '#757575',
    textDisabledColor: '#757575',
    textInactiveColor: 'pink',
  }

  const weekCalendarThemeDm = {
    //textDayFontSize: 40,
    agendaKnobColor: '#fff',
    calendarBackground: '#000',
    todayTextColor: '#4185e7',
    indicatorColor: '#4185e7',
    dayTextColor: '#fff',
    monthTextColor: '#fff',
    arrowColor: '#fff',
    textSectionTitleColor: '#757575',
    textDisabledColor: '#757575',
    textInactiveColor: 'pink',
  }

  useEffect (() => {
    setCurrentDate(new Date().toDateString())
    getHabits()
  }, [])

  return (
    <View style={Styles.screenContainer}> 
      <View style={Styles.pageHeaderContainer}>
        <View style={Styles.pageHeaderLeft}>
          {/* <Pressable style={Styles.pageHeaderLeftPressable}>
            <Feather name="refresh-cw" size={24} style={[Styles.menuIcon, customColor && {color: customColor}]} />
          </Pressable> */}
        </View>
        <View style={Styles.pageHeaderCenter}>
          <Text
            style={[
              Styles.pageHeaderCenterTitle,
              theme == DarkMode && Styles.pageHeaderCenterTitleDm
            ]}
          >
            Habits
          </Text>
          <Text
            style={[
              Styles.pageHeaderCenterSubTitle,
              theme == DarkMode && Styles.pageHeaderCenterSubTitleDm
            ]}
          >
            Manage Your Habits
          </Text>
        </View>
        <View style={Styles.pageHeaderRight}>
          <Pressable style={Styles.pageHeaderRightPressable}>
            <Feather name="plus" size={24} style={[Styles.menuIcon, customColor && {color: customColor}]} />
          </Pressable>
        </View>
      </View>

      <View style={{paddingVertical: 20, paddingHorizontal: 0, flex: 1}}>
        
        {habits != null && habits != 'no habits' &&
          <DropdownMenu
            theme={theme}
            defaultValue={'all'}
            data={[
              {label: 'All', value: 'all'},
              {label: 'Active', value: 'active'},
              {label: 'Archived', value: 'archived'},
            ]}
            setSelectedMenuItem={setSelectedHabitType}
          />
        }

        {/* ALL HABITS */}
        {habits != null && habits != 'no habits' && selectedHabitType == 'all' &&
          <>
          <Text>All</Text>
          <FlatList
            style={Styles.habitsContainer}
            data={habits.sort((a, b) => a.name.localeCompare(b.name))}
            renderItem={({item}) => {
              // CHECK IF HABIT IS ACTIVE
              if(item.isActive == true){
                return(
                  <ManageHabitsItem
                    key={item.id}
                    habitId={item.id}
                    habitName={item.name}
                    currentDate={currentDate}
                    setSelectedHabitId={setSelectedHabitId}
                    setModalVisibleEdit={setModalVisibleEdit}
                  />
                )
              }
            }}
            keyExtractor={item => item.id}
            // ListFooterComponent={addHabitBtn}
          />
          {/* <SectionList
            style={Styles.habitsContainer}
            sections={habits.sort((a, b) => a.name.localeCompare(b.name))}
            renderItem={({item}) => {
              // CHECK IF HABIT IS ACTIVE
              if(item.isActive == true){
                return(
                  <ManageHabitsItem
                    key={item.id}
                    habitId={item.id}
                    habitName={item.name}
                    currentDate={currentDate}
                    setSelectedHabitId={setSelectedHabitId}
                    setModalVisibleEdit={setModalVisibleEdit}
                  />
                )
              }
            }}
            renderSectionHeader={({section: {item}}) => (
              <Text style={{color:'white'}}>Active</Text>
            )}
            keyExtractor={item => item.id}
            // ListFooterComponent={addHabitBtn}
          /> */}
          <View style={Styles.btnAddBox}>
            <Pressable style={[Styles.btnAdd, theme == DarkMode && Styles.btnAddDm]} onPress={() => setModalVisibleAdd(true)}>
              <Text style={[Styles.txtAdd, customColor && {color: customColor}]}>Add Habit</Text>
            </Pressable>
          </View>
          </>
        }
        
        {/* ACTIVE HABITS */}
        {habits != null && habits != 'no habits' && selectedHabitType == 'active' &&
          <>
          <Text>Active</Text>
          <FlatList
            style={Styles.habitsContainer}
            data={habits.sort((a, b) => a.name.localeCompare(b.name))}
            renderItem={({item}) => {
              // CHECK IF HABIT IS ACTIVE
              if(item.isActive == true){
                return(
                  <ManageHabitsItem
                    key={item.id}
                    habitId={item.id}
                    habitName={item.name}
                    currentDate={currentDate}
                    setSelectedHabitId={setSelectedHabitId}
                    setModalVisibleEdit={setModalVisibleEdit}
                  />
                )
              }
            }}
            keyExtractor={item => item.id}
            // ListFooterComponent={addHabitBtn}
          />
          <View style={Styles.btnAddBox}>
            <Pressable style={[Styles.btnAdd, theme == Styles.btnAddDm]} onPress={() => setModalVisibleAdd(true)}>
              <Text style={[Styles.txtAdd, customColor && {color: customColor}]}>Add Habit</Text>
            </Pressable>
          </View>
          </>
        }

        {/* ARCHIVED HABITS */}
        {habits != null && habits != 'no habits' && selectedHabitType == 'archived' &&
          <>
          <Text>Archived</Text>
          <FlatList
            style={Styles.habitsContainer}
            data={habits.sort((a, b) => a.name.localeCompare(b.name))}
            renderItem={({item}) => {
              // CHECK IF HABIT IS ARCHIVED
              if(item.isActive == false){
                return(
                  <ManageHabitsItem
                    key={item.id}
                    habitId={item.id}
                    habitName={item.name}
                    currentDate={currentDate}
                    setSelectedHabitId={setSelectedHabitId}
                    setModalVisibleEdit={setModalVisibleEdit}
                  />
                )
              }
            }}
            keyExtractor={item => item.id}
            // ListFooterComponent={addHabitBtn}
          />
          <View style={Styles.btnAddBox}>
            <Pressable style={[Styles.btnAdd, theme == DarkMode && Styles.btnAddDm]} onPress={() => setModalVisibleAdd(true)}>
              <Text style={[Styles.txtAdd, customColor && {color: customColor}]}>Add Habit</Text>
            </Pressable>
          </View>
          </>
        }

        {/* PLACEHOLDER TEXT IF NO HABITS */}
        {habits == 'no habits' &&
          <View style={Styles.noHabitsContainer}>
            <Text style={[Styles.noHabitsText, theme == DarkMode && Styles.noHabitsTextDm]}>
              Add a habit
            </Text>
            <Text style={[Styles.noHabitsText, theme == DarkMode && Styles.noHabitsTextDm]}>
              to get started
            </Text>
            <View style={Styles.btnAddBox}>
              <Pressable style={[Styles.btnAdd, theme == DarkMode && Styles.btnAddDm]} onPress={() => setModalVisibleAdd(true)}>
                <Text style={[Styles.txtAdd, customColor && {color: customColor}]}>Add Habit</Text>
              </Pressable>
            </View>
          </View>
        }

      </View>

      {/* ADD HABIT FORM */}
      <Modal
        style={Styles.modal}
        isVisible={modalVisibleAdd}
        propagateSwipe={true}
        // onBackdropPress={() => setModalVisibleAdd(false)}
        // onSwipeComplete={() => setModalVisibleAdd(false)}
        // swipeDirection="down"
      >
        <View style={theme == LightMode ? Styles.modalView_lm : Styles.modalView_dm}>
          <ScrollView>
            <AddHabit
              getHabits={getHabits}
              closeModal={closeModalAdd}
            />
          </ScrollView>
        </View>
      </Modal>

      {/* EDIT HABIT FORM */}
      <Modal
        style={Styles.modal}
        isVisible={modalVisibleEdit}
        propagateSwipe={true}
        // onBackdropPress={() => setModalVisibleAdd(false)}
        // onSwipeComplete={() => setModalVisibleAdd(false)}
        // swipeDirection="down"
      >
        <View style={theme == LightMode ? Styles.modalView_lm : Styles.modalView_dm}>
          <ScrollView>
            <EditHabit
              selectedHabitId={selectedHabitId}
              getHabits={getHabits}
              closeModal={closeModalEdit}
              habits={habits}
              archiveHabit={archiveHabit}
              deleteHabit={deleteHabit}
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  )
}