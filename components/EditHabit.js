import React , {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View , Button, TextInput, Pressable, useColorScheme } from 'react-native';
import Checkbox from 'expo-checkbox';
import { app, db, getFirestore, collection, doc, setDoc, updateDoc, deleteDoc } from '../firebase/index';
import { Feather } from '@expo/vector-icons';
import { Styles, LightMode } from './styles/Styles';
import { ThemeContext } from './Contexts';

export default function EditHabit({getHabits, closeModal, selectedHabitId, habits, deleteHabit}) {
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
  const [selectedHabit, setSelectedHabit] = useState(habits != null ? habits.find(habit => habit.id === selectedHabitId) : null)

  const dateAsInteger = () => {
    let newDate = new Date()
    let newDateInteger = Date.parse(newDate)
    return newDateInteger
  }

  const saveHabitBtn = async () => {
    const docRef = doc(db, "habits", selectedHabitId)
    try {
      await updateDoc(docRef, {
        name: habitName,
        sun: activeSun,
        mon: activeMon,
        tue: activeTue,
        wed: activeWed,
        thu: activeThu,
        fri: activeFri,
        sat: activeSat,
        completed: [],
        date_added: dateAsInteger()
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

  useEffect(() => {
    setHabitName(selectedHabit.name)
    setActiveSun(selectedHabit.sun)
    setActiveMon(selectedHabit.mon)
    setActiveTue(selectedHabit.tue)
    setActiveWed(selectedHabit.wed)
    setActiveThu(selectedHabit.thu)
    setActiveFri(selectedHabit.fri)
    setActiveSat(selectedHabit.sat)
  }, [])

  return (
    <View>
      <Text style={theme == LightMode ? Styles.page_title_add_habit_lm : Styles.page_title_add_habit_dm}>Edit Habit</Text>

      <Text style={theme == LightMode ? Styles.input_label_lm : Styles.input_label_dm}>Name</Text>
      <TextInput defaultValue={habitName} onChangeText={(text) => setHabitName(text)} style={theme == LightMode ? Styles.input_lm : Styles.input_dm}/>

      <View style={Styles.form_label_row}>
        <Text style={theme == LightMode ? Styles.form_input_label_frequency_lm : Styles.form_input_label_frequency_dm}>Frequency</Text>
        <Pressable title='Select All' onPress={() => selectAllDays()}>
          <Text style={Styles.form_txt_select_all}>Select All</Text>
        </Pressable>
      </View>

      <View style={Styles.checkbox_row}>
        <Checkbox color={activeSun ? '#4185e7' : undefined} style={theme == LightMode ? Styles.checkbox_lm : Styles.checkbox_dm} value={activeSun} onValueChange={setActiveSun} /><Text style={theme == LightMode ? Styles.form_label_lm : Styles.form_label_dm}>Sunday</Text>
      </View>
      <View style={Styles.checkbox_row}>
        <Checkbox color={activeMon ? '#4185e7' : undefined} style={theme == LightMode ? Styles.checkbox_lm : Styles.checkbox_dm} value={activeMon} onValueChange={setActiveMon} /><Text style={theme == LightMode ? Styles.form_label_lm : Styles.form_label_dm}>Monday</Text>
      </View>
      <View style={Styles.checkbox_row}>
        <Checkbox color={activeTue ? '#4185e7' : undefined} style={theme == LightMode ? Styles.checkbox_lm : Styles.checkbox_dm} value={activeTue} onValueChange={setActiveTue} /><Text style={theme == LightMode ? Styles.form_label_lm : Styles.form_label_dm}>Tuesday</Text>
      </View>
      <View style={Styles.checkbox_row}>
        <Checkbox color={activeWed ? '#4185e7' : undefined} style={theme == LightMode ? Styles.checkbox_lm : Styles.checkbox_dm} value={activeWed} onValueChange={setActiveWed} /><Text style={theme == LightMode ? Styles.form_label_lm : Styles.form_label_dm}>Wednesday</Text>
      </View>
      <View style={Styles.checkbox_row}>
        <Checkbox color={activeThu ? '#4185e7' : undefined} style={theme == LightMode ? Styles.checkbox_lm : Styles.checkbox_dm} value={activeThu} onValueChange={setActiveThu} /><Text style={theme == LightMode ? Styles.form_label_lm : Styles.form_label_dm}>Thursday</Text>
      </View>
      <View style={Styles.checkbox_row}>
        <Checkbox color={activeFri ? '#4185e7' : undefined} style={theme == LightMode ? Styles.checkbox_lm : Styles.checkbox_dm} value={activeFri} onValueChange={setActiveFri} /><Text style={theme == LightMode ? Styles.form_label_lm : Styles.form_label_dm}>Friday</Text>
      </View>
      <View style={Styles.checkbox_row}>
        <Checkbox color={activeSat ? '#4185e7' : undefined} style={theme == LightMode ? Styles.checkbox_lm : Styles.checkbox_dm} value={activeSat} onValueChange={setActiveSat} /><Text style={theme == LightMode ? Styles.form_label_lm : Styles.form_label_dm}>Saturday</Text>
      </View>
      <View style={Styles.btns_save_cancel}>
        <Pressable  style={Styles.btn_save} onPress={() => {saveHabitBtn(); closeModal()}}>
          <Text style={Styles.txt_save}>Update Habit</Text>
        </Pressable>
      </View>
      <View style={Styles.btns_save_cancel}>
        <Pressable title='Cancel' style={Styles.btn_cancel} onPress={() => closeModal()}>
          <Text style={theme == LightMode ? Styles.txt_cancel_lm : Styles.txt_cancel_dm}>Cancel</Text>
        </Pressable>
      </View>
      <View style={Styles.btns_save_cancel}>
        <Pressable  style={Styles.btn_delete} onPress={() => {deleteHabit(); closeModal()}}>
          <Text style={Styles.txt_delete}><Feather name="trash-2" size={16} color={Styles.red} /> Delete Habit</Text>
        </Pressable>
      </View>
      <Pressable title='Close' style={Styles.close_modal_x} onPress={() => closeModal()}>
        <Feather name="x" size={24} color={theme == LightMode ? 'black' : 'white'} />
      </Pressable>
    </View>
  );
}