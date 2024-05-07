import { Text, Pressable, View, ScrollView, Button, Modal, StyleSheet } from 'react-native';
import Container from './Container';
import { Styles } from './Styles';
import { useState, useEffect } from 'react';
import { db, doc, collection, getDocs, updateDoc, arrayUnion, arrayRemove } from '../firebase/index';
import { useNavigation } from '@react-navigation/native';
import HabitsItem from './HabitsItem';
import AddHabit from './AddHabit';

export default function Habits() {
  const [habits, setHabits] = useState(null)
  const [currentDate, setCurrentDate] = useState()
  const [modalVisible, setModalVisible] = useState(false);

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
    }
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

  useEffect (() => {
    getHabits()
    setCurrentDate(new Date().toDateString())
  }, [])

  return (
    <ScrollView>
      <Container pageTitle='Habits'>
        <View style={Styles.habits_day}>
          <Text style={Styles.habits_day_title}>Today</Text>
          <Text style={Styles.habits_day_title_sub}>{currentDate}</Text>
        </View>
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
                />)
            } else {
              return(
                <HabitsItem
                  key={habit.id}
                  habitId={habit.id}
                  habitName={habit.name}
                  currentDate={currentDate}
                  isCompleted={false}
                  addCompletedHabit={addCompletedHabit}
                />
              )
            }
          })
        }
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
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
      </Container>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});