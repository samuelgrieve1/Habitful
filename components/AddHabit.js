import React , {useEffect, useState} from 'react';
import { StyleSheet, Text, View , Button, TextInput, Pressable } from 'react-native';
import Checkbox from 'expo-checkbox';
import { app, db, getFirestore, collection, addDoc } from '../firebase/index';
import { Feather } from '@expo/vector-icons';
import { Styles } from './Styles';

export default function AddHabit({getHabits, closeModal}) {
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
      <Text style={Styles.page_title_add_habit}>Add Habit</Text>

      <Text style={Styles.input_label}>Name</Text>
      <TextInput onChangeText={(text) => setHabitName(text)} style={Styles.input}/>

      <View style={Styles.form_label_row}>
        <Text style={Styles.form_input_label_frequency}>Frequency</Text>
        <Pressable title='Select All' style={Styles.form_btn_select_all} onPress={() => selectAllDays()}>
          <Text style={Styles.form_txt_select_all}>Select All</Text>
        </Pressable>
      </View>

      <View style={Styles.checkbox_row}>
        <Checkbox style={Styles.checkbox} value={activeSun} onValueChange={setActiveSun} /><Text>Sunday</Text>
      </View>
      <View style={Styles.checkbox_row}>
        <Checkbox style={Styles.checkbox} value={activeMon} onValueChange={setActiveMon} /><Text>Monday</Text>
      </View>
      <View style={Styles.checkbox_row}>
        <Checkbox style={Styles.checkbox} value={activeTue} onValueChange={setActiveTue} /><Text>Tuesday</Text>
      </View>
      <View style={Styles.checkbox_row}>
        <Checkbox style={Styles.checkbox} value={activeWed} onValueChange={setActiveWed} /><Text>Wednesday</Text>
      </View>
      <View style={Styles.checkbox_row}>
        <Checkbox style={Styles.checkbox} value={activeThu} onValueChange={setActiveThu} /><Text>Thursday</Text>
      </View>
      <View style={Styles.checkbox_row}>
        <Checkbox style={Styles.checkbox} value={activeFri} onValueChange={setActiveFri} /><Text>Friday</Text>
      </View>
      <View style={Styles.checkbox_row}>
        <Checkbox style={Styles.checkbox} value={activeSat} onValueChange={setActiveSat} /><Text>Saturday</Text>
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