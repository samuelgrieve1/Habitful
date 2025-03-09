import { Text, Pressable, View, ScrollView, StyleSheet, Dimensions, Image, SafeAreaView } from 'react-native';
import Container from '../components/Container';
import { Styles, LightMode, DarkMode } from '../components/styles/Styles';
import { useState, useEffect, useContext } from 'react';
import { db, doc, collection, getDocs, updateDoc, arrayUnion, arrayRemove, deleteDoc, getDoc, setDoc, addDoc, listCollections, query } from '../firebase/index';
import HabitsItem from '../components/habits/HabitsItem';
import AddHabit from '../components/habits/AddHabit';
import EditHabit from '../components/habits/EditHabit';
import { ThemeContext, CustomColorContext } from '../components/Contexts';

import { Feather } from '@expo/vector-icons';
import { FlatList, TouchableOpacity } from 'react-native';
import DragList, {DragListRenderItemInfo} from 'react-native-draglist';
import Modal from 'react-native-modal';
import { format } from 'date-fns';
import DateRangeSelector from '../components/DateRangeSelector';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
// import { getDoc } from 'firebase/firestore';

export default function Today() {
  const [habits, setHabits] = useState(null)
  const [completions, setCompletions] = useState(null)
  const [currentDate, setCurrentDate] = useState(null)
  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
  const [selectedHabitId, setSelectedHabitId] = useState(null)
  const {theme} = useContext(ThemeContext)
  const {customColor} = useContext(CustomColorContext)
  const [selectedDate, setSelectedDate] = useState(new Date());

  const insets = useSafeAreaInsets();
  // console.log(insets)
  
  // Define dates that have events
  // The key is the date in 'YYYY-MM-DD' format, value is true
  const eventDates = {
    '2025-02-26': true,  // Today
    '2025-02-28': true,  // Friday
    '2025-03-01': true,  // Saturday
  };
  
  // Optional: Define custom colors for specific event dates
  const eventColors = {
    '2025-02-26': '#4CAF50',  // Green
    '2025-02-28': '#2196F3',  // Blue
    '2025-03-01': '#9C27B0',  // Purple
  };
  
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    
    // Check if the selected date has an event
    const dateString = date.toISOString().split('T')[0];
    if (eventDates[dateString]) {
      console.log(`Event exists for ${dateString}!`);
      // You can add your event handling logic here
    }
  };

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
      setHabits('no habits')
    }
  }

  // GET COMPLETIONS FROM DB AND ADD TO STATE
  const getCompletions = async () => {
    const docRef = doc(db, "completions", "dates");
    const completionsSnapshot = await getDoc(docRef);
    setCompletions(completions => ({
      ...completions,
      ...completionsSnapshot.data()
    }))
  }

  // WAS HABIT COMPLETED TODAY?
  // const checkedOrUnchecked = (habit) => {
  //   return(
  //     habit.completed.includes(currentDate) ? true : false
  //   )
  // }
  const checkedOrUnchecked = (habit) => {
    if(completions != null){
      if(completions[currentDate]){
        return completions[currentDate].includes(habit.name)
      }
      return false
    }
  }

  // ADD COMPLETED HABIT TO STORE, Update STYLING of CHECK MARK and NAME
  const addCompletedHabit = async (habitId, habitName, isCompleted) => {
    if(!isCompleted){ 
      await updateDoc(doc(db, "completions", "dates"), {
        [currentDate]: arrayUnion(habitName)       
      })
    } else {
      await updateDoc(doc(db, "completions", "dates"), {
        [currentDate]: arrayRemove(habitName)         
      })
    }
    getHabits()
    getCompletions()
  }

  // DELETE Habit
  // const deleteHabit = async() => {
  //   await deleteDoc(doc(db, "habits", (selectedHabitId)))
  //   getHabits()
  // }

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
      <Text style={[Styles.txtAdd, customColor && {color: customColor}]}><Feather name="plus" size={16} color={theme == LightMode ? '#757575' : '#757575'} /> Add Habit</Text>
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
    getCompletions()
    getHabits()
  }, [])

  return (
    <View style={Styles.screenContainer}>
      <View style={Styles.pageHeaderContainer}>
        <View style={Styles.pageHeaderLeft}>
        <AnimatedCircularProgress
            rotation={0}
            size={50}
            width={2}
            fill={50}
            tintColor={customColor ? customColor : "#4185e7"}
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor={theme == LightMode ? 'rgba(126, 126, 126, 0.1)' : 'rgba(126, 126, 126, 0.1)'}
          >
            {
              () => (
                <Text style={{color: customColor ? customColor : "#4185e7", fontSize: 14, fontWeight: '600'}}>
                  50%
                </Text>
              )
            }
          </AnimatedCircularProgress>
        </View>
        <View style={Styles.pageHeaderCenter}>
          <Text style={[Styles.pageHeaderCenterTitle, theme == DarkMode && Styles.pageHeaderCenterTitleDm]}>
            Today
          </Text>
          <Text style={[Styles.pageHeaderCenterSubTitle, theme == DarkMode && Styles.pageHeaderCenterSubTitleDm]}>
            Track Your Habits
          </Text>
        </View>
        <View style={Styles.pageHeaderRight}>
          <Pressable style={Styles.pageHeaderRightPressable} onPress={() => setModalVisibleAdd(true)}>
            <FontAwesome6
              name="plus"
              size={22}
              style={[
                Styles.menuIcon,
                customColor && {color: customColor}
              ]}
            />
          </Pressable>
        </View>
      </View>

      <View style={{paddingVertical: 0, paddingHorizontal: 0, flex: 1}}>

        <View style={{paddingHorizontal: 0}}>
          <DateRangeSelector
            onDateSelect={handleDateSelect}
            eventDates={eventDates}
            eventColors={eventColors}
          />
        </View>

        {habits != null && habits != 'no habits' &&
          <FlatList
            ItemSeparatorComponent={
              <View style={[Styles.habitSeparator, theme == DarkMode && Styles.habitSeparatorDm]} />
            }
            style={Styles.habitsContainer}
            data={habits.sort((a, b) => a.name.localeCompare(b.name))}
            renderItem={({item}) => {
              return(
                <HabitsItem
                  key={item.id}
                  habitId={item.id}
                  habitName={item.name}
                  currentDate={currentDate}
                  isCompleted={checkedOrUnchecked(item)}
                  addCompletedHabit={addCompletedHabit}
                  deleteHabit={deleteHabit}
                  setSelectedHabitId={setSelectedHabitId}
                  setModalVisibleEdit={setModalVisibleEdit}
                />
              )
            }}
            keyExtractor={item => item.id}
            //ListFooterComponent={addHabitBtn}
          />
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
        style={[Styles.modal, {justifyContent: 'flex-end'}]}
        isVisible={modalVisibleAdd}
        propagateSwipe={true}
        onBackdropPress={() => setModalVisibleColorPicker(false)}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropOpacity={0.8}
        // onBackdropPress={() => setModalVisibleAdd(false)}
        // onSwipeComplete={() => setModalVisibleAdd(false)}
        // swipeDirection="down"
      >
        <View
          style={[
            Styles.modalView,
            {marginTop: insets.top},
            theme == LightMode
            ?{backgroundColor: '#ffffff', borderColor: '#ddd'}
            :{backgroundColor: '#000000', borderColor: '#222'}
          ]}
        >
          {/* <ScrollView> */}
            <AddHabit
              getHabits={getHabits}
              closeModal={closeModalAdd}
            />
          {/* </ScrollView> */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  selectedDateContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: '600',
  },
  eventText: {
    marginTop: 10,
    color: '#FF5722',
    fontWeight: '500',
  },
});