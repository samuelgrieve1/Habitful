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
    <View style={theme == LightMode ? Styles.habit_box_lm : Styles.habit_box_dm}>
          <View style={theme == LightMode ? Styles.habit_lm : Styles.habit_dm}>
            
            {theme == LightMode
            ?
            <>
              <View style={Styles.habit_name_box}>
                <Pressable  onPress={getHabitToEdit}>
                  <Text style={Styles.habit_name_lm}>{habitName}</Text>
                </Pressable>
              </View>
            </>
            :
            <>
              {/* <View style={Styles.habit_name_box}> */}
                <View style={Styles.habit_name_box_text}>
                  <Pressable  onPress={getHabitToEdit}>
                    <Text style={Styles.habit_name_dm}>{habitName}</Text>
                  </Pressable>
                </View>
                <View style={Styles.habit_name_box_icon}>
                  {/* <Pressable  onPress={getHabitToEdit}>
                    <Feather name="more-horizontal" size={24} color="#fff" />
                  </Pressable> */}
                </View>
              {/* </View> */}
            </>
            }
            
          </View>
      <View style={theme == LightMode ? Styles.habit_separator_lm : Styles.habit_separator_dm}></View>
    </View>
  )
}