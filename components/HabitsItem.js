import { useState } from 'react';
import { Text, Pressable, View } from 'react-native';
import Styles from './Styles';
import Checkbox from 'expo-checkbox';
import { db, doc,collection, updateDoc, arrayUnion } from '../firebase/index';

export default function HabitsItem({habitId, habitName}) {
  //const [habits, setHabits] = useState([])
  const [checkMark, setCheckMark] = useState(false)

    // ADD COMPLETED HABIT TO STATE
    const addCompletedHabit = async(habitId) => {
      const currentHabit = doc(db, "Habits", habitId)
      console.log(currentHabit)
      // await updateDoc(doc(db, "Habits", habitId),{
      //   completed: arrayUnion("poop")
      // })
    }
  
  return (
    <View style={Styles.habit}>
      <Pressable style={Styles.habit_pressable} onPress={() => addCompletedHabit(habitId)}>
        <Checkbox style={Styles.checkbox} value={checkMark} onValueChange={setCheckMark} />
        <Text style={Styles.habit_name}>{habitName}</Text>
      </Pressable>
    </View>
  )
}