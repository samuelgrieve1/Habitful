import React , {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View , Button, TextInput, Pressable, useColorScheme, ScrollView, SafeAreaView } from 'react-native';
import Checkbox from 'expo-checkbox';
import { app, db, getFirestore, collection, addDoc } from '../../firebase/index';
import { Feather } from '@expo/vector-icons';
import { Styles, LightMode, DarkMode } from '../styles/Styles';
import { ThemeContext } from '../Contexts';
import DropdownMenu from '../DropdownMenu';
import { format } from 'date-fns';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import DaySelect from './DaySelect';
import ColorPicker from '../ColorPicker';
import IconPicker from '../IconPicker';
import Modal from 'react-native-modal';
import { SlideInUp } from 'react-native-reanimated';

export default function AddHabit({getHabits, closeModal}) {
  const { theme } = useContext(ThemeContext)
  const [habitName, setHabitName] = useState('')
  const [frequencyType, setFrequencyType] = useState('daily')
  const [daysPerWeek, setDaysPerWeek] = useState(['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'])
  const [timesPerWeek, setTimesPerWeek] = useState(0)
  const [timesPerMonth, setTimesPerMonth] = useState(0)
  const [goalType, setGoalType] = useState('times')
  const [goalTimes, setGoalTimes] = useState(0)
  const [goalTime, setGoalTime] = useState(0)
  const [isActive, setIsActive] = useState(true)
  const [placeNumber, setPlaceNumber] = useState(0)
  const [modalVisibleColorPicker, setModalVisibleColorPicker] = useState(false)
  const [habitColor, setHabitColor] = useState('')
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
  const [modalVisibleIconPicker, setModalVisibleIconPicker] = useState(false)
  const [habitIcon, setHabitIcon] = useState('')
  const [selectedIcon, setSelectedIcon] = useState('percent')
  const [availableIcons, setAvailableIcons] = useState([
    'percentage',
    'dice-three',
    'calendar-days',
    'volleyball',
    'atom',
    'soap',
    'fingerprint',
    'hand-point-right',
    'smile-beam',
    'flag-checkered',
    'football',
    'beer-mug-empty',
  ])

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
    <View style={[Styles.formHeaderFixed, theme == DarkMode && Styles.formHeaderFixedDm]}>
      <View style={[Styles.closeModalX, theme == DarkMode && Styles.closeModalXDm]}>
        <Pressable title='Close' onPress={() => closeModal()}>
          <Feather name="x" size={24} style={theme == DarkMode ? Styles.whiteTxt : Styles.blackTxt} />
        </Pressable>
      </View>
      <View style={Styles.formHeaderFixedTitle}>
        <Text style={[Styles.formTitle, theme == DarkMode && Styles.formTitleDm]}>New Habit</Text>
      </View>
    </View>
    <ScrollView>
    <View style={{flexDirection: 'row'}}>
      <View style={{width: '100%'}}>
        {/* <View style={Styles.formRow}>
          <Text style={[Styles.formTitle, theme == DarkMode && Styles.formTitleDm]}>New Habit</Text>
        </View> */}
        <View style={{flex: 1, paddingTop: 50, paddingBottom: 160}}>
          {/* <ScrollView> */}
            {/* <View style={Styles.formRowLabel}>
              <Text style={[Styles.formLabel, theme == DarkMode && Styles.formLabelDm]}>Name</Text>
            </View> */}

            <View style={Styles.formRow}>
              <TextInput
                placeholder='Habit Name'
                placeholderTextColor={theme == DarkMode ? '#444' : '#ccc'}
                defaultValue={habitName}
                onChangeText={(text) => setHabitName(text)}
                style={[Styles.input, theme == DarkMode && Styles.inputDm]}
              />
            </View>
      
            <View style={Styles.formRowLabel}>
              <Text style={[Styles.formLabel, theme == DarkMode && Styles.formLabelDm]}>Frequency</Text>
            </View>

            {/* Frequency Type */}
            <View style={Styles.formRowLabel}>
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
            <View style={Styles.formLabelRowNoFlex}>
              <View style={Styles.daySelectBox}>
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
            </View>
            }

            {/* Times per week */}
            {frequencyType == 'weekly' &&
              <View style={Styles.formRow}>
                <View style={Styles.formAmountBox}>
                  <View style={Styles.formAmountMinus}>
                    <Pressable onPress={() => {setTimesPerWeek(timesPerWeek > 0 ? timesPerWeek - 1 : 0)}}>
                      <FontAwesome6 name="minus" size={18} color="#4185e7" />
                    </Pressable>
                  </View>
                  <View style={Styles.formAmountValue}>
                    <Text style={Styles.formAmountValueTxt}>
                      {timesPerWeek}
                    </Text>
                  </View>
                  <View style={Styles.formAmountPlus}>
                    <Pressable onPress={() => {setTimesPerWeek(timesPerWeek + 1)}}>
                      <FontAwesome6 name="plus" size={18} color="#4185e7" />
                    </Pressable>
                  </View>
                </View>
              </View>
            }

            {/* Times per month */}
            {frequencyType == 'monthly' &&
              <View style={Styles.formRow}>
                <View style={Styles.formAmountBox}>
                  <View style={Styles.formAmountMinus}>
                    <Pressable onPress={() => {setTimesPerMonth(timesPerMonth > 0 ? timesPerMonth - 1 : 0)}}>
                      <FontAwesome6 name="minus" size={18} color="#4185e7" />
                    </Pressable>
                  </View>
                  <View style={Styles.formAmountValue}>
                    <Text style={Styles.formAmountValueTxt}>
                      {timesPerMonth}
                    </Text>
                  </View>
                  <View style={Styles.formAmountPlus}>
                    <Pressable onPress={() => {setTimesPerMonth(timesPerMonth + 1)}}>
                      <FontAwesome6 name="plus" size={18} color="#4185e7" />
                    </Pressable>
                  </View>
                </View>
              </View>
            }

            {/* Daily Goal */}
            <View style={Styles.formRowLabel}>
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
              <View style={Styles.formRow}>
                <View style={Styles.formAmountBox}>
                  <View style={Styles.formAmountMinus}>
                    <Pressable onPress={() => {setGoalTimes(goalTimes > 0 ? goalTimes - 1 : 0)}}>
                      <FontAwesome6 name="minus" size={18} color="#4185e7" />
                    </Pressable>
                  </View>
                  <View style={Styles.formAmountValue}>
                    <Text style={Styles.formAmountValueTxt}>
                      {goalTimes}
                    </Text>
                  </View>
                  <View style={Styles.formAmountPlus}>
                    <Pressable onPress={() => {setGoalTimes(goalTimes + 1)}}>
                      <FontAwesome6 name="plus" size={18} color="#4185e7" />
                    </Pressable>
                  </View>
                </View>
              </View>
            }

            {/* Goal Time */}
            {goalType == 'time' &&
              <View style={Styles.formRow}>
                <View style={Styles.formAmountBox}>
                  <View style={Styles.formAmountMinus}>
                    <Pressable onPress={() => {setGoalTime(goalTime > 0 ? goalTime - 1 : 0)}}>
                      <FontAwesome6 name="minus" size={18} color="#4185e7" />
                    </Pressable>
                  </View>
                  <View style={Styles.formAmountValue}>
                    <Text style={Styles.formAmountValueTxt}>
                      {goalTime} mins
                    </Text>
                  </View>
                  <View style={Styles.formAmountPlus}>
                    <Pressable onPress={() => {setGoalTime(goalTime + 1)}}>
                      <FontAwesome6 name="plus" size={18} color="#4185e7" />
                    </Pressable>
                  </View>
                </View>
              </View>
            }

            {/* Styling */}
            <View style={Styles.formRowLabel}>
              <Text style={[Styles.formLabel, theme == DarkMode && Styles.formLabelDm]}>Color & Icon</Text>
            </View>
            {/* Styling */}
            <View style={Styles.formRowLabel}>
              <Text style={[Styles.formLabel, theme == DarkMode && Styles.formLabelDm]}>Color & Icon</Text>
            </View>
            {/* Styling */}
            <View style={Styles.formRowLabel}>
              <Text style={[Styles.formLabel, theme == DarkMode && Styles.formLabelDm]}>Color & Icon</Text>
            </View>
            {/* Styling */}
            <View style={Styles.formRowLabel}>
              <Text style={[Styles.formLabel, theme == DarkMode && Styles.formLabelDm]}>Color & Icon</Text>
            </View>
            {/* Styling */}
            <View style={Styles.formRowLabel}>
              <Text style={[Styles.formLabel, theme == DarkMode && Styles.formLabelDm]}>Color & Icon</Text>
            </View>
            {/* Styling */}
            <View style={Styles.formRowLabel}>
              <Text style={[Styles.formLabel, theme == DarkMode && Styles.formLabelDm]}>Color & Icon</Text>
            </View>

            <View style={Styles.stylingBox}>
              {/* Color Picker Btn */}
              <Pressable style={[Styles.btnColorIconPicker, {marginRight: 5, backgroundColor: selectedColor}]} onPress={() => setModalVisibleColorPicker(true)}>
                <Text style={[Styles.txtColorIconPicker, {color: '#ffffff'}]}>Color</Text>
              </Pressable>
             
              {/* Icon Picker Btn */}
              <Pressable style={[Styles.btnColorIconPicker, {marginLeft: 5, borderWidth: 1, borderColor: selectedColor}]} onPress={() => setModalVisibleIconPicker(true)}>
                <FontAwesome6 name={selectedIcon} size={40} color={selectedColor} />
                {/* <Text style={[Styles.txtColorIconPicker, {color: selectedColor}]}>{selectedIcon}</Text> */}
              </Pressable>
            </View>

            {/* Color Picker Modal */}
            <Modal
              style={Styles.modal}
              isVisible={modalVisibleColorPicker}
              propagateSwipe={true}
              onBackdropPress={() => setModalVisibleColorPicker(false)}
              animationIn={'zoomIn'}
              animationOut={'zoomOut'}
              backdropOpacity={0.8}
            >
              <View
                style={[
                  Styles.modalColorIconPicker,
                  theme == DarkMode && Styles.modalColorIconPickerDm
                ]}>
                {/* <View style={Styles.stylingModalTitleBox}>
                  <Text style={[Styles.stylingModalTitleTxt, theme == DarkMode ? Styles.whiteTxt : Styles.blackTxt]}>Color</Text>
                </View> */}
                <View style={Styles.colorPickerBox}>
                  {availableColors.map((color, i) => {
                    return (
                      <ColorPicker
                        key={i}
                        color={color}
                        setHabitColor={setHabitColor}
                        setSelectedColor={setSelectedColor}
                        selectedColor={selectedColor}
                        setModalVisibleColorPicker={setModalVisibleColorPicker}
                      />
                    )
                  })}
                </View>
                {/* <View style={[Styles.btnColorIconPickerDone, {backgroundColor: selectedColor}]}>
                  <Pressable title='Done' onPress={() => setModalVisibleColorPicker(false)}>
                    <Text style={Styles.txtColorIconPickerDone}>
                      Done
                    </Text>
                  </Pressable>
                </View> */}
                {/* <View style={[Styles.closeModalX, theme == DarkMode && Styles.closeModalXDm]}>
                  <Pressable title='Close' onPress={() => setModalVisibleColorPicker(false)}>
                    <Feather name="x" size={24} style={theme == DarkMode ? Styles.whiteTxt : Styles.blackTxt} />
                  </Pressable>
                </View> */}
              </View>
            </Modal>

            {/* Icon Picker Modal */}
            <Modal
              style={Styles.modal}
              isVisible={modalVisibleIconPicker}
              propagateSwipe={true}
              onBackdropPress={() => setModalVisibleIconPicker(false)}
              animationIn={'zoomIn'}
              animationOut={'zoomOut'}
              backdropOpacity={0.8}
            >
              <View
                style={[
                  Styles.modalColorIconPicker,
                  theme == DarkMode && Styles.modalColorIconPickerDm
                ]}>
                {/* <View style={Styles.stylingModalTitleBox}>
                  <Text style={[Styles.stylingModalTitleTxt, theme == DarkMode ? Styles.whiteTxt : Styles.blackTxt]}>Icon</Text>
                </View> */}
                <View style={Styles.iconPickerBox}>
                  {availableIcons.map((icon, i) => {
                    return (
                      <IconPicker
                        key={i}
                        icon={icon}
                        setHabitIcon={setHabitIcon}
                        setSelectedIcon={setSelectedIcon}
                        selectedIcon={selectedIcon}
                        selectedColor={selectedColor}
                        setModalVisibleIconPicker={setModalVisibleIconPicker}
                      />
                    )
                  })}
                </View>
                {/* <View style={[Styles.btnColorIconPickerDone, {backgroundColor: selectedColor}]}>
                  <Pressable title='Done' onPress={() => setModalVisibleIconPicker(false)}>
                    <Text style={Styles.txtColorIconPickerDone}>
                      Done
                    </Text>
                  </Pressable>
                </View> */}
                {/* <View style={[Styles.closeModalX, theme == DarkMode && Styles.closeModalXDm]}>
                  <Pressable title='Close' onPress={() => setModalVisibleIconPicker(false)}>
                    <Feather name="x" size={24} style={theme == DarkMode ? Styles.whiteTxt : Styles.blackTxt} />
                  </Pressable>
                </View> */}
              </View>
            </Modal>
          {/* </ScrollView> */}
        </View>
      </View>
    </View>
    </ScrollView>

    <View style={[Styles.btnsBottomFixed, theme == DarkMode ? Styles.blackBg : Styles.whiteBg]}>
      <View style={Styles.btnsSaveCancel}>
        <Pressable  style={Styles.btnSave} onPress={() => {addHabitBtn(); closeModal()}}>
          <Text style={Styles.txtSave}>Add Habit</Text>
        </Pressable>
      </View>
      <View style={Styles.btnsSaveCancel}>
        <Pressable title='Cancel' style={[Styles.btnCancel, theme == DarkMode && Styles.btnCancelDm]} onPress={() => closeModal()}>
          <Text style={[Styles.txtCancel, theme == DarkMode && Styles.txtCancelDm]}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  </>
  );
}