import React , {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View , Button, TextInput, Pressable, useColorScheme } from 'react-native';
import Checkbox from 'expo-checkbox';
import { app, db, getFirestore, collection, addDoc } from '../firebase/index';
import { Feather } from '@expo/vector-icons';
import { Styles, LightMode } from './styles/Styles';
import { ThemeContext } from './Contexts';
import DropdownMenu from './utils/DropdownMenu';

export default function AddHabit({getHabits, closeModal}) {
  const { theme } = useContext(ThemeContext)
  const [habitName, setHabitName] = useState('')
  const [frequencyType, setFrequencyType] = useState('')
  const [daysPerWeek, setDaysPerWeek] = useState([])
  const [timesPerWeek, setTimesPerWeek] = useState(0)
  const [goalType, setGoalType] = useState('')
  const [goalAmount, setGoalAmount] = useState(0)
  const [goalTime, setGoalTime] = useState(0)
  const [isActive, setIsActive] = useState(true)
  const [placeNumber, setPlaceNumber] = useState(0)

  const dateAsInteger = () => {
    let newDate = new Date()
    let newDateInteger = Date.parse(newDate)
    return newDateInteger
  }

  const addHabitBtn = async () => {
    try {
      const docRef = await addDoc(collection(db, "habits"), {
        name: habitName,
        frequency_type: frequencyType,
        days_per_week: daysPerWeek,
        times_per_week: timesPerWeek,
        goalType: goalType,
        goal_amount: goalAmount,
        goal_time: goalTime,
        is_active: isActive,
        placeNumber: placeNumber,
        dateAdded: dateAsInteger()
      })
      getHabits()
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{width: '100%'}}>
        <Text style={theme == LightMode ? Styles.page_title_add_habit_lm : Styles.page_title_add_habit_dm}>New Habit</Text>

        <Text style={theme == LightMode ? Styles.form_label_lm : Styles.form_label_dm}>Name</Text>
        <TextInput placeholder='Habit Name' placeholderTextColor='#999999' defaultValue={habitName} onChangeText={(text) => setHabitName(text)} style={theme == LightMode ? Styles.input_lm : Styles.input_dm}/>
  
        <View style={Styles.form_label_row}>
          <Text style={theme == LightMode ? Styles.form_label_lm : Styles.form_label_dm}>Frequency</Text>
        </View>

        <View style={Styles.form_label_row}>
          <DropdownMenu
            theme={theme}
            defaultValue={'Daily'}
            data={[
              {label: 'Daily', value: 'daily'},
              {label: 'Weekly', value: 'weekly'},
              {label: 'Monthly', value: 'monthly'},
            ]}
            //setSelectedMenuItem={setSelectedHabitType}
          />
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