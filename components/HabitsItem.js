import { useState, useContext } from 'react';
import { Text, Pressable, View } from 'react-native';
import { Styles, LightMode, DarkMode, StylesLightMode, StylesDarkMode } from './styles/Styles';
import Checkbox from 'expo-checkbox';
import { ThemeContext } from './Contexts';

export default function HabitsItem({habitId, habitName, isCompleted, addCompletedHabit}) {
  const {theme} = useContext(ThemeContext)
  const [isCompletedLocal, setIsCompletedLocal] = useState(isCompleted)
  const checkUncheck = () => {
    setIsCompletedLocal(prev => !prev)
    addCompletedHabit(habitId, isCompleted)
  }
  
  return (
    <View style={theme == LightMode ? Styles.habit_lm : Styles.habit_dm}>
      {/* <Pressable style={Styles.checkbox_pressable} onPress={() => checkUncheck()}> */}
        
      {/* </Pressable> */}
      {theme == LightMode
        ?
        <>
        <Checkbox style={isCompletedLocal ? Styles.checkbox_checked_lm : Styles.checkbox_unchecked_lm} value={isCompletedLocal ? true : false} onValueChange={() => checkUncheck()}/>
        <Text style={isCompletedLocal ? Styles.habit_name_completed_lm : Styles.habit_name_lm}>{habitName}</Text>
        </>
        :
        <>
        <Checkbox style={isCompletedLocal ? Styles.checkbox_checked_dm : Styles.checkbox_unchecked_dm} value={isCompletedLocal ? true : false} onValueChange={() => checkUncheck()}/>
        <Text style={isCompletedLocal ? Styles.habit_name_completed_dm : Styles.habit_name_dm}>{habitName}</Text>
        </>
      }
    </View>
  )
}