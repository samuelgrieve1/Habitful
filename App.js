import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNav from './components/BottomTabNav';
import AddHabit from './components/AddHabit';

const RootStack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
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
    </>
  ); 
}