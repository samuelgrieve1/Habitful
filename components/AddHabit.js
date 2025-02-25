import React , {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View , Button, TextInput, Pressable, useColorScheme } from 'react-native';
import Checkbox from 'expo-checkbox';
import { app, db, getFirestore, collection, addDoc } from '../firebase/index';
import { Feather } from '@expo/vector-icons';
import { Styles, LightMode } from './styles/Styles';
import { ThemeContext } from './Contexts';
import DropdownMenu from './utils/DropdownMenu';
import { format } from 'date-fns';

export default function AddHabit({getHabits, closeModal}) {
  const { theme } = useContext(ThemeContext)
  const [habitName, setHabitName] = useState('')
  const [frequencyType, setFrequencyType] = useState('')
  const [daysPerWeek, setDaysPerWeek] = useState([])
  const [timesPerWeek, setTimesPerWeek] = useState(0)
  const [timesPerMonth, setTimesPerMonth] = useState(0)
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
        times_per_month: timesPerMonth,
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

  const addToDaysPerWeek = (day) => {
    setDaysPerWeek([
      ...daysPerWeek,
      day
    ])
  }

  console.log(frequencyType)
  console.log(daysPerWeek)

  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{width: '100%'}}>
        <Text style={theme == LightMode ? Styles.page_title_add_habit_lm : Styles.page_title_add_habit_dm}>New Habit</Text>

        <View style={Styles.form_row_vert}>
          <Text style={theme == LightMode ? Styles.form_label_lm : Styles.form_label_dm}>Name</Text>
          <TextInput
            //placeholder='Habit Name'
            //placeholderTextColor='#999999'
            //defaultValue={habitName}
            onChangeText={(text) => setHabitName(text)}
            style={theme == LightMode ? Styles.input_lm : Styles.input_dm}
          />
        </View>
  
        <View style={Styles.form_label_row}>
          <Text style={theme == LightMode ? Styles.form_label_lm : Styles.form_label_dm}>Frequency</Text>
        </View>

        {/* Frequency Type */}
        <View style={Styles.form_label_row}>
          <DropdownMenu
            theme={theme}
            defaultValue={'Daily'}
            data={[
              {label: 'Daily', value: 'daily'},
              {label: 'Weekly', value: 'weekly'},
              {label: 'Monthly', value: 'monthly'},
            ]}
            setSelectedMenuItem={setFrequencyType}
          />
        </View>

        {/* Days per week */}
        <View style={Styles.form_row}>
          <Pressable onPress={() => {addToDaysPerWeek('sunday')}}>
            <View style={Styles.round_day_box}>
              <Text style={Styles.round_day_text}>Sun</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => {addToDaysPerWeek('monday')}}>
            <View style={Styles.round_day_box}>
              <Text style={Styles.round_day_text}>Mon</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => {addToDaysPerWeek('tuesday')}}>
            <View style={Styles.round_day_box}>
              <Text style={Styles.round_day_text}>Tue</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => {addToDaysPerWeek('wednesday')}}>
            <View style={Styles.round_day_box}>
              <Text style={Styles.round_day_text}>Wed</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => {addToDaysPerWeek('thursday')}}>
            <View style={Styles.round_day_box}>
              <Text style={Styles.round_day_text}>Thu</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => {addToDaysPerWeek('friday')}}>
            <View style={Styles.round_day_box}>
              <Text style={Styles.round_day_text}>Fri</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => {addToDaysPerWeek('saturday')}}>
            <View style={Styles.round_day_box}>
              <Text style={Styles.round_day_text}>Sat</Text>
            </View>
          </Pressable>
        </View>

        {/* Times per week */}

        {/* Times per month */}


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