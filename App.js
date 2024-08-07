import 'react-native-gesture-handler';
import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Styles, LightMode, DarkMode } from './components/styles/Styles';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import { ThemeContext } from './components/Contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import DrawerNavigator from './navigation/DrawerNavigation';
// import StackNavigator from './navigation/StackNavigator';

export default function App() {
  const [theme, setTheme] = useState(LightMode)

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

  useEffect(() => {
    getDarkMode()
  },[])

  return (
    <View style={{
      flex:1,
      backgroundColor: theme == LightMode ? '#fff' : '#000',
    }}>
    <ThemeContext.Provider value={{theme, setTheme}}>
      <SafeAreaView style={Styles.safe_area_view}>
        <StatusBar style={theme == LightMode ? 'dark' : 'light'}/>
        <NavigationContainer theme={theme}>
          <BottomTabNavigator />
          {/* <DrawerNavigator /> */}
          {/* <StackNavigator /> */}
        </NavigationContainer>
      </SafeAreaView>
    </ThemeContext.Provider>
    </View>
  ); 
}