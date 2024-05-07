import { useState } from 'react';
import { Text, Pressable, View } from 'react-native';
import { Styles } from './Styles';
import Checkbox from 'expo-checkbox';

export default function HabitsItem({habitId, habitName, isCompleted, addCompletedHabit}) {
  const [isCompletedLocal, setIsCompletedLocal] = useState(isCompleted)
  const checkUncheck = () => {
    setIsCompletedLocal(prev => !prev)
    addCompletedHabit(habitId, isCompleted)
  }
  
  return (
    <View style={Styles.habit}>
      {/* <Pressable style={Styles.checkbox_pressable} onPress={() => checkUncheck()}> */}
        <Checkbox style={Styles.checkbox} color={isCompletedLocal ? '#009900' : undefined} value={isCompletedLocal ? true : false} onValueChange={() => checkUncheck()}/>
      {/* </Pressable> */}
      <Text style={isCompletedLocal ? Styles.habit_name_completed : Styles.habit_name}>{habitName}</Text>
    </View>
  )
}