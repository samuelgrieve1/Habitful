import { Pressable, View, Modal, Button } from "react-native"
import { useState, useContext } from "react"
import { LightMode, Styles } from "./styles/Styles";
import { ThemeContext } from "./Contexts";
import Entypo from '@expo/vector-icons/Entypo';
import { LinearGradient } from 'expo-linear-gradient';

export default function ColorPicker({setHabitColor, color, setSelectedColor, selectedColor, setModalVisibleColorPicker, setCustomColor}) {
  const { theme } = useContext(ThemeContext)
  const handleClick = () => {
    setHabitColor && setHabitColor(color)
    setSelectedColor && setSelectedColor(color)
    setCustomColor && setCustomColor(selectedColor)
    setModalVisibleColorPicker && setModalVisibleColorPicker(false)
  }

  return (
    <Pressable onPress={() => handleClick()}>
      <View
        style={[
          Styles.colorPickerColor,
          {backgroundColor: color},
          selectedColor == color && Styles.colorPickerColorSelected,
        ]}
      >
      </View>
    </Pressable>
  )
}