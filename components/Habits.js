import { Text, Pressable, View, ScrollView, Button } from 'react-native';
import Container from './Container';
import Styles from './Styles';
import { useState, useEffect } from 'react';
import { db, doc, collection, getDocs, updateDoc, arrayUnion, arrayRemove } from '../firebase/index';
import { useNavigation } from '@react-navigation/native';
import HabitsItem from './HabitsItem';

export default function Habits() {
  const [habits, setHabits] = useState(null)
  const [currentDate, setCurrentDate] = useState()

  const navigation = useNavigation();

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
      <Container pageTitle='H'>
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
        <Pressable style={Styles.add_habit_btn} onPress={() => navigation.navigate('AddHabit')}>
          <Text style={Styles.add_habit_txt}>Add H</Text>
        </Pressable>
        {/* <Button
          onPress={() => navigation.navigate('AddHabit')}
          title="Add Habit"
        /> */}
      </Container>
    </ScrollView>
  )
}