import { ScrollView, View, Text } from "react-native"
import { useContext } from 'react';
import DarkModeToggle from "../components/settings/DarkModeToggle"
import { Styles, LightMode, DarkMode } from "../components/styles/Styles"
import { ThemeContext } from '../components/Contexts';

export default function Settings() {
  const {theme} = useContext(ThemeContext)

  return (
    <View style={Styles.screenContainer}>
      <View style={Styles.pageHeaderContainer}>
        <View style={Styles.pageHeaderLeft}></View>
        <View style={Styles.pageHeaderCenter}>
          <Text style={theme == LightMode ? Styles.pageHeaderCenterTitleLm : Styles.pageHeaderCenterTitleDm}>
            Settings
          </Text>
          <Text style={theme == LightMode ? Styles.pageHeaderCenterSubTitleLm : Styles.pageHeaderCenterSubTitleDm}>
            Customize Your Experience
          </Text>
        </View>
        <View style={Styles.pageHeaderRight}></View>
      </View>

      <ScrollView style={{paddingVertical: 20, paddingHorizontal: 20}}>
        <View style={Styles.setting}>
          <DarkModeToggle />
          <Text>Hide "+ Add Habit" Button</Text>
          <Text>Show deleted habits</Text>
        </View>
      </ScrollView>
    </View>
  )
}