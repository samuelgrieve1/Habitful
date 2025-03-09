import { useState, useContext, useEffect } from 'react';
import { Switch, View, Text } from 'react-native';
import { Styles, LightMode, DarkMode } from '../styles/Styles';
import { ThemeContext, CustomColorContext } from '../Contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ColorPicker from '../ColorPicker';
import { Colors } from '../Colors';

export default function CustomColorPicker({customColor, setCustomColor, selectedColor, setSelectedColor}) {
  const {theme} = useContext(ThemeContext)
  // const [selectedColor, setSelectedColor] = useState(customColor)
  //const [availableColors, setAvailableColors] = useState(Colors)

  const saveCustomColor = async (value) => {
    try {
      //const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('customcolor', value)
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

  // useEffect(() => {
  //   getCustomColor()
  // },[])

  useEffect(() => {
    saveCustomColor(selectedColor)
    setCustomColor(selectedColor)
  },[selectedColor])
  
  return (
    <View style={Styles.row}>
      <View style={Styles.colorPickerBox}>
        <ColorPicker
          color={theme == DarkMode ? Styles.white : '#000000'}
          setSelectedColor={setSelectedColor}
          selectedColor={selectedColor}
          setCustomColor={setCustomColor}
        />
        {Colors.map((color, i) => {
          return (
            <ColorPicker
              key={i}
              color={color}
              setSelectedColor={setSelectedColor}
              selectedColor={selectedColor}
              setCustomColor={setCustomColor}
            />
          )
        })}
      </View>
    </View>
  )
}