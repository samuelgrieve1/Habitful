import { useState, useContext, useEffect } from 'react';
import { Switch, View, Text } from 'react-native';
import { Styles, LightMode, DarkMode } from '../styles/Styles';
import { ThemeContext, CustomColorContext } from '../Contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ColorPicker from '../ColorPicker';

export default function CustomColorPicker() {
  const {customColor, setCustomColor} = useContext(CustomColorContext)
  const [selectedColor, setSelectedColor] = useState('#4185e7')
  const [availableColors, setAvailableColors] = useState([
    '#4185e7',
    '#ff80ed',
    '#065535',
    '#ffc0cb',
    '#008080',
    '#ff0000',
    '#ffd700',
    '#0000ff',
    '#ffa500',
    '#c6e2ff',
    '#b0e0e6',
    '#40e0d0',
    '#d3ffce',
    '#ff7373',
    '#003366',
    '#00ff00',
    '#8a2be2',
    '#8a2be2',
  ])

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
      <View style={Styles.color_picker_box}>
        {availableColors.map((color, i) => {
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