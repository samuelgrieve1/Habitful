import { Pressable, View, Text } from "react-native"
import { useState } from "react"
import { Styles } from "../styles/Styles"

export default function DaySelect({dayOfWeek, addToDaysPerWeek, removeFromDaysPerWeek}) {
  const [isSelected, setIsSelected] = useState(false)
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
      <View style={[Styles.round_day_box, isSelected && Styles.round_day_box_selected]}>
        <Text style={[Styles.round_day_text, isSelected && Styles.round_day_text_selected]}>{dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.substring(1, 3)}</Text>
      </View>
    </Pressable>
  )
}