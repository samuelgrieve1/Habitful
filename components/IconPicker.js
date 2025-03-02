import { Pressable, View, Modal, Button } from "react-native"
import { useState, useContext } from "react"
import { LightMode, Styles } from "./styles/Styles";
import { ThemeContext } from "./Contexts";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function IconPicker({setHabitIcon, icon, setSelectedIcon, selectedIcon, selectedColor}) {
  const { theme } = useContext(ThemeContext)
  const handleClick = () => {
    if(selectedIcon != icon){
      setHabitIcon(icon)
      setSelectedIcon(icon)
    } else {
      setHabitIcon('')
      setSelectedIcon('')
    }
  }

  return (
    <Pressable onPress={() => handleClick()}>
      <View
        style={[
          theme == LightMode ? Styles.icon_picker_icon_lm : Styles.icon_picker_icon_dm
        ]}
      >
        <FontAwesome6 name={icon} size={24} color={selectedColor} />
      </View>
    </Pressable>
  )
}