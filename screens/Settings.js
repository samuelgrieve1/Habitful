import { ScrollView, View, Text } from "react-native"
import { useContext } from 'react';
import DarkModeToggle from "../components/settings/DarkModeToggle"
import { Styles, LightMode, DarkMode } from "../components/styles/Styles"
import { ThemeContext, CustomColorContext } from '../components/Contexts';
import CustomColorPicker from "../components/settings/CustomColorPicker";

export default function Settings() {
  const {theme} = useContext(ThemeContext)
  const {customColor} = useContext(CustomColorContext)

  console.log(customColor)
  return (
    <View style={Styles.screenContainer}>
      <View style={Styles.pageHeaderContainer}>
        <View style={Styles.pageHeaderLeft}></View>
        <View style={Styles.pageHeaderCenter}>
          <Text style={[theme == LightMode ? Styles.pageHeaderCenterTitleLm : Styles.pageHeaderCenterTitleDm, {color: customColor}]}>
            Settings
          </Text>
          <Text style={theme == LightMode ? Styles.pageHeaderCenterSubTitleLm : Styles.pageHeaderCenterSubTitleDm}>
            Customize Your Experience
          </Text>
        </View>
        <View style={Styles.pageHeaderRight}></View>
      </View>

      <ScrollView style={{paddingVertical: 20, paddingHorizontal: 0}}>
        <View style={Styles.setting}>
          <DarkModeToggle />
          <Text>Hide "+ Add Habit" Button</Text>
          <Text>Show deleted habits</Text>
        </View>
        <CustomColorPicker />
      </ScrollView>
    </View>
  )
}