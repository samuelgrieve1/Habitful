import { ScrollView, View } from "react-native"
import DarkModeToggle from "../components/settings/DarkModeToggle"
import { Styles } from "../components/styles/Styles"

export default function Settings() {
  return (
    <ScrollView style={{paddingVertical: 20, paddingHorizontal: 20}}>
      <View style={Styles.setting}>
        <DarkModeToggle />
      </View>
    </ScrollView>
  )
}