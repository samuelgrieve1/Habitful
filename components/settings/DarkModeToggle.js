import { useState } from 'react';
import { Switch, View, Text } from 'react-native';
import { Styles } from '../Styles';

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => setDarkMode((previousState) => !previousState);
  
  return (
    <View style={Styles.row}>
      <View style={Styles.dark_mode_txt}>
        <Text>Dark Mode</Text>
      </View>
      <View style={Styles.dark_mode_switch}>
        <Switch onValueChange={toggleDarkMode} value={darkMode} />
      </View>
    </View>
  )
}