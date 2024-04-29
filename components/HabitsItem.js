import { useEffect, useState } from 'react';
import { Text, Pressable, View } from 'react-native';
import Styles from './Styles';
import Checkbox from 'expo-checkbox';
import { db, doc, updateDoc, arrayUnion, arrayRemove } from '../firebase/index';
import { deleteField } from 'firebase/firestore';

export default function HabitsItem({habitId, habitName, currentDate}) {
  //const [habits, setHabits] = useState([])
  const [checkMark, setCheckMark] = useState(false)

  // ADD COMPLETED HABIT TO STATE
  const addCompletedHabit = async(habitId) => {
    if(!checkMark){
      await updateDoc(doc(db, "habits", (habitId)), {
        completed: arrayUnion(currentDate)           
      })
    } else {
      await updateDoc(doc(db, "habits", (habitId)), {
        completed: arrayRemove(currentDate)         
      })
    }
  }

  // useEffect(() => {
  //   const date = new Date()
  // },[])
  
  return (
    <View style={Styles.habit}>
      <Pressable style={Styles.habit_pressable} onPress={() => addCompletedHabit(habitId)}>
        <Checkbox style={Styles.checkbox} value={checkMark} onValueChange={setCheckMark} />
        <Text style={Styles.habit_name}>{habitName}</Text>
      </Pressable>
    </View>
  )
}