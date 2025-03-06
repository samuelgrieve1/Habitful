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
    setModalVisibleColorPicker && setModalVisibleColorPicker(false)
    setCustomColor && setCustomColor(selectedColor)
  }

  return (
    <Pressable onPress={() => handleClick()}>
      <View
        style={[
          theme == LightMode ? Styles.color_picker_color_lm : Styles.color_picker_color_dm,
          {backgroundColor: color},
          selectedColor == color && Styles.color_picker_color_selected,
        ]}
      >
      </View>
    </Pressable>
  )
}