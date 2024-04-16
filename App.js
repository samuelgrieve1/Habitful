import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNav from './components/BottomTabNav';
import AddHabit from './components/AddHabit';

export default function App() {
  return (
    <>
    <NavigationContainer>
      <BottomTabNav />
    </NavigationContainer>
    <StatusBar />
    </>
  );
}