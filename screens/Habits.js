import { Text, Pressable, View, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import Container from '../components/Container';
import { Styles, LightMode } from '../components/styles/Styles';
import { useState, useEffect, useContext } from 'react';
import { db, doc, collection, getDocs, updateDoc, arrayUnion, arrayRemove, deleteDoc, getDoc, setDoc, addDoc, listCollections, query } from '../firebase/index';
import ManageHabitsItem from '../components/ManageHabitsItem';
import AddHabit from '../components/AddHabit';
import EditHabit from '../components/EditHabit';
import { ThemeContext } from '../components/Contexts';
import { Feather } from '@expo/vector-icons';
import { FlatList, TouchableOpacity } from 'react-native';
import DragList, {DragListRenderItemInfo} from 'react-native-draglist';
import Modal from 'react-native-modal';
import {Calendar, CalendarList, Agenda, WeekCalendar, CalendarProvider} from 'react-native-calendars';
import { format } from 'date-fns';
// import { getDoc } from 'firebase/firestore';

export default function Habits() {
  const [habits, setHabits] = useState(null)
  const [currentDate, setCurrentDate] = useState(null)
  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
  const [selectedHabitId, setSelectedHabitId] = useState(null)
  const {theme} = useContext(ThemeContext)

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

  // DELETE Habit
  const deleteHabit = async() => {
    await deleteDoc(doc(db, "habits", (selectedHabitId)))
    getHabits()
  }

  // ADD HABIT BTN
  const addHabitBtn = () => {
    return(
    <Pressable style={theme == LightMode ? Styles.btn_add_lm : Styles.btn_add_dm} onPress={() => setModalVisibleAdd(true)}>
      <Text style={theme == LightMode ? Styles.txt_add_lm : Styles.txt_add_dm}>Add Habit</Text>
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
          <Pressable style={Styles.pageHeaderLeftPressable}>
            <Feather name="refresh-cw" size={24} style={theme == LightMode ? Styles.menuIconLm : Styles.menuIconDm} />
          </Pressable>
        </View>
        <View style={Styles.pageHeaderCenter}>
          <Text style={theme == LightMode ? Styles.pageHeaderCenterTitleLm : Styles.pageHeaderCenterTitleDm}>
            Habits
          </Text>
          <Text style={theme == LightMode ? Styles.pageHeaderCenterSubTitleLm : Styles.pageHeaderCenterSubTitleDm}>
            Manage Your Habits
          </Text>
        </View>
        <View style={Styles.pageHeaderRight}>
          <Pressable style={Styles.pageHeaderRightPressable}>
            <Feather name="plus" size={24} style={theme == LightMode ? Styles.menuIconLm : Styles.menuIconDm} />
          </Pressable>
        </View>
      </View>

      <View style={{paddingVertical: 20, paddingHorizontal: 20, flex: 1}}>
        {habits != null &&
          <FlatList
            style={Styles.habitsContainer}
            data={habits.sort((a, b) => a.name.localeCompare(b.name))}
            renderItem={({item}) => {
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
            }}
            keyExtractor={item => item.id}
            ListFooterComponent={addHabitBtn}
          />
        }

        {/* PLACEHOLDER TEXT IF NO HABITS */}
        {habits == null &&
          <View style={theme == LightMode ? Styles.no_habits_container_lm : Styles.no_habits_container_dm}>
            <Text style={theme == LightMode ? Styles.no_habits_text_lm : Styles.no_habits_text_dm}>
              Add a habit
            </Text>
            <Text style={theme == LightMode ? Styles.no_habits_text_lm : Styles.no_habits_text_dm}>
              to get started
            </Text>
            <View style={theme == LightMode ? Styles.btn_add_blue_container_lm : Styles.btn_add_blue_container_dm}>
              <Pressable style={theme == LightMode ? Styles.btn_add_blue_lm : Styles.btn_add_blue_dm} onPress={() => setModalVisibleAdd(true)}>
                <Text style={theme == LightMode ? Styles.txt_add_blue_lm : Styles.txt_add_blue_dm}>Add Habit</Text>
              </Pressable>
            </View>
          </View>
        }
      </View>

      {/* ADD HABIT FORM */}
      <Modal
        style={Styles.modal}
        propagateSwipe={true}
        isVisible={modalVisibleAdd}
        onBackdropPress={() => setModalVisibleAdd(false)}
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
        propagateSwipe={true}
        isVisible={modalVisibleEdit}
        onBackdropPress={() => setModalVisibleEdit(false)}
      >
        <View style={theme == LightMode ? Styles.modalView_lm : Styles.modalView_dm}>
          <ScrollView>
            <EditHabit
              selectedHabitId={selectedHabitId}
              getHabits={getHabits}
              closeModal={closeModalEdit}
              habits={habits}
              deleteHabit={deleteHabit}
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  )
}