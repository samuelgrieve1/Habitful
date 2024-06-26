import { useState, useContext } from 'react';
import { Text, Pressable, View, Animated } from 'react-native';
import { Styles, LightMode, DarkMode, StylesLightMode, StylesDarkMode } from './styles/Styles';
import Checkbox from 'expo-checkbox';
import { ThemeContext } from './Contexts';
import { RectButton, PanGestureHandler, LongPressGestureHandler } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function HabitsItem({habitId, habitName, isCompleted, addCompletedHabit, deleteHabit}) {
  const {theme} = useContext(ThemeContext)
  const [isCompletedLocal, setIsCompletedLocal] = useState(isCompleted)
  const checkUncheck = () => {
    setIsCompletedLocal(prev => !prev)
    addCompletedHabit(habitId, isCompletedLocal)
  }

  renderRightActions = () => {
    return (
      <Pressable onPress={() => deleteHabit(habitId)}>
      <View style={Styles.deleteBox}>
        <Text style={Styles.deleteBoxTxt}>Delete</Text>
      </View>
      </Pressable>
    );
  };
  
  return (
    <View style={Styles.habit_box}>
      <GestureHandlerRootView>
        <Swipeable renderRightActions={renderRightActions}>
          <View style={theme == LightMode ? Styles.habit_lm : Styles.habit_dm}>
            {/* <Pressable style={Styles.checkbox_pressable} onPress={() => checkUncheck()}> */}
            {/* </Pressable> */}
            
            {theme == LightMode
            ?
            <>
              <View style={Styles.habit_checkbox_box}>
                <Checkbox color={isCompletedLocal ? '#419947' : undefined} style={isCompletedLocal ? Styles.checkbox_checked_lm : Styles.checkbox_unchecked_lm} value={isCompletedLocal ? true : false} onValueChange={() => checkUncheck()}/>
              </View>
              <Text style={isCompletedLocal ? Styles.habit_name_completed_lm : Styles.habit_name_lm}>{habitName}</Text>
            </>
            :
            <>
              <View style={Styles.habit_checkbox_box}>
                <Checkbox color={isCompletedLocal ? '#419947' : undefined} style={isCompletedLocal ? Styles.checkbox_checked_dm : Styles.checkbox_unchecked_dm} value={isCompletedLocal ? true : false} onValueChange={() => checkUncheck()}/>
              </View>
              <Text style={isCompletedLocal ? Styles.habit_name_completed_dm : Styles.habit_name_dm}>{habitName}</Text>
            </>
            }
            
          </View>
        </Swipeable>
      </GestureHandlerRootView>
      <View style={theme == LightMode ? Styles.habit_separator_lm : Styles.habit_separator_dm}></View>
    </View>
  )
}