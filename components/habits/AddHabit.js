import React , {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View , Button, TextInput, Pressable, useColorScheme, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import { app, db, getFirestore, collection, addDoc } from '../../firebase/index';
import { Feather } from '@expo/vector-icons';
import { Styles, LightMode } from '../styles/Styles';
import { ThemeContext } from '../Contexts';
import DropdownMenu from '../DropdownMenu';
import { format } from 'date-fns';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import DaySelect from './DaySelect';
import ColorPicker from '../ColorSelector';
import ColorSelector from '../ColorSelector';

export default function AddHabit({getHabits, closeModal}) {
  const { theme } = useContext(ThemeContext)
  const [habitName, setHabitName] = useState('')
  const [frequencyType, setFrequencyType] = useState('daily')
  const [daysPerWeek, setDaysPerWeek] = useState([])
  const [timesPerWeek, setTimesPerWeek] = useState(0)
  const [timesPerMonth, setTimesPerMonth] = useState(0)
  const [goalType, setGoalType] = useState('times')
  const [goalTimes, setGoalTimes] = useState(0)
  const [goalTime, setGoalTime] = useState(0)
  const [isActive, setIsActive] = useState(true)
  const [placeNumber, setPlaceNumber] = useState(0)

  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

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
        goal_type: goalType,
        goal_times: goalTimes,
        goal_time: goalTime,
        is_active: isActive,
        place_number: placeNumber,
        date_added: dateAsInteger()
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

  const removeFromDaysPerWeek = (day) => {
    const newArray = daysPerWeek.filter(str => str !== day)
    setDaysPerWeek(newArray)
  }

  return (
    <>
    <View style={{flexDirection: 'row'}}>
      <View style={{width: '100%'}}>
        <Text style={theme == LightMode ? Styles.page_title_add_habit_lm : Styles.page_title_add_habit_dm}>New Habit</Text>

        <View style={{flex: 1, paddingBottom: 120}}>
        <ScrollView>
        <View style={Styles.form_row_label}>
          <Text style={theme == LightMode ? Styles.form_label_lm : Styles.form_label_dm}>Name</Text>
        </View>

        <View style={Styles.form_row}>
          <TextInput
            //placeholder='Habit Name'
            //placeholderTextColor='#999999'
            //defaultValue={habitName}
            onChangeText={(text) => setHabitName(text)}
            style={theme == LightMode ? Styles.input_lm : Styles.input_dm}
          />
        </View>
  
        <View style={Styles.form_row_label}>
          <Text style={theme == LightMode ? Styles.form_label_lm : Styles.form_label_dm}>Frequency</Text>
        </View>

        {/* Frequency Type */}
        <View style={Styles.form_row_label}>
          <DropdownMenu
            theme={theme}
            defaultValue={'Days per week'}
            data={[
              {label: 'Days per week', value: 'daily'},
              {label: 'Times per week', value: 'weekly'},
              {label: 'Times per month', value: 'monthly'},
            ]}
            setSelectedMenuItem={setFrequencyType}
          />
        </View>

        {/* Days per week */}
        {frequencyType == 'daily' &&
        <View style={Styles.form_row}>
          {daysOfWeek.map((day, i) => {
            return (
              <DaySelect
                key={i}
                dayOfWeek={day}
                addToDaysPerWeek={addToDaysPerWeek}
                removeFromDaysPerWeek={removeFromDaysPerWeek}
              />
            )
          })}
        </View>
        }

        {/* Times per week */}
        {frequencyType == 'weekly' &&
          <View style={Styles.form_row}>
            <View style={Styles.form_amount_box}>
              <View style={Styles.form_amount_minus}>
                <Pressable onPress={() => {setTimesPerWeek(timesPerWeek > 0 ? timesPerWeek - 1 : 0)}}>
                  <FontAwesome6 name="minus" size={18} color="#4185e7" />
                </Pressable>
              </View>
              <View style={Styles.form_amount_value}>
                <Text style={Styles.form_amount_value_txt}>
                  {timesPerWeek}
                </Text>
              </View>
              <View style={Styles.form_amount_plus}>
                <Pressable onPress={() => {setTimesPerWeek(timesPerWeek + 1)}}>
                  <FontAwesome6 name="plus" size={18} color="#4185e7" />
                </Pressable>
              </View>
            </View>
          </View>
        }

        {/* Times per month */}
        {frequencyType == 'monthly' &&
          <View style={Styles.form_row}>
            <View style={Styles.form_amount_box}>
              <View style={Styles.form_amount_minus}>
                <Pressable onPress={() => {setTimesPerMonth(timesPerMonth > 0 ? timesPerMonth - 1 : 0)}}>
                  <FontAwesome6 name="minus" size={18} color="#4185e7" />
                </Pressable>
              </View>
              <View style={Styles.form_amount_value}>
                <Text style={Styles.form_amount_value_txt}>
                  {timesPerMonth}
                </Text>
              </View>
              <View style={Styles.form_amount_plus}>
                <Pressable onPress={() => {setTimesPerMonth(timesPerMonth + 1)}}>
                  <FontAwesome6 name="plus" size={18} color="#4185e7" />
                </Pressable>
              </View>
            </View>
          </View>
        }

        {/* Daily Goal */}
        <View style={Styles.form_row_label}>
          <DropdownMenu
            theme={theme}
            defaultValue={'Times per day'}
            data={[
              {label: 'Times per day', value: 'times'},
              {label: 'Amount of time', value: 'time'},
            ]}
            setSelectedMenuItem={setGoalType}
          />
        </View>

        {/* Goal Number */}
        {goalType == 'times' &&
          <View style={Styles.form_row}>
            <View style={Styles.form_amount_box}>
              <View style={Styles.form_amount_minus}>
                <Pressable onPress={() => {setGoalTimes(goalTimes > 0 ? goalTimes - 1 : 0)}}>
                  <FontAwesome6 name="minus" size={18} color="#4185e7" />
                </Pressable>
              </View>
              <View style={Styles.form_amount_value}>
                <Text style={Styles.form_amount_value_txt}>
                  {goalTimes}
                </Text>
              </View>
              <View style={Styles.form_amount_plus}>
                <Pressable onPress={() => {setGoalTimes(goalTimes + 1)}}>
                  <FontAwesome6 name="plus" size={18} color="#4185e7" />
                </Pressable>
              </View>
            </View>
          </View>
        }

        {/* Goal Time */}
        {goalType == 'time' &&
          <View style={Styles.form_row}>
            <View style={Styles.form_amount_box}>
              <View style={Styles.form_amount_minus}>
                <Pressable onPress={() => {setGoalTime(goalTime > 0 ? goalTime - 1 : 0)}}>
                  <FontAwesome6 name="minus" size={18} color="#4185e7" />
                </Pressable>
              </View>
              <View style={Styles.form_amount_value}>
                <Text style={Styles.form_amount_value_txt}>
                  {goalTime} mins
                </Text>
              </View>
              <View style={Styles.form_amount_plus}>
                <Pressable onPress={() => {setGoalTime(goalTime + 1)}}>
                  <FontAwesome6 name="plus" size={18} color="#4185e7" />
                </Pressable>
              </View>
            </View>
          </View>
        }

        {/* Color & Icon */}
        <View style={Styles.form_row_label}>
          <Text style={theme == LightMode ? Styles.form_label_lm : Styles.form_label_dm}>Color & Icon</Text>
        </View>

        {/* Color Picker */}
        <View style={Styles.form_row_no_flex}>
          <ColorSelector />
        </View>

        {/* Icon Picker */}

        </ScrollView>
        </View>


      </View>
    </View>

    <Pressable title='Close' style={theme == LightMode ? Styles.close_modal_x_lm : Styles.close_modal_x_dm} onPress={() => closeModal()}>
      <Feather name="x" size={24} color={theme == LightMode ? '#000' : '#fff'} />
    </Pressable>

    <View style={Styles.btnsBottomFixed}>
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
    </View>
  </>
  );
}