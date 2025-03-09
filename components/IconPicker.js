import { Pressable, View, Modal, Button } from "react-native"
import { useState, useContext } from "react"
import { DarkMode, LightMode, Styles } from "./styles/Styles";
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
        style={Styles.iconPickerIcon}
      >
        <FontAwesome6
          name={icon}
          size={40}
          style={[
            theme == DarkMode ? Styles.whiteTxt : Styles.blackTxt,
            selectedIcon == icon && {color: selectedColor}
          ]}
        />
      </View>
    </Pressable>
  )
}