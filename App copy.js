import 'react-native-gesture-handler';
import React, { useState, useContext, createContext } from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Styles, MyTheme } from './components/Styles';
import BottomTabNav from './components/BottomTabNav';
import AddHabit from './components/AddHabit';

import Progress from './components/Progress';
import HabitHistory from './components/HabitHistory';

import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();

const DrawerNav = () => {
<Drawer.Navigator>
<Drawer.Screen name="Progress" component={Progress} />
<Drawer.Screen name="History" component={HabitHistory} />
</Drawer.Navigator>
}

export default function App() {
  return (
    <SafeAreaView style={Styles.safe_area_view}>
      <NavigationContainer theme={MyTheme}>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Group>
            <RootStack.Screen  name="BottomTabNav" component={BottomTabNav} />
          </RootStack.Group>
          <RootStack.Group screenOptions={{ presentation: 'modal' }}>
            <RootStack.Screen name="AddHabit" component={AddHabit} />
          </RootStack.Group>
          <RootStack.Group>
          <RootStack.Screen  name="DrawerNav" component={DrawerNav} />
          </RootStack.Group>
        </RootStack.Navigator>
      </NavigationContainer>
      <StatusBar />
    </SafeAreaView>
  ); 
}