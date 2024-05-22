import React , {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View , Button, TextInput, Pressable, useColorScheme } from 'react-native';
import Checkbox from 'expo-checkbox';
import { app, db, getFirestore, collection, addDoc } from '../firebase/index';
import { Feather } from '@expo/vector-icons';
import { Styles, LightMode } from './styles/Styles';
import { ThemeContext } from './Contexts';

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
  const [selectAllToggle, setSelectAllToggle] = useState(true)

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
        completed: []
      })
      console.log("Document written with ID: ", docRef.id)
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
    <View>
      <Text style={theme == LightMode ? Styles.page_title_add_habit_lm : Styles.page_title_add_habit_dm}>Add Habit</Text>

      <Text style={Styles.input_label}>Name</Text>
      <TextInput onChangeText={(text) => setHabitName(text)} style={Styles.input}/>

      <View style={Styles.form_label_row}>
        <Text style={Styles.form_input_label_frequency}>Frequency</Text>
        <Pressable title='Select All' style={Styles.form_btn_select_all} onPress={() => selectAllDays()}>
          <Text style={Styles.form_txt_select_all}>Select All</Text>
        </Pressable>
      </View>

      <View style={Styles.checkbox_row}>
        <Checkbox style={theme == LightMode ? Styles.checkbox_lm : Styles.checkbox_dm} value={activeSun} onValueChange={setActiveSun} /><Text>Sunday</Text>
      </View>
      <View style={Styles.checkbox_row}>
        <Checkbox style={theme == LightMode ? Styles.checkbox_lm : Styles.checkbox_dm} value={activeMon} onValueChange={setActiveMon} /><Text>Monday</Text>
      </View>
      <View style={Styles.checkbox_row}>
        <Checkbox style={theme == LightMode ? Styles.checkbox_lm : Styles.checkbox_dm} value={activeTue} onValueChange={setActiveTue} /><Text>Tuesday</Text>
      </View>
      <View style={Styles.checkbox_row}>
        <Checkbox style={theme == LightMode ? Styles.checkbox_lm : Styles.checkbox_dm} value={activeWed} onValueChange={setActiveWed} /><Text>Wednesday</Text>
      </View>
      <View style={Styles.checkbox_row}>
        <Checkbox style={theme == LightMode ? Styles.checkbox_lm : Styles.checkbox_dm} value={activeThu} onValueChange={setActiveThu} /><Text>Thursday</Text>
      </View>
      <View style={Styles.checkbox_row}>
        <Checkbox style={theme == LightMode ? Styles.checkbox_lm : Styles.checkbox_dm} value={activeFri} onValueChange={setActiveFri} /><Text>Friday</Text>
      </View>
      <View style={Styles.checkbox_row}>
        <Checkbox style={theme == LightMode ? Styles.checkbox_lm : Styles.checkbox_dm} value={activeSat} onValueChange={setActiveSat} /><Text>Saturday</Text>
      </View>
      <View style={Styles.btns_save_cancel}>
        <Pressable  style={Styles.btn_save} onPress={() => {addHabitBtn(); closeModal()}}>
          <Text style={Styles.txt_save}>Save</Text>
        </Pressable>
        <Pressable title='Cancel' style={Styles.btn_cancel} onPress={() => closeModal()}>
          <Text style={Styles.txt_cancel}>Cancel</Text>
        </Pressable>
      </View>
      <Pressable title='Close' style={Styles.close_modal_x} onPress={() => closeModal()}>
        <Feather name="x" size={24} color="black" />
      </Pressable>
    </View>
  );
}