import 'react-native-gesture-handler';
import React, { useState, useContext, createContext } from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Styles, MyTheme } from './components/Styles';
import BottomTabNavigator from './navigation/BottomTabNavigator';
// import DrawerNavigator from './navigation/DrawerNavigation';
// import StackNavigator from './navigation/StackNavigator';

export default function App() {
  return (
    <SafeAreaView style={Styles.safe_area_view}>
      <NavigationContainer theme={MyTheme}>
        <BottomTabNavigator />
        {/* <DrawerNavigator /> */}
        {/* <StackNavigator /> */}
      </NavigationContainer>
      <StatusBar />
    </SafeAreaView>
  ); 
}