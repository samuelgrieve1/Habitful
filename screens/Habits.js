import { Text, Pressable, View, ScrollView, Modal, StyleSheet } from 'react-native';
import Container from '../components/Container';
import { Styles, LightMode } from '../components/styles/Styles';
import { useState, useEffect, useContext } from 'react';
import { db, doc, collection, getDocs, updateDoc, arrayUnion, arrayRemove, deleteDoc } from '../firebase/index';
import HabitsItem from '../components/HabitsItem';
import AddHabit from '../components/AddHabit';
import { ThemeContext } from '../components/Contexts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, TouchableOpacity } from 'react-native';
import DragList, {DragListRenderItemInfo} from 'react-native-draglist';

export default function Habits() {
  const [habits, setHabits] = useState(null)
  const [currentDate, setCurrentDate] = useState()
  const [modalVisible, setModalVisible] = useState(false);
  const {theme} = useContext(ThemeContext)

  // Close modal from child component
  const closeModal = () => {
    setModalVisible(!modalVisible)
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
  }

  // WAS HABIT COMPLETED TODAY?
  const checkedOrUnchecked = (habit) => {
    return(
      habit.completed.includes(currentDate) ? true : false
    )
  }

  // ADD COMPLETED HABIT TO STORE, Update STYLING of CHECK MARK and NAME
  const addCompletedHabit = async(habitId, isCompleted) => {
    if(!isCompleted){
      await updateDoc(doc(db, "habits", (habitId)), {
        completed: arrayUnion(currentDate)           
      })
    } else {
      await updateDoc(doc(db, "habits", (habitId)), {
        completed: arrayRemove(currentDate)         
      })
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

  return (
    <View style={{paddingVertical: 20, paddingHorizontal: 20}}>
        <View style={theme == LightMode ? Styles.habits_day_lm : Styles.habits_day_dm}>
          <Text style={theme == LightMode ? Styles.habits_day_title_lm : Styles.habits_day_title_dm}>Today</Text>
          <Text style={theme == LightMode ? Styles.habits_day_title_sub_lm : Styles.habits_day_title_sub_dm}>{currentDate}</Text>
        </View>

        {habits != null &&
          <FlatList
            data={habits}
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
                />
              )
            }}
            keyExtractor={item => item.id}
          />
        }

        {habits == null &&
          <Text style={theme == LightMode ? Styles.no_habits_text_lm : Styles.no_habits_text_dm}>
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
        <Pressable style={Styles.btn_add} onPress={() => setModalVisible(true)}>
          <Text style={Styles.txt_add}>Add Habit</Text>
        </Pressable>
    </View>
  )
}