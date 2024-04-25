import { Text, Pressable, View } from 'react-native';
import Container from './Container';
import Styles from './Styles';
import { useState, useEffect } from 'react';
import Checkbox from 'expo-checkbox';
import { db, collection, getDocs } from '../firebase/index';

export default function Habits() {
  const [habits, setHabits] = useState([])
  const [checkMark, setCheckMark] = useState(false)

  // ADD COMPLETED HABIT TO STORE
  const addCompletedHabit = (habitname) => {
    setHabits({
      
    })
  }

  const getHabits = async () => {
    const querySnapshot = await getDocs(collection(db, "habits"))
    setHabits(
      querySnapshot.docs.map((doc)=>({
        ...doc.data(),
        id: doc.id
      }))
    )
  }

  useEffect (() => {
    getHabits()
  }, [])

  return (
    <Container pageTitle='Habits'>
      <View style={Styles.habits_day}>
        <Text style={Styles.habits_day_title}>Today</Text>
        <Text style={Styles.habits_day_title_sub}>Thu Sep 14</Text>
      </View>
       {habits.map(function(habit, index) {
        return (
          <View style={Styles.habit} key={index}>
            <Pressable style={Styles.habit_pressable} onPress={addCompletedHabit(habit.name)}>
              <Checkbox style={Styles.checkbox} value={checkMark} onValueChange={setCheckMark} />
              <Text style={Styles.habit_name}>{habit.name}</Text>
            </Pressable>
          </View>
        )
      })}  
      <Pressable style={Styles.add_habit_btn}>
        <Text style={Styles.add_habit_txt}>Add Habit</Text>
      </Pressable>
    </Container>
  )
}