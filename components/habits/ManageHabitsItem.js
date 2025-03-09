import { useState, useContext } from 'react';
import { Text, Pressable, View, Animated } from 'react-native';
import { Styles, LightMode, DarkMode, StylesLightMode, StylesDarkMode } from '../styles/Styles';
import Checkbox from 'expo-checkbox';
import { ThemeContext } from '../Contexts';
import { RectButton, PanGestureHandler, LongPressGestureHandler } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Feather } from '@expo/vector-icons';

export default function ManageHabitsItem({habitId, habitName, setSelectedHabitId, setModalVisibleEdit}) {
  const {theme} = useContext(ThemeContext)

  const getHabitToEdit = () => {
    console.log(habitId)
    setSelectedHabitId(habitId)
    setModalVisibleEdit(true)
  }
  
  return (
    <View style={[Styles.habitBox, theme == DarkMode && Styles.habitBoxDm]}>
      <View style={[Styles.habit, theme == DarkMode && Styles.habitDm]}>
        <View style={Styles.habitNameBox}>
          <Pressable  onPress={getHabitToEdit}>
            <Text style={[Styles.habitName, theme == DarkMode && Styles.habitNameDm]}>{habitName}</Text>
          </Pressable>
        </View>
      </View>
      <View style={[Styles.habitSeparator, theme == DarkMode && Styles.habitSeparatorDm]} />
    </View>
  )
}