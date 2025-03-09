import React , {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View , Button, TextInput, Pressable, useColorScheme } from 'react-native';
import Checkbox from 'expo-checkbox';
import { app, db, getFirestore, collection, doc, setDoc, updateDoc, deleteDoc } from '../../firebase/index';
import { Feather } from '@expo/vector-icons';
import { Styles, LightMode, DarkMode } from '../styles/Styles';
import { ThemeContext } from '../Contexts';

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
        <Text style={[Styles.pageTitleAddHabit, theme == DarkMode && Styles.pageTitleAddHabitDm]}>Edit Habit</Text>

        {/* <Text style={[Styles.inputLabel, theme == DarkMode && Style.inputLabelDm]}>Name</Text> */}
        <TextInput placeholder='Habit Name' defaultValue={habitName} onChangeText={(text) => setHabitName(text)} style={[Styles.input, theme == DarkMode && Styles.inputDm]}/>

        <View style={Styles.formLabelRow}>
          <Text style={[Styles.formLabel, theme == DarkMode && Styles.formLabelDm]}>Frequency</Text>
          <Pressable title='Select All' onPress={() => selectAllDays()}>
            <Text style={Styles.form_txt_select_all}>Select All</Text>
          </Pressable>
        </View>
        
        <View style={Styles.btnsSaveCancel}>
          <Pressable  style={Styles.btnSave} onPress={() => {saveHabitBtn(); closeModal()}}>
            <Text style={Styles.txtSave}>Update Habit</Text>
          </Pressable>
        </View>
        <View style={Styles.btnsSaveCancel}>
          <Pressable title='Cancel' style={[Styles.btnCancel, theme == DarkMode && Styles.btnCancelDm]} onPress={() => closeModal()}>
            <Text style={[Styles.txtCancel, theme == DarkMode && Styles.txtCancelDm]}>Cancel</Text>
          </Pressable>
        </View>

        {/* <Text style={{color: '#4185e7', textAlign: 'center', marginTop: 10, fontSize: 14}}>More options <Feather name="chevron-down" size={14} color="#4185e7" /></Text> */}

        <View style={[Styles.btnsArchiveDelete, theme == DarkMode && Styles.btnsArchiveDeleteDm]}>
          <View style={Styles.btnsArchiveDeleteLeft}>
          <Pressable  style={Styles.btnArchive} onPress={() => {archiveHabit(); closeModal()}}>
            <Text style={Styles.txtArchive}>Archive Habit</Text>
          </Pressable>
          </View>
          <View style={Styles.btnsArchiveDeleteRight}>
          <Pressable  style={Styles.btnDelete} onPress={() => {deleteHabit(); closeModal()}}>
            <Text style={Styles.txtDelete}>Delete Habit</Text>
          </Pressable>
          </View>
        </View>

        <Pressable title='Close' style={[Styles.closeModalX, theme == DarkMode && Styles.closeModalXDm]} onPress={() => closeModal()}>
          <Feather name="x" size={24} style={theme == DarkMode ? Styles.whiteTxt : Styles.blackTxt} />
        </Pressable>
        {/* <Pressable title='Save' style={Styles.closeModalSave} onPress={() => closeModal()}>
          <Text style={Styles.saveText}>Save</Text>
        </Pressable> */}
      </View>
    </View>
  );
}