import React, { useState, useContext, createContext } from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Styles from './components/Styles';
import BottomTabNav from './components/BottomTabNav';
import AddHabit from './components/AddHabit';

const RootStack = createStackNavigator();
const DBContext = createContext(null)
const test1 = console.log("test1")

export default function App() {
  return (
    <SafeAreaView style={Styles.safe_area_view}>
      <NavigationContainer test1={test1}>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Group>
            {/* <BottomTabNav /> */}
            <RootStack.Screen name="BottomTabNav" component={BottomTabNav} />
          </RootStack.Group>
          <RootStack.Group screenOptions={{ presentation: 'modal' }}>
            <RootStack.Screen name="AddHabit" component={AddHabit} />
          </RootStack.Group>
        </RootStack.Navigator>
      </NavigationContainer>
      <StatusBar />
    </SafeAreaView>
  ); 
}