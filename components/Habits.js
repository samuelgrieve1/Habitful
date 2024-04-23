import { Text, Pressable } from 'react-native';
import Container from './Container';
import Styles from './Styles';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import Checkbox from 'expo-checkbox';
import ListHabits from './ListHabits';
import { View } from 'react-native';

export default function Habits() {
  const { habitsStorage, setHabitsStorage } = useAsyncStorage('@storage_key');
  const [habits, setHabits] = useState(['No habits'])
  const [completions, setCompletions] = useState([])
  const [checkMark, setCheckMark] = useState(false)

  // ADD COMPLETED HABIT TO STORE
  const addCompletedHabit = (habitname) => {
    console.log(habitname)
  }

  

  // GET STORED HABITS AND ADD TO STATE
  useEffect(() => {
    const getStore = async () => {
      try {
        let habit =  await AsyncStorage.getItem('habits')
        console.log(habit)
        if (habit){
          setHabits(JSON.parse(habit))
        }
        if (habit){console.log("Hmmm....")}
      } catch(e) {
        console.log(e)
        console.log("Hmmm....")
      }
    }
    getStore()
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
      {console.log(habits)}
      <Pressable style={Styles.add_habit_btn}>
        <Text style={Styles.add_habit_txt}>Add Habit</Text>
      </Pressable>
    </Container>
  )
}