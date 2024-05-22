import { useState, useContext, useEffect } from 'react';
import { Switch, View, Text } from 'react-native';
import { Styles, LightMode, DarkMode } from '../styles/Styles';
import { ThemeContext } from '../Contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DarkModeToggle() {
  const { theme, setTheme } = useContext(ThemeContext)
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = async () => {
    setDarkMode(prev => !prev)
    
    // getDarkMode()
    setTheme(darkMode ? LightMode : DarkMode)
    //console.log(theme.colors)
    // console.log(Styles)
    //console.log(theme == LightMode)
  }

  const saveDarkMode = async (value) => {
    try {
      console.log('saved', value)
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('darkmode', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }
  const getDarkMode = async () => {
    try {
      const value = await AsyncStorage.getItem('darkmode')
      if (value !== null) {
        setDarkMode(value === 'true' ? true : false)
      }
    } catch (e) {
        console.log(e)
    }
  }

  useEffect(() => {
    getDarkMode()
  },[])

  useEffect(() => {
    saveDarkMode(darkMode)
  },[toggleDarkMode])
  
  return (
    <View style={Styles.row}>
      <View style={theme == LightMode ? Styles.dark_mode_txt_lm : Styles.dark_mode_txt_dm}>
        <Text>Dark Mode</Text>
      </View>
      <View style={Styles.dark_mode_switch}>
        <Switch onValueChange={toggleDarkMode} value={darkMode} />
      </View>
    </View>
  )
}