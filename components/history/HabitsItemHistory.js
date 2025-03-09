import { useState, useContext } from 'react';
import { Text, Pressable, View, Animated } from 'react-native';
import { Styles, LightMode, DarkMode, StylesLightMode, StylesDarkMode } from '../styles/Styles';
import Checkbox from 'expo-checkbox';
import { ThemeContext } from '../Contexts';
import { RectButton, PanGestureHandler, LongPressGestureHandler } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function HabitsItemHistory({habitName, isCompleted, addCompletedHabit, deleteHabit, setSelectedHabitId, setModalVisibleEdit}) {
  const {theme} = useContext(ThemeContext)
  const [isCompletedLocal, setIsCompletedLocal] = useState(isCompleted)
  const checkUncheck = () => {
    setIsCompletedLocal(prev => !prev)
    addCompletedHabit(habitName, isCompletedLocal)
  }
  
  return (
    <View style={Styles.habitBox}>
      <View style={Styles.habit}>
        <View style={Styles.habitNameBox}>
          <Text
            style={[
              Styles.habitName,
              theme == DarkMode && Styles.habitNameDm,
              isCompletedLocal && Styles.habitNameCompleted
            ]}
          >
            {habitName}
          </Text>
        </View>    
      </View>
      <View style={[Styles.habitSeparator, theme == DarkMode && Styles.habitSeparatorDm]} />
    </View>
  )
}