import { Pressable, View, Modal, Button } from "react-native"
import { useState, useContext } from "react"
import { LightMode, Styles } from "./styles/Styles";
import { ThemeContext } from "./Contexts";
import Entypo from '@expo/vector-icons/Entypo';

export default function ColorPicker({setHabitColor, color, setSelectedColor, selectedColor}) {
  const { theme } = useContext(ThemeContext)
  const handleClick = () => {
    if(selectedColor != color){
      setHabitColor(color)
      setSelectedColor(color)
    } else {
      setHabitColor('')
      setSelectedColor('')
    }
  }

  return (
    <Pressable onPress={() => handleClick()}>
      <View
        style={[
          theme == LightMode ? Styles.color_picker_color_lm : Styles.color_picker_color_dm,
          {backgroundColor: color},
          selectedColor == color && {borderColor: color}
        ]}
      >
        {selectedColor == color && <Entypo name="check" size={24} color={theme == LightMode ? 'black' : 'white'} />}
      </View>
    </Pressable>
  )
}