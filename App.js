import React, { useState, useContext, createContext } from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Styles, MyTheme } from './components/Styles';
import BottomTabNav from './components/BottomTabNav';
import AddHabit from './components/AddHabit';

const RootStack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={Styles.safe_area_view}>
      <NavigationContainer theme={MyTheme}>
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