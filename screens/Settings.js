import { ScrollView, View, Text } from "react-native"
import { useContext, useState } from 'react';
import DarkModeToggle from "../components/settings/DarkModeToggle"
import { Styles, LightMode, DarkMode } from "../components/styles/Styles"
import { ThemeContext, CustomColorContext } from '../components/Contexts';
import CustomColorPicker from "../components/settings/CustomColorPicker";
import ScrollableCalendar from "./history/ScrollableCalendar";

export default function Settings() {
  const {theme} = useContext(ThemeContext)
  const {customColor, setCustomColor} = useContext(CustomColorContext)
  const [selectedColor, setSelectedColor] = useState(customColor)

  //console.log(customColor)
  return (
    <View style={Styles.screenContainer}>
      <View style={Styles.pageHeaderContainer}>
        <View style={Styles.pageHeaderLeft}></View>
        <View style={Styles.pageHeaderCenter}>
          <Text
            style={[
              Styles.pageHeaderCenterTitle,
              theme == DarkMode && Styles.pageHeaderCenterTitleDm
            ]}
          >
            Settings
          </Text>
          <Text
            style={[
              Styles.pageHeaderCenterSubTitle,
              theme == DarkMode && Styles.pageHeaderCenterSubTitleDm
            ]}
          >
            Customize Your Experience
          </Text>
        </View>
        <View style={Styles.pageHeaderRight}></View>
      </View>

      <ScrollView style={{paddingVertical: 20, paddingHorizontal: 0}}>
        <View style={Styles.setting}>
          <DarkModeToggle
            customColor={customColor}
            setCustomColor={setCustomColor}
            setSelectedColor={setSelectedColor}
          />
          <Text>Hide "+ Add Habit" Button</Text>
          <Text>Show deleted habits</Text>
        </View>
        <CustomColorPicker
          customColor={customColor}
          setCustomColor={setCustomColor}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </ScrollView>
    </View>
  )
}