import { Text, Pressable, View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Container from '../components/Container';
import { Styles, LightMode } from '../components/styles/Styles';
import { useState, useEffect, useContext } from 'react';
import { db, doc, collection, getDocs, updateDoc, arrayUnion, arrayRemove, deleteDoc, getDoc, setDoc, addDoc, listCollections, query } from '../firebase/index';
import HabitsItem from '../components/HabitsItem';
import AddHabit from '../components/AddHabit';
import EditHabit from '../components/EditHabit';
import { ThemeContext } from '../components/Contexts';
import { Feather } from '@expo/vector-icons';
import { FlatList, TouchableOpacity } from 'react-native';
import DragList, {DragListRenderItemInfo} from 'react-native-draglist';
import Modal from 'react-native-modal';
// import { getDoc } from 'firebase/firestore';

export default function Habits() {
  const [habits, setHabits] = useState(null)
  const [completions, setCompletions] = useState(null)
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
  const deleteHabit = async() => {
    await deleteDoc(doc(db, "habits", (selectedHabitId)))
    getHabits()
  }

  // ADD HABIT BTN
  const addHabitBtn = () => {
    return(
    <Pressable style={theme == LightMode ? Styles.btn_add_lm : Styles.btn_add_dm} onPress={() => setModalVisibleAdd(true)}>
      <Text style={theme == LightMode ? Styles.txt_add_lm : Styles.txt_add_dm}><Feather name="plus" size={16} color={theme == LightMode ? '#757575' : '#757575'} /> Add Habit</Text>
    </Pressable>
    )
  }

  useEffect (() => {
    setCurrentDate(new Date().toDateString())
    getCompletions()
    getHabits()
  }, [])

  return (
    <>  
      <View style={{paddingVertical: 20, paddingHorizontal: 20, flex: 1}}>
        <View style={theme == LightMode ? Styles.habits_day_lm : Styles.habits_day_dm}>
          <Text style={theme == LightMode ? Styles.habits_day_title_lm : Styles.habits_day_title_dm}>Today</Text>
          <Text style={theme == LightMode ? Styles.habits_day_title_sub_lm : Styles.habits_day_title_sub_dm}>{currentDate}</Text>
        </View>

        {habits != null &&
          <FlatList
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
            ListFooterComponent={addHabitBtn}
          />
        }

        {/* PLACEHOLDER TEXT IF NO HABITS */}
        {habits == null &&
          <View>
            <Text style={theme == LightMode ? Styles.no_habits_text_lm : Styles.no_habits_text_dm}>
              Add a habit to get started
            </Text>
            <Pressable style={theme == LightMode ? Styles.btn_add_blue_lm : Styles.btn_add_blue_dm} onPress={() => setModalVisibleAdd(true)}>
              <Text style={theme == LightMode ? Styles.txt_add_blue_lm : Styles.txt_add_blue_dm}><Feather name="plus" size={16} color={theme == LightMode ? '#4185e7' : '#4185e7'} /> Add Habit</Text>
            </Pressable>
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
    </>
  )
}