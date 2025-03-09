import { Pressable, View, Text } from "react-native"
import { useState } from "react"
import { Styles } from "../styles/Styles"

export default function DaySelect({dayOfWeek, addToDaysPerWeek, removeFromDaysPerWeek, selectedColor}) {
  const [isSelected, setIsSelected] = useState(true)
  const clicky = () => {
    if(!isSelected){
      setIsSelected(true)
      addToDaysPerWeek(dayOfWeek)
    } else {
      setIsSelected(false)
      removeFromDaysPerWeek(dayOfWeek)
    }
  }

  return (
    <Pressable onPress={() => {clicky()}}>
      <View style={[Styles.roundDayBox, isSelected && Styles.roundDayBoxSelected && {backgroundColor: selectedColor}]}>
        <Text style={[Styles.roundDayText, isSelected && Styles.roundDayTextSelected]}>{dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.substring(1, 3)}</Text>
      </View>
    </Pressable>
  )
}