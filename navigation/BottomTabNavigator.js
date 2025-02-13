import { useContext, useState } from 'react';
import { Image, Button, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { Styles, LightMode } from '../components/styles/Styles';
import { ThemeContext } from '../components/Contexts';

import Today from '../screens/Today';
import Habits from '../screens/Habits';
import Progress from '../screens/Progress';
import History from '../screens/History';
import Settings from '../screens/Settings';

// import StackNavigator from './settings/StackNavigator';

const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 36, height: 36 }}
      source={require('../assets/ninja2.png')}
    />
  );
}

export default function BottomTabNavigator() {
  const {theme} = useContext(ThemeContext)

  return (
    <Tab.Navigator
      initialRouteName="Today"
      screenOptions={{
        // headerShadowVisible: true,
        // headerStyle : {
        //   height: 70,
        //   borderBottomWidth: 1,
        //   borderBottomColor: theme == LightMode ? '#eee' : '#111',
        // },
        // headerTitleAlign: 'center',
        // headerTitleStyle: {
        //   fontSize: 36,
        // },
        tabBarStyle: {
          height: 60,
          borderTopWidth: 1,
          borderTopColor: theme == LightMode ? '#eee' : '#111',
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        //tabBarActiveBackgroundColor: '#111',
        // tabBarLabelStyle: {
        //   color: theme == LightMode ? '#333' : '#eee',
        // },

      }}
    >
      <Tab.Screen
        name="Today"
        component={Today}
        options={{
          headerShown: false,
          //headerShadowVisible: false,
          tabBarIcon: (tintcolor) => (<Feather name="check" size={24} color={tintcolor.color} />),
          // headerLeft: () => (
          //   <View style={Styles.header_right}>
          //     <Feather name="arrow-left" size={24} style={theme == LightMode ? Styles.headerIconLeftLm : Styles.headerIconLeftDm} />
          //   </View>
          // ),
          // headerRight: () => (
          //   <View style={Styles.header_right}>
          //     <Feather name="arrow-right" size={24} style={theme == LightMode ? Styles.headerIconRightLm : Styles.headerIconRightDm} />
          //     {/* <Feather name="arrow-right" size={24} style={theme == LightMode ? Styles.menuIconLm : Styles.menuIconDm} /> */}
          //   </View>
          // ),
        }}
      />
      <Tab.Screen
        name="Habits"
        component={Habits}
        options={{
          headerShown: false,
          //headerShadowVisible: false,
          tabBarIcon: (tintcolor) => (<Feather name="list" size={24} color={tintcolor.color} />),
          // headerLeft: () => (
          //   <View style={Styles.header_left}>
          //     <Feather name="menu" size={24} color={theme == LightMode ? '#757575' : '#757575'} />
          //   </View>
          // ),
          headerRight: () => (
            <View style={Styles.header_right}>
              <Feather name="plus" size={24} style={theme == LightMode ? Styles.menuIconLm : Styles.menuIconDm} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={Progress}
        options={{
          // tabBarActiveTintColor: '#4185e7',
          headerShown: false,
          tabBarIcon: (tintcolor) => (<Feather name="bar-chart" size={24} color={tintcolor.color} />)
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          // tabBarActiveTintColor: '#4185e7',
          headerShown: false,
          // headerRight: () => (
          //   <View style={Styles.header_right}>
          //     {/* <Feather name="filter" size={24} style={theme == LightMode ? Styles.filterHistoryIconLm : Styles.filterHistoryIconDm} /> */}
          //     <Button
          //       style={theme == LightMode ? Styles.historyCalendarBtnLm : Styles.historyCalendarBtnDm}
          //       title="Calendar"
          //       onPress={() => Alert.alert('Right button pressed')}
          //     />
          //   </View>
          // ),
          tabBarIcon: (tintcolor) => (<Feather name="clock" size={24} color={tintcolor.color} />)
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          // tabBarActiveTintColor: '#4185e7',
          headerShown: false,
          tabBarIcon: (tintcolor) => (<Feather name="settings" size={24} color={tintcolor.color} />)
        }}
      />
    </Tab.Navigator>
  );
}