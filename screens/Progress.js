import { ScrollView, View, Text, Dimensions, Pressable } from "react-native"
import { useContext, useState } from 'react';
import { Styles, LightMode, DarkMode } from "../components/styles/Styles"
import { ThemeContext } from '../components/Contexts';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

export default function Progress() {
  const {theme} = useContext(ThemeContext)
  const [progressView, setProgressView] = useState('listview')
  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundGradientFrom: "black",
    //backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "black",
    //backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(65, 133, 231, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };
  const dataLineChart = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(65, 133, 231, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Rainy Days"] // optional
  };
  const dataProgressChart = {
    labels: ["Swim", "Bike", "Run"], // optional
    data: [0.4, 0.6, 0.8]
  };
  const dataBarChart = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43]
      }
    ]
  };
  const dataStackedBarChart = {
    labels: ["Test1", "Test2"],
    legend: ["L1", "L2", "L3"],
    data: [
      [60, 60, 60],
      [30, 30, 60]
    ],
    barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
  };
  const dataPieChart = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(65, 133, 231, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];
  const commitsData = [
    { date: "2017-01-02", count: 1 },
    { date: "2017-01-03", count: 2 },
    { date: "2017-01-04", count: 3 },
    { date: "2017-01-05", count: 4 },
    { date: "2017-01-06", count: 5 },
    { date: "2017-01-30", count: 2 },
    { date: "2017-01-31", count: 3 },
    { date: "2017-03-01", count: 2 },
    { date: "2017-04-02", count: 4 },
    { date: "2017-03-05", count: 2 },
    { date: "2017-02-30", count: 4 }
  ];

  return (
    <View style={Styles.screenContainer}>
      <View style={Styles.pageHeaderContainer}>
        <View style={Styles.pageHeaderLeft}></View>
        <View style={Styles.pageHeaderCenter}>
          <Text
            style={[
              Styles.pageHeaderCenterTitle,
              theme == Styles.pageHeaderCenterTitleDm
            ]}
          >
            Progress
          </Text>
          <Text
            style={[
              Styles.pageHeaderCenterSubTitle,
              theme == DarkMode && Styles.pageHeaderCenterSubTitleDm
            ]}
          >
            Measure Your Success
          </Text>
        </View>
        <View style={Styles.pageHeaderRight}></View>
      </View>

      {/* TABS */}
      <View style={Styles.historyViewBtnContainer}>
        <Pressable
          onPress={() => setProgressView('listview')}
          style={
            theme == LightMode && progressView == 'listview' && Styles.historyViewBtnSelectedLm  ||
            theme == DarkMode && progressView == 'listview' && Styles.historyViewBtnSelectedDm  ||
            Styles.historyViewBtn}>
          <Text
            style={
              theme == LightMode && progressView == 'listview' && Styles.historyViewBtnTxtSelectedLm ||
              theme == DarkMode && progressView == 'listview' && Styles.historyViewBtnTxtSelectedDm ||
              theme == LightMode && Styles.historyViewBtnTxtLm ||
              theme == DarkMode && Styles.historyViewBtnTxtDm}>
              List
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setProgressView('graphview')}
          style={
            theme == LightMode && progressView == 'graphview' && Styles.historyViewBtnSelectedLm  ||
            theme == DarkMode && progressView == 'graphview' && Styles.historyViewBtnSelectedDm  ||
            Styles.historyViewBtn}>
          <Text
            style={
              theme == LightMode && progressView == 'graphview' && Styles.historyViewBtnTxtSelectedLm ||
              theme == DarkMode && progressView == 'graphview' && Styles.historyViewBtnTxtSelectedDm ||
              theme == LightMode && Styles.historyViewBtnTxtLm ||
              theme == DarkMode && Styles.historyViewBtnTxtDm}>
              Graph
          </Text>
        </Pressable>
      </View>

{progressView == 'graphview' &&
      <ScrollView>

<LineChart
  data={dataLineChart}
  width={screenWidth}
  height={220}
  chartConfig={chartConfig}
/>

<LineChart
  data={dataLineChart}
  width={screenWidth}
  height={256}
  verticalLabelRotation={30}
  chartConfig={chartConfig}
  bezier
/>

<ProgressChart
  data={dataProgressChart}
  width={screenWidth}
  height={220}
  strokeWidth={16}
  radius={32}
  chartConfig={chartConfig}
  hideLegend={false}
/>

<BarChart
  //style={graphStyle}
  data={dataBarChart}
  width={screenWidth}
  height={220}
  yAxisLabel="$"
  chartConfig={chartConfig}
  verticalLabelRotation={30}
/>

<StackedBarChart
  //style={graphStyle}
  data={dataStackedBarChart}
  width={screenWidth}
  height={220}
  chartConfig={chartConfig}
/>

<PieChart
  data={dataPieChart}
  width={screenWidth}
  height={220}
  chartConfig={chartConfig}
  accessor={"population"}
  backgroundColor={"transparent"}
  paddingLeft={"15"}
  center={[10, 50]}
  absolute
/>

<ContributionGraph
  values={commitsData}
  endDate={new Date("2017-04-01")}
  numDays={105}
  width={screenWidth}
  height={220}
  chartConfig={chartConfig}
/>

</ScrollView>
}

{progressView == 'graphview' &&
<View>
      <Text>All Habits</Text>
      <Text>Total Completions (All Time)(Have a circular chart with all habits inside it and beneath it: All Habit, HAbit 1, Habit 2, Etc all color coated)</Text>
      <Text>Total Completions (This Month)</Text>
      <Text>Total Completions (This Week)</Text>
      <Text>Total Completions (Last 30 Days)</Text>
      <Text>Total Completions (Last 7 Days)</Text>
      <Text>Longest Streak</Text>
      <Text></Text>
      <Text></Text>
      </View>
}
    </View>
  )
}