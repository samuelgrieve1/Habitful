import { useState, useContext, useEffect } from 'react';
import { Switch, View, Text } from 'react-native';
import { Styles, LightMode, DarkMode } from '../styles/Styles';
import { ThemeContext, CustomColorContext } from '../Contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DarkModeToggle({customColor, setCustomColor, setSelectedColor}) {
  const {theme, setTheme} = useContext(ThemeContext)
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = async () => {
    setDarkMode(prev => !prev)
    if (darkMode && customColor == '#ffffff'){
      setTheme(LightMode)
      setCustomColor('#000000')
      setSelectedColor('#000000')
    }
    if (!darkMode && customColor == '#000000'){
      setTheme(DarkMode)
      setCustomColor('#ffffff')
      setSelectedColor('#ffffff')
    }
    else {
      setTheme(darkMode ? LightMode : DarkMode)
    }
    
    // customColor == '#ffffff' && setCustomColor('#000000')
    // customColor == '#000000' && setCustomColor('#ffffff')
  }

  const saveDarkMode = async (value) => {
    try {
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
  const saveCustomColor = async (value) => {
    try {
      //const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('customcolor', value)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getDarkMode()
  },[])

  useEffect(() => {
    saveDarkMode(darkMode)
    saveCustomColor(customColor)
  },[toggleDarkMode])
  
  return (
    <View style={Styles.row}>
      <View style={Styles.dark_mode_txt_box}>
        <Text style={theme == LightMode ? Styles.dark_mode_txt_lm : Styles.dark_mode_txt_dm}>Dark Mode</Text>
      </View>
      <View style={Styles.dark_mode_switch_box}>
        <Switch onValueChange={toggleDarkMode} value={darkMode} />
      </View>
    </View>
  )
}