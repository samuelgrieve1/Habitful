import { useState, useContext } from 'react';
import { Switch, View, Text } from 'react-native';
import { Styles, LightMode, DarkMode } from '../styles/Styles';
import { ThemeContext } from '../Contexts';

export default function DarkModeToggle() {
  const { theme, setTheme } = useContext(ThemeContext)
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = async () => {
    setDarkMode(prev => !prev)
    setTheme(darkMode ? LightMode : DarkMode)
    //console.log(theme.colors)
    // console.log(Styles)
    //console.log(theme == LightMode)
  }
  
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