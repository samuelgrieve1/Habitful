import { useState } from 'react';
import { Text, Pressable, View } from 'react-native';
import Styles from './Styles';
import Checkbox from 'expo-checkbox';
import { db, doc, updateDoc, arrayUnion, arrayRemove } from '../firebase/index';

export default function HabitsItem({habitId, habitName, currentDate, isCompleted, addCompletedHabit}) {
  //const [habits, setHabits] = useState([])
  //const [checkMark, setCheckMark] = useState(isCompleted)
  //const [habitNameStyle, setHabitNameStyle] = useState(Styles.habit_name)


  
  return (
    <View style={Styles.habit}>
      <Pressable style={Styles.habit_pressable} onPress={() => addCompletedHabit(habitId)}>
        <Checkbox style={Styles.checkbox} value={isCompleted ? true : false} />
        <Text style={isCompleted ? Styles.habit_name_completed : Styles.habit_name}>{habitName}</Text>
      </Pressable>
    </View>
  )
}