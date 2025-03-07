import { Text, Pressable, View, ScrollView, Modal, StyleSheet } from 'react-native';
import Container from '../components/Container';
import { Styles, LightMode, DarkMode } from '../components/styles/Styles';
import { useState, useEffect, useContext } from 'react';
import { db, doc, collection, getDocs, updateDoc, arrayUnion, arrayRemove, deleteDoc } from '../firebase/index';
import HabitsItem from '../components/habits/HabitsItem';
import AddHabit from '../components/habits/AddHabit';
import { ThemeContext } from '../components/Contexts';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Habits() {
  const [habits, setHabits] = useState(null)
  const [currentDate, setCurrentDate] = useState()
  const [modalVisible, setModalVisible] = useState(false);
  const {theme} = useContext(ThemeContext)
  const [totalCompletedHabits, setTotalCompletedHabits] = useState(null)
  const [oneHundredPercent, setOneHundredPercent] = useState(null)

  // Close modal from child component
  const closeModal = () => {
    setModalVisible(!modalVisible)
  }

  // Set initial number of completed habits
  if (habits && totalCompletedHabits == null) {
    let total = 0
    habits.forEach(e => {
      if(e.completed.includes(currentDate)){
        total += 1
      }
    });
    setTotalCompletedHabits(total)
  }

  // GET HABITS FROM DB AND ADD TO STATE
  const getHabits = async () => {
    const querySnapshot = await getDocs(collection(db, "habits"))
    // Check if any habits exist before updating state
    if(querySnapshot.docs.length > 0){
      setHabits(
        querySnapshot.docs.map((doc)=>({
          ...doc.data(),
          id: doc.id
        }))
      )
    } else {
      setHabits(null)
    }
    //console.log(totalCompletedHabits == null)
  }

  // ADD COMPLETED HABIT TO STORE, Update STYLING of CHECK MARK and NAME
  const addCompletedHabit = async(habitId, isCompleted) => {
    if(!isCompleted){
      await updateDoc(doc(db, "habits", (habitId)), {
        completed: arrayUnion(currentDate)           
      })
      setTotalCompletedHabits(totalCompletedHabits + 1)
    } else {
      await updateDoc(doc(db, "habits", (habitId)), {
        completed: arrayRemove(currentDate)         
      })
      setTotalCompletedHabits(totalCompletedHabits - 1)
    }
    getHabits()
  }

  // DELETE Habit
  const deleteHabit = async(habitId) => {
    await deleteDoc(doc(db, "habits", (habitId)))
    getHabits()
  }

  // EDIT Habit
  const editHabit = () => {}

  useEffect (() => {
    getHabits()
    setCurrentDate(new Date().toDateString())
  }, [])

  // Check if all habits are completed for the day
  // Then show completion badge
  useEffect (() => {
    if (habits && totalCompletedHabits == habits.length){
      setOneHundredPercent(true)
      console.log(true)
      console.log(totalCompletedHabits)
    } else {
      setOneHundredPercent(false)
      console.log(false)
      console.log(totalCompletedHabits)
    }
  }, [totalCompletedHabits])

  return (
    <ScrollView style={{paddingVertical: 20, paddingHorizontal: 20}}>
        <View style={[Styles.habitsDay, theme == DarkMode && Styles.habitsDayDm]}>
          <Text style={[Styles.habitsDayTitle, theme == DarkMode && Styles.habitsDayTitleDm]}>Today</Text>
          <Text style={[Styles.habitsDayTitleSub, theme == DarkMode && Styles.habitsDayTitleSubDm]}>{currentDate}</Text>
        </View>
        {oneHundredPercent &&
          <View style={[Styles.oneHundredPercentBox, theme == DarkMode && Styles.oneHundredPercentBoxDm]}>
            <Text style={[Styles.oneHundredPercentTxt, theme == DarkMode && Styles.oneHundredPercentTxtDm]}>DAAAYUM! 100% completion today!</Text>
          </View>
        }
        {habits != null &&
          habits.map(function(habit) {
            if(habit.completed.includes(currentDate)){
              return(
                <HabitsItem
                  key={habit.id}
                  habitId={habit.id}
                  habitName={habit.name}
                  currentDate={currentDate}
                  isCompleted={true}
                  addCompletedHabit={addCompletedHabit}
                  deleteHabit={deleteHabit}
                />
              )
            } else {
              return(
                <HabitsItem
                  key={habit.id}
                  habitId={habit.id}
                  habitName={habit.name}
                  currentDate={currentDate}
                  isCompleted={false}
                  addCompletedHabit={addCompletedHabit}
                  deleteHabit={deleteHabit}
                />
              )
            }
          })
        }
        {habits == null &&
          <Text style={[Styles.noHabitsText, theme == DarkMode && Styles.noHabitsTextDm]}>
            Add a habit to get started
          </Text>
        }
        <View style={Styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={Styles.centeredView}>
              <View style={theme == LightMode ? Styles.modalView_lm : Styles.modalView_dm}>
                <AddHabit
                  getHabits={getHabits}
                  closeModal={closeModal}
                />
              </View>
            </View>
          </Modal>
        </View>
        <Pressable style={Styles.btnAdd} onPress={() => setModalVisible(true)}>
          <Text style={Styles.txtAdd}>Add Habit</Text>
        </Pressable>
        {/* <Pressable style={Styles.btn_edit} onPress={() => setModalVisible(true)}>
          <Text style={Styles.txt_edit}>Edit Habits</Text>
        </Pressable> */}
    </ScrollView>
  )
}