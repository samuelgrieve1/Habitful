import React , {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View , Button, TextInput, Pressable, useColorScheme, ScrollView, SafeAreaView } from 'react-native';
import Checkbox from 'expo-checkbox';
import { app, db, getFirestore, collection, addDoc } from '../../firebase/index';
import { Feather } from '@expo/vector-icons';
import { Styles, LightMode, DarkMode } from '../styles/Styles';
import { ThemeContext, CustomColorContext } from '../Contexts';
import DropdownMenu from '../DropdownMenu';
import { format } from 'date-fns';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import DaySelect from './DaySelect';
import ColorPicker from '../ColorPicker';
import IconPicker from '../IconPicker';
import Modal from 'react-native-modal';
import { SlideInUp } from 'react-native-reanimated';
import { Colors } from '../Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import TimePicker from '../TimePicker';

export default function AddHabit({getHabits, closeModal}) {
  const insets = useSafeAreaInsets();
  const { theme } = useContext(ThemeContext)
  const { customColor } = useContext(CustomColorContext)
  const [habitName, setHabitName] = useState('')
  const [frequencyType, setFrequencyType] = useState('daily')
  const [daysPerWeek, setDaysPerWeek] = useState(['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'])
  const [timesPerDayWeekMonth, setTimesPerDayWeekMonth] = useState(1)
  const [isTimed, setIsTimed] = useState(false)
  const [amountOfTime, setAmountOfTime] = useState([])
  const [isActive, setIsActive] = useState(true)
  const [placeNumber, setPlaceNumber] = useState(0)
  const [modalVisibleColorPicker, setModalVisibleColorPicker] = useState(false)
  const [habitColor, setHabitColor] = useState('')
  const [selectedColor, setSelectedColor] = useState(customColor)
  const [availableColors, setAvailableColors] = useState(Colors)
  const [modalVisibleIconPicker, setModalVisibleIconPicker] = useState(false)
  const [modalVisibleTimePicker, setModalVisibleTimePicker] = useState(false)
  const [habitIcon, setHabitIcon] = useState('')
  const [selectedIcon, setSelectedIcon] = useState('percentage')
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

  const timerOffIcon = <MaterialCommunityIcons
    key={'timeroff'}
    name="timer-off-outline"
    size={18}
    color={theme == DarkMode ? Styles.white : Styles.black} style={{marginRight: 10}}
  />

  const timerOnIcon = <MaterialCommunityIcons
    key={'timeron'}
    name="timer-outline"
    size={18}
    color={theme == DarkMode ? Styles.white : Styles.black} style={{marginRight: 10}}
  />

  useEffect (() => {
    console.log(amountOfTime)
  }, [amountOfTime])

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
        <View style={{flex: 1, paddingTop: 40, paddingBottom: (150 + insets.bottom)}}>
            <View style={Styles.formRowLabel}>
              <Text style={[Styles.formLabel, theme == DarkMode && Styles.formLabelDm]}>Name</Text>
            </View>

            <View style={Styles.formRow}>
              <TextInput
                // placeholder='Habit Name'
                // placeholderTextColor={theme == DarkMode ? '#444' : '#ccc'}
                defaultValue={habitName}
                onChangeText={(text) => setHabitName(text)}
                style={[Styles.input, theme == DarkMode && Styles.inputDm]}
              />
            </View>
      
            <View style={Styles.formRowLabel}>
              <Text style={[Styles.formLabel, theme == DarkMode && Styles.formLabelDm]}>Frequency</Text>
            </View>

            {/* Frequency Type */}
            <View style={Styles.formDropdownMenu}>
              <DropdownMenu
                theme={theme}
                selectedColor={selectedColor}
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
                      selectedColor={selectedColor}
                    />
                  )
                })}
              </View>
            </View>
            }

            {/* Daily Goal */}
            {/* {frequencyType == 'daily' &&
            <View style={Styles.formDropdownMenu}>
              <DropdownMenu
                theme={theme}
                selectedColor={selectedColor}
                defaultValue={'times'}
                data={[
                  {label: 'Amount', value: 'times'},
                  {label: 'Timed', value: 'time'},
                ]}
                setSelectedMenuItem={setGoalType}
              />
            </View>
            } */}

            {/* Times per day/week/month */}
            <View style={Styles.formRow}>
              <View style={Styles.formAmountBox}>
                <View style={[Styles.formAmountMinus, theme == DarkMode && Styles.formAmountMinusDm]}>
                  <Pressable onPress={() => {setTimesPerDayWeekMonth(timesPerDayWeekMonth > 1 ? timesPerDayWeekMonth - 1 : 1)}}>
                    <FontAwesome6 name="minus" size={18} style={{color: selectedColor}} />
                  </Pressable>
                </View>
                <View style={[Styles.formAmountValue, theme == DarkMode && Styles.formAmountValueDm]}>
                  <Text style={[Styles.formAmountValueTxt, theme == DarkMode && Styles.formAmountValueTxtDm]}>
                    {timesPerDayWeekMonth}
                    {' '}
                    {frequencyType == 'daily' && timesPerDayWeekMonth == 1 && 'time per day'}
                    {frequencyType == 'daily' && timesPerDayWeekMonth > 1 && 'times per day'}
                    {frequencyType == 'weekly' && timesPerDayWeekMonth == 1 && 'time per week'}
                    {frequencyType == 'weekly' && timesPerDayWeekMonth > 1 && 'times per week'}
                    {frequencyType == 'monthy' && timesPerDayWeekMonth == 1 && 'time per month'}
                    {frequencyType == 'monthy' && timesPerDayWeekMonth > 1 && 'times per month'}
                  </Text>
                </View>
                <View style={[Styles.formAmountPlus, theme == DarkMode && Styles.formAmountPlusDm]}>
                  <Pressable onPress={() => {setTimesPerDayWeekMonth(timesPerDayWeekMonth + 1)}}>
                    <FontAwesome6 name="plus" size={18} style={{color: selectedColor}} />
                  </Pressable>
                </View>
              </View>
            </View>

            {/* Timed? */}
            <View style={[
              Styles.formDropdownMenu,
              isTimed == false && {marginBottom: 30}
            ]}>
              <DropdownMenu
                theme={theme}
                selectedColor={selectedColor}
                defaultValue={'Not timed'}
                data={[
                  {label: 'Not timed', value: false},
                  {label: 'Timed', value: true},
                ]}
                setSelectedMenuItem={setIsTimed}
                menuIcon={[
                  isTimed == false &&
                  timerOffIcon,
                  isTimed == true &&
                  timerOnIcon
                ]}
              />
            </View>

            {/* Amount of Time */}
            {isTimed == true &&
              <View style={Styles.formRow}>
                <View style={Styles.formAmountBox}>
                  <View style={[Styles.formAmountValue, theme == DarkMode && Styles.formAmountValueDm]}>
                    <Text style={[Styles.formAmountValueTxt, theme == DarkMode && Styles.formAmountValueTxtDm]}>
                      {amountOfTime}
                      {' '}
                      min
                    </Text>
                  </View>
                  <View style={[Styles.formAmountPlus, theme == DarkMode && Styles.formAmountPlusDm]}>
                    {/* <Pressable onPress={() => {setAmountOfTime(amountOfTime + 1)}}>
                      <FontAwesome6 name="plus" size={18} style={{color: selectedColor}} />
                    </Pressable> */}
                    <Pressable onPress={() => {setModalVisibleTimePicker(true)}}>
                      <FontAwesome6 name="plus" size={18} style={{color: selectedColor}} />
                    </Pressable>
                  </View>
                </View>
              </View>
            }

            <Modal
              style={Styles.modal}
              isVisible={modalVisibleTimePicker}
              propagateSwipe={true}
              onBackdropPress={() => setModalVisibleTimePicker(false)}
              animationIn={'zoomIn'}
              animationOut={'fadeOut'}
              backdropOpacity={0.8}
            >
              <TimePicker
                onTimeSelected={setAmountOfTime}
                selectedColor={selectedColor}
                setModalVisibleTimePicker={setModalVisibleTimePicker}
              />
            </Modal>

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
              animationOut={'fadeOut'}
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
              animationOut={'fadeOut'}
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

    <View style={[
      Styles.btnsBottomFixed,
      theme == DarkMode ? Styles.blackBg : Styles.whiteBg,
      {paddingBottom: insets.bottom}
    ]}>
      <View style={Styles.btnsSaveCancel}>
        <Pressable  style={[Styles.btnSave, {backgroundColor: selectedColor}]} onPress={() => {addHabitBtn(); closeModal()}}>
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