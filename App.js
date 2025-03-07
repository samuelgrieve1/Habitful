import 'react-native-gesture-handler';
import React, { useContext, useState, useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Styles, LightMode, DarkMode } from './components/styles/Styles';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import { CustomColorContext, ThemeContext } from './components/Contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
// import DrawerNavigator from './navigation/DrawerNavigation';
// import StackNavigator from './navigation/StackNavigator';

export default function App() {
  const [theme, setTheme] = useState(LightMode)
  const [customColor, setCustomColor] = useState(customColor)

  const getDarkMode = async () => {
    try {
      const value = await AsyncStorage.getItem('darkmode')
      if (value !== null) {
        setTheme(value === 'true' ? DarkMode : LightMode)
      }
    } catch (e) {
        console.log(e)
    }
  }
  const getCustomColor = async () => {
    try {
      const value = await AsyncStorage.getItem('customcolor')
      if (value !== null) {
        setCustomColor(value)
      }
    } catch (e) {
        console.log(e)
    }
  }

  useEffect(() => {
    getDarkMode()
    getCustomColor()
  },[])

  return (
    <View style={{
      flex:1,
      backgroundColor: theme == LightMode ? '#fff' : '#000',
    }}>
      <ThemeContext.Provider value={{theme, setTheme}}>
      <CustomColorContext.Provider value={{customColor, setCustomColor}}>
        <SafeAreaProvider>
          <SafeAreaView style={Styles.safeAreaView}>
            <StatusBar style={theme == LightMode ? 'dark' : 'light'}/>
            <NavigationContainer theme={theme}>
              <BottomTabNavigator />
              {/* <DrawerNavigator /> */}
              {/* <StackNavigator /> */}
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </CustomColorContext.Provider>
      </ThemeContext.Provider>
    </View>
  ); 
}