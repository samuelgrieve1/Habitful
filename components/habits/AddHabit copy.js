import React , {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View , Button, TextInput, Pressable, useColorScheme } from 'react-native';
import Checkbox from 'expo-checkbox';
import { app, db, getFirestore, collection, addDoc } from '../../firebase/index';
import { Feather } from '@expo/vector-icons';
import { Styles, LightMode } from '../styles/Styles';
import { ThemeContext } from '../Contexts';

export default function AddHabit({getHabits, closeModal}) {
  const { theme } = useContext(ThemeContext)
  const [habitName, setHabitName] = useState('')
  const [activeSun, setActiveSun] = useState(false)
  const [activeMon, setActiveMon] = useState(false)
  const [activeTue, setActiveTue] = useState(false)
  const [activeWed, setActiveWed] = useState(false)
  const [activeThu, setActiveThu] = useState(false)
  const [activeFri, setActiveFri] = useState(false)
  const [activeSat, setActiveSat] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const [placeNumber, setPlaceNumber] = useState(0)
  const [selectAllToggle, setSelectAllToggle] = useState(true)

  const dateAsInteger = () => {
    let newDate = new Date()
    let newDateInteger = Date.parse(newDate)
    return newDateInteger
  }

  const addHabitBtn = async () => {
    try {
      const docRef = await addDoc(collection(db, "habits"), {
        name: habitName,
        sun: activeSun,
        mon: activeMon,
        tue: activeTue,
        wed: activeWed,
        thu: activeThu,
        fri: activeFri,
        sat: activeSat,
        isActive: isActive,
        placeNumber: placeNumber,
        date_added: dateAsInteger()
      })
      getHabits()
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  const selectAllDays = async () => {
    setActiveSun(selectAllToggle)
    setActiveMon(selectAllToggle)
    setActiveTue(selectAllToggle)
    setActiveWed(selectAllToggle)
    setActiveThu(selectAllToggle)
    setActiveFri(selectAllToggle)
    setActiveSat(selectAllToggle)
    setSelectAllToggle(prev => !prev)
  }

  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{width: '100%'}}>
        <Text style={theme == LightMode ? Styles.page_title_add_habit_lm : Styles.page_title_add_habit_dm}>New Habit</Text>

        <TextInput placeholder='Habit Name' placeholderTextColor='#999999' defaultValue={habitName} onChangeText={(text) => setHabitName(text)} style={theme == LightMode ? Styles.input_lm : Styles.input_dm}/>

        <View style={Styles.form_label_row}>
          <Text style={theme == LightMode ? Styles.form_input_label_frequency_lm : Styles.form_input_label_frequency_dm}>Frequency</Text>
          <Pressable title='Select All' onPress={() => selectAllDays()}>
            <Text style={Styles.form_txt_select_all}>Select All</Text>
          </Pressable>
        </View>

        <View style={Styles.checkbox_row}>
          <View style={Styles.checkbox_col}>
            <Text style={theme == LightMode ? Styles.form_label_lm : Styles.form_label_dm}>Sun</Text>
            <Checkbox color={activeSun ? '#4185e7' : undefined} style={theme == LightMode ? Styles.checkbox_lm : Styles.checkbox_dm} value={activeSun} onValueChange={setActiveSun} />
          </View>
          <View style={Styles.checkbox_col}>
            <Text style={theme == LightMode ? Styles.form_label_lm : Styles.form_label_dm}>Mon</Text>
            <Checkbox color={activeMon ? '#4185e7' : undefined} style={theme == LightMode ? Styles.checkbox_lm : Styles.checkbox_dm} value={activeMon} onValueChange={setActiveMon} />
          </View>
          <View style={Styles.checkbox_col}>
            <Text style={theme == LightMode ? Styles.form_label_lm : Styles.form_label_dm}>Tue</Text>
            <Checkbox color={activeTue ? '#4185e7' : undefined} style={theme == LightMode ? Styles.checkbox_lm : Styles.checkbox_dm} value={activeTue} onValueChange={setActiveTue} />
          </View>
          <View style={Styles.checkbox_col}>
            <Text style={theme == LightMode ? Styles.form_label_lm : Styles.form_label_dm}>Wed</Text>
            <Checkbox color={activeWed ? '#4185e7' : undefined} style={theme == LightMode ? Styles.checkbox_lm : Styles.checkbox_dm} value={activeWed} onValueChange={setActiveWed} />
          </View>
          <View style={Styles.checkbox_col}>
            <Text style={theme == LightMode ? Styles.form_label_lm : Styles.form_label_dm}>Thu</Text>
            <Checkbox color={activeThu ? '#4185e7' : undefined} style={theme == LightMode ? Styles.checkbox_lm : Styles.checkbox_dm} value={activeThu} onValueChange={setActiveThu} />
          </View>
          <View style={Styles.checkbox_col}>
            <Text style={theme == LightMode ? Styles.form_label_lm : Styles.form_label_dm}>Fri</Text>
            <Checkbox color={activeFri ? '#4185e7' : undefined} style={theme == LightMode ? Styles.checkbox_lm : Styles.checkbox_dm} value={activeFri} onValueChange={setActiveFri} />
          </View>
          <View style={Styles.checkbox_col}>
            <Text style={theme == LightMode ? Styles.form_label_lm : Styles.form_label_dm}>Sat</Text>
            <Checkbox color={activeSat ? '#4185e7' : undefined} style={theme == LightMode ? Styles.checkbox_lm : Styles.checkbox_dm} value={activeSat} onValueChange={setActiveSat} />
          </View>
        </View>

        <View style={Styles.btns_save_cancel}>
          <Pressable  style={Styles.btn_save} onPress={() => {addHabitBtn(); closeModal()}}>
            <Text style={Styles.txt_save}>Add Habit</Text>
          </Pressable>
        </View>
        <View style={Styles.btns_save_cancel}>
          <Pressable title='Cancel' style={theme == LightMode ? Styles.btn_cancel_lm : Styles.btn_cancel_dm} onPress={() => closeModal()}>
            <Text style={theme == LightMode ? Styles.txt_cancel_lm : Styles.txt_cancel_dm}>Cancel</Text>
          </Pressable>
        </View>

        <Pressable title='Close' style={theme == LightMode ? Styles.close_modal_x_lm : Styles.close_modal_x_dm} onPress={() => closeModal()}>
          <Feather name="x" size={24} color={theme == LightMode ? '#000' : '#fff'} />
        </Pressable>
      </View>
    </View>
  );
}