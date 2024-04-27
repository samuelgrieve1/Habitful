import { useState } from 'react';
import { Text, Pressable, View } from 'react-native';
import Styles from './Styles';
import Checkbox from 'expo-checkbox';
import { app, db, doc,collection, updateDoc, addDoc, arrayUnion } from '../firebase/index';

export default function HabitsItem({habitId, habitName}) {
  //const [habits, setHabits] = useState([])
  const [checkMark, setCheckMark] = useState(false)

    // ADD COMPLETED HABIT TO STATE
    const addCompletedHabit = async(habitId) => {
      try {
        const currentHabit = doc(db, "Habits", habitId)
        await updateDoc(currentHabit, {
          completed: arrayUnion("poop")
        })
        console.log("Habit marked as completed successfully!");
      } catch (error) {
        console.error("Error adding completed habit:", error);
      }
    }

  // const addCompletedHabit = async (habitId) => {
  //   try {
  //     const docRef = await addDoc(collection(db, "habits"), {
  //       name: habitName,
  //       sun: activeSun,
  //       mon: activeMon,
  //       tue: activeTue,
  //       wed: activeWed,
  //       thu: activeThu,
  //       fri: activeFri,
  //       sat: activeSat,
  //       completed: []
  //     })
  //     console.log("Document written with ID: ", docRef.id)
  //   } catch (e) {
  //     console.error("Error adding document: ", e)
  //   }
  // }
  
  return (
    <View style={Styles.habit}>
      <Pressable style={Styles.habit_pressable} onPress={() => addCompletedHabit(habitId)}>
        <Checkbox style={Styles.checkbox} value={checkMark} onValueChange={setCheckMark} />
        <Text style={Styles.habit_name}>{habitName}</Text>
      </Pressable>
    </View>
  )
}