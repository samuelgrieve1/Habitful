import { ScrollView, View, Text } from "react-native"
import { useContext } from 'react';
import { Styles, LightMode, DarkMode } from "../components/styles/Styles"
import { ThemeContext } from '../components/Contexts';
import { CartesianChart } from "victory-native";


export default function Progress() {
  const {theme} = useContext(ThemeContext)

  const DATA = Array.from({ length: 31 }, (_, i) => ({
    day: i,
    highTmp: 40 + 30 * Math.random(),
  }));

  return (
    <View style={Styles.screenContainer}>
      <View style={Styles.pageHeaderContainer}>
        <View style={Styles.pageHeaderLeft}></View>
        <View style={Styles.pageHeaderCenter}>
          <Text style={theme == LightMode ? Styles.pageHeaderCenterTitleLm : Styles.pageHeaderCenterTitleDm}>
            Progress
          </Text>
          <Text style={theme == LightMode ? Styles.pageHeaderCenterSubTitleLm : Styles.pageHeaderCenterSubTitleDm}>
            Measure Your Success
          </Text>
        </View>
        <View style={Styles.pageHeaderRight}></View>
      </View>

      {/* <CartesianChart data={DATA} xKey="day" yKeys={["highTmp"]} /> */}

      {/* <Text>All Habits</Text>
      <Text>Total Completions (All Time)(Have a circular chart with all habits inside it and beneath it: All Habit, HAbit 1, Habit 2, Etc all color coated)</Text>
      <Text>Total Completions (This Month)</Text>
      <Text>Total Completions (This Week)</Text>
      <Text>Total Completions (Last 30 Days)</Text>
      <Text>Total Completions (Last 7 Days)</Text>
      <Text>Longest Streak</Text>
      <Text></Text>
      <Text></Text> */}
    </View>
  )
}