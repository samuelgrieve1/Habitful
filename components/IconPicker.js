import { Pressable, View, Modal, Button } from "react-native"
import { useState, useContext } from "react"
import { LightMode, Styles } from "./styles/Styles";
import { ThemeContext } from "./Contexts";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function IconPicker({setHabitIcon, icon, setSelectedIcon, selectedIcon, selectedColor, setModalVisibleIconPicker}) {
  const { theme } = useContext(ThemeContext)
  const handleClick = () => {
    setHabitIcon(icon)
    setSelectedIcon(icon)
    setModalVisibleIconPicker(false)
  }

  return (
    <Pressable onPress={() => handleClick()}>
      <View
        style={[
          theme == LightMode ? Styles.icon_picker_icon_lm : Styles.icon_picker_icon_dm,
        ]}
      >
        <FontAwesome6
          name={icon}
          size={40}
          style={[
            theme == LightMode ? {color: '#000'} : {color: '#fff'},
            selectedIcon == icon && {color: selectedColor}
          ]}
        />
      </View>
    </Pressable>
  )
}