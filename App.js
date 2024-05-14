import 'react-native-gesture-handler';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer  } from '@react-navigation/native';
import { Styles, LightMode, DarkMode } from './components/styles/Styles';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import { ThemeContext } from './components/Contexts';
// import DrawerNavigator from './navigation/DrawerNavigation';
// import StackNavigator from './navigation/StackNavigator';

export default function App() {
  const [theme, setTheme] = useState(LightMode)

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <SafeAreaView style={Styles.safe_area_view}>
        <StatusBar />
        <NavigationContainer theme={theme}>
          <BottomTabNavigator />
          {/* <DrawerNavigator /> */}
          {/* <StackNavigator /> */}
        </NavigationContainer>
      </SafeAreaView>
    </ThemeContext.Provider>
  ); 
}