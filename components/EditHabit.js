import React , {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View , Button, TextInput, Pressable, useColorScheme } from 'react-native';
import Checkbox from 'expo-checkbox';
import { app, db, getFirestore, collection, doc, setDoc, updateDoc, deleteDoc } from '../firebase/index';
import { Feather } from '@expo/vector-icons';
import { Styles, LightMode } from './styles/Styles';
import { ThemeContext } from './Contexts';

export default function EditHabit({getHabits, closeModal, selectedHabitId, habits, deleteHabit, archiveHabit}) {
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
    <View style={{flexDirection: 'row'}}>
      <View style={{width: '100%'}}>
        <Text style={theme == LightMode ? Styles.page_title_add_habit_lm : Styles.page_title_add_habit_dm}>Edit Habit</Text>

        {/* <Text style={theme == LightMode ? Styles.input_label_lm : Styles.input_label_dm}>Name</Text> */}
        <TextInput placeholder='Habit Name' defaultValue={habitName} onChangeText={(text) => setHabitName(text)} style={theme == LightMode ? Styles.input_lm : Styles.input_dm}/>

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

        {/* <View style={Styles.checkbox_row}>
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
        </View> */}
        
        <View style={Styles.btns_save_cancel}>
          <Pressable  style={Styles.btn_save} onPress={() => {saveHabitBtn(); closeModal()}}>
            <Text style={Styles.txt_save}>Update Habit</Text>
          </Pressable>
        </View>
        <View style={Styles.btns_save_cancel}>
          <Pressable title='Cancel' style={theme == LightMode ? Styles.btn_cancel_lm : Styles.btn_cancel_dm} onPress={() => closeModal()}>
            <Text style={theme == LightMode ? Styles.txt_cancel_lm : Styles.txt_cancel_dm}>Cancel</Text>
          </Pressable>
        </View>

        {/* <Text style={{color: '#4185e7', textAlign: 'center', marginTop: 10, fontSize: 14}}>More options <Feather name="chevron-down" size={14} color="#4185e7" /></Text> */}

        <View style={theme == LightMode ? Styles.btns_archive_delete_lm : Styles.btns_archive_delete_dm}>
          <View style={Styles.btns_archive_delete_left}>
          <Pressable  style={theme == LightMode ? Styles.btn_archive_lm : Styles.btn_archive_dm} onPress={() => {archiveHabit(); closeModal()}}>
            <Text style={Styles.txt_archive}>Archive Habit</Text>
          </Pressable>
          </View>
          <View style={Styles.btns_archive_delete_right}>
          <Pressable  style={theme == LightMode ? Styles.btn_delete_lm : Styles.btn_delete_dm} onPress={() => {deleteHabit(); closeModal()}}>
            <Text style={Styles.txt_delete}>Delete Habit</Text>
          </Pressable>
          </View>
        </View>

        <Pressable title='Close' style={theme == LightMode ? Styles.close_modal_x_lm : Styles.close_modal_x_dm} onPress={() => closeModal()}>
          <Feather name="x" size={24} color={theme == LightMode ? '#000' : '#fff'} />
        </Pressable>
        {/* <Pressable title='Save' style={Styles.close_modal_save} onPress={() => closeModal()}>
          <Text style={Styles.save_text}>Save</Text>
        </Pressable> */}
      </View>
    </View>
  );
}