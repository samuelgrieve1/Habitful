import { ScrollView } from "react-native"
import DarkModeToggle from "../components/settings/DarkModeToggle"
import Container from "../components/Container"

export default function Settings() {
  return (
    <ScrollView style={{paddingVertical: 20, paddingHorizontal: 20}}>
      <DarkModeToggle />
    </ScrollView>
  )
}