import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
const { height: screenHeight } = Dimensions.get('window');

//////////////////////////////
// Theme Colors
//////////////////////////////
const lightgray = '#eee'
const lightergray= '#f5f5f5'
const gray = '#ddd'
const gray9 = '#999'
const darkgray = '#757575'
const darkergray = '#333'
const gray2 = '#222'
const evendarkergray = '#111'
const blue = '#4185e7'
const black = '#000'
const white = '#fff'
const red = '#E23F44'
const lightred = '#ffcccc'
const green = '#419947'

//////////////////////////////
// Navigation Theme
//////////////////////////////
const DarkMode = {
  dark: true,
  colors: {
    primary: white,
    background: black,
    card: black,
    text: white,
    notification: blue,
  },
};
const LightMode = {
  dark: false,
  colors: {
    primary: black,
    background: white,
    card: white,
    text: black,
    border: gray,
    notification: blue,
  },
};

const Styles = StyleSheet.create({
  //////////////////////////////
  // General
  //////////////////////////////
  white: white,
  black: black,
  blackBg: {
    backgroundColor: black,
  },
  blackTxt: {
    color: black,
  },
  whiteBg: {
    backgroundColor: white,
  },
  whiteTxt: {
    color: white,
  },
  screenContainer: {
    flex: 1,
    // marginBottom: 120,
    paddingHorizontal: 10,
  },
  pageHeaderContainer: {
    paddingHorizontal: 0,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    // paddingBottom: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: darkergray,
  },
  pageHeaderLeft: {
    width: 50,
    paddingTop: 0,
    alignItems: 'flex-start',
  },
  pageHeaderLeftTxt: {
    color: blue,
    fontSize: 18,
    fontWeight: '600',
  },
  pageHeaderLeftPressable: {
    flex: 1,
  },
  pageHeaderRight: {
    width: 50,
    height: 50,
    paddingTop: 0,
  },
  pageHeaderRightPressable: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  pageHeaderCenter: {
    flex: 1,
  },
  pageHeaderCenterTitle: {
    fontSize: 36,
    fontWeight: '600',
    textAlign: 'center',
    color: black,
  },
  pageHeaderCenterTitleDm: {
    color: white,
  },
  pageHeaderCenterSubTitle: {
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'center',
    color: darkgray,
    marginTop: 5,
  },
  pageHeaderCenterSubTitleDm: {
    color: gray9,
  },

  //////////////////////////////
  // App.js
  //////////////////////////////
  safeAreaView: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  //////////////////////////////
  // Container.js
  //////////////////////////////
  wrapper: {
    flex: 1,
    // backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 0,
  },

  //////////////////////////////
  // BottomTabNavigator.js
  //////////////////////////////
  headerLeft: {
    marginLeft: 20,
  },
  headerRight: {
    marginRight: 20,
  },
  btnEditHabits: {
    backgroundColor: white,
  },
  headerIconLeft: {
    color: black,
    marginLeft: 40,
  },
  headerIconRightDm: {
    color: white,
  },

  //////////////////////////////
  // Habits.js
  //////////////////////////////
  habitsContainer: {
    //overflow: 'visible',
  },
  oneHundredPercentBox: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 3,
    marginBottom: 10,
  },
  oneHundredPercentBoxDm: {
    backgroundColor: green,
  },
  oneHundredPercentTxt: {
    color: white,
    textAlign: 'center',
    fontSize: 18,
  },
  oneHundredPercentTxtDm: {
    color: white,
  },
  noHabitsContainer: {
    justifyContent: 'center',
    //height: '50%',
  },
  noHabitsText: {
    color: black,
    textAlign: 'center',
    fontSize: 36,
  },
  noHabitsTextDm: {
    color: white,
  },
  habitsDay: {
    marginBottom: 30,
    color: black,
  },
  habitsDayDm: {
    color: white,
  },
  habitsDayTitleSin: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: black,
  },
  habitsDayTitleSinDm: {
    color: white,
  },
  habitsDayTitle: {
    fontSize: 24,
    textAlign: 'center',
    color: black,
  },
  habitsDayTitleDm: {
    color: white,
  },
  habitsDayTitleSub: {
    fontSize: 12,
    textAlign: 'center',
    color: black,
  },
  habitsDayTitleSubDm: {
    color: white,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalView: {
    flexDirection: 'row',
    width: '100%',
    maxHeight: screenHeight,
    backgroundColor: white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    paddingTop: 30,
    paddingRight: 10,
    paddingLeft: 10,
  },
  btnAddBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnAdd: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: lightergray,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: lightgray,
  },
  btnAddDm: {
    backgroundColor: evendarkergray,
    borderColor: darkergray,
  },
  txtAdd: {
    fontSize: 16,
    fontWeight: '600',
    color: blue,
  },
  // btn_edit: {
  //   width: '100%',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginTop: 15,
  //   backgroundColor: gray,
  // },
  // txt_edit: {
  //   fontSize: 16,
  //   lineHeight: 21,
  //   fontWeight: 'bold',
  //   letterSpacing: 0.25,
  //   color: blue,
  // },
  modal: {
    width: '100%',
    margin: 0,
    padding: 0,
  },
  menuIcon: {
    color: blue,
  },

  //////////////////////////////
  // AddHabit.js
  // HabitsItem.js
  //////////////////////////////
  stylingBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnColorIconPicker: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  txtColorIconPicker: {
    fontSize: 18,
    fontWeight: '600',
    color: blue,
  },
  btnColorIconPickerDone: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
  },
  txtColorIconPickerDone: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
  },

  //////////////////////////////
  // HabitsItem.js
  //////////////////////////////
  habitSeparator: {
    marginLeft: '17%',
    height: 1,
    backgroundColor: '#222',
  },
  habitBox: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 15,
    borderTopColor: lightgray,
  },
  habitBoxDm: {
    borderTopColor: darkergray,
  },
  habitSeparator: {
    marginLeft: 70,
    borderTopColor: '#ededed',
    borderTopWidth: 1,
  },
  habitSeparatorDm: {
    marginLeft: 70,
    borderTopColor: '#121212',
    borderTopWidth: 1,
  },
  habit: {
    flexDirection: 'row',
  },
  habitIcon: {
    width:50,
    height:50,
    //backgroundColor: 'rgba(65, 133, 231, 0.1)',
    backgroundColor: 'rgba(126, 126, 126, 0.1)',
    // marginRight: 10,
    borderRadius: 25,
    borderWidth: 0,
    borderColor: lightgray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  habitIconTxt: {
    color: 'rgba(65, 133, 231, 1)',
    fontSize: 18,
    fontWeight: '600',
  },
  habitNameBox: {
    flex: 1,
    justifyContent: 'center',
  },
  habitNameBoxIcon: {
    width: 24,
    paddingTop: 8,
  },
  habitNameBoxText: {
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: black,
  },
  habitNameDm: {
    color: '#fff',
  },
  habitNameCompleted: {
    fontSize: 16,
    fontWeight: 'bold',
    color: darkgray,
    textDecorationLine: 'line-through',
  },
  habitNameAmount: {
    fontSize: 14,
    fontWeight: '300',
    color: 'rgba(126, 126, 126, 1)',
    //color: 'rgba(65, 133, 231, 1)',
  },
  deleteBox: {
    height: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    color: white,
    backgroundColor: red,
  },
  deleteBoxTxt: {
    color: white,
  },

  //////////////////////////////
  // AddHabit.js
  // EditHabit.js
  //////////////////////////////
  formHeaderFixed: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1,
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  formHeaderFixedDm: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  formHeaderFixedTitle: {
    top: 20,
  },
  pageTitleAddHabit: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: black,
    marginBottom: 30,
  },
  pageTitleAddHabitDm: {
    color: white,
  },
  formTitle: {
    // flex: 1,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: black,
  },
  formTitleDm: {
    color: white,
  },
  inputLabel: {
    marginTop: 15,
    marginBottom: 15,
    fontWeight: 'bold',
    color: black,
    fontSize: 16,
  },
  inputLabelDm: {
    color: white,
  },
  input: {
    flex: 1,
    backgroundColor: lightgray,
    borderRadius: 5,
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    color: black,
    fontSize: 16,
  },
  inputDm: {
    backgroundColor: evendarkergray,
    color: white,
  },
  formLabelRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  formLabelRowNoFlex: {
    marginBottom: 10,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 30,
  },
  formRowLabel: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  formDropdownMenu: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  formRowVert: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 40,
  },
  formLabel: {
    color: black,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  formLabelDm: {
    color: white,
  },
  formAmountBox: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formAmountMinus: {
    width: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  formAmountMinusDm: {
    backgroundColor: '#111',
  },
  formAmountValue: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  formAmountValueNoMar: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  formAmountValueDm: {
    backgroundColor: '#111',
  },
  formAmountValueTxt: {
    color: '#000',
    fontSize: 18,
  },
  formAmountValueTxtDm: {
    color: '#fff',
  },
  formAmountPlus: {
    width: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  formAmountPlusDm: {
    backgroundColor: '#111',
  },
  btnsBottomFixed: {
    backgroundColor: black,
    position: 'absolute',
    paddingTop: 20,
    bottom: 0,
    left: 10,
    right: 10,
  },
  btnsSaveCancel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  btnSave: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    borderRadius: 5,
    backgroundColor: blue,
  },
  txtSave: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: white,
  },
  btnCancel: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    borderRadius: 5,
    borderColor: lightgray,
    borderWidth: 1,
  },
  btnCancelDm: {
    borderColor: evendarkergray,
  },
  txtCancel: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '600',
    letterSpacing: 0.25,
    color: black,
  },
  txtCancelDm: {
    color: white,
  },
  btnsArchiveDelete: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 20,
    borderTopColor: lightgray,
    borderTopWidth: 1,
  },
  btnsArchiveDeleteDm: {
    borderTopColor: evendarkergray,
  },
  btnsArchiveDeleteLeft: {
    flex: 1,
    marginRight: 10,
  },
  btnsArchiveDeleteRight: {
    flex: 1,
    marginLeft: 10,
  },
  btnArchive: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 0,
    borderColor: blue,
  },
  txtArchive: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'regular',
    letterSpacing: 0.25,
    color: blue,
  },
  btnDelete: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 0,
    borderColor: red,
  },
  txtDelete: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'regular',
    letterSpacing: 0.25,
    color: red,
  },
  closeModalX: {
    position: 'absolute',
    top: 20,
    left: 10,
    padding: 2,
    borderRadius: 5,
    zIndex: 2,
    backgroundColor: '#eeeeee'
  },
  closeModalXDm: {
    backgroundColor: '#111111'
  },
  closeModalSave: {
    position: 'absolute',
    top: 2,
    right: 0,
  },
  saveText: {
    color: blue,
    fontSize: 16,
    fontWeight: '600',
  },
  daySelectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roundDayBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  roundDayText: {
    flex: 1,
    textAlign: 'center',
    color: white,
    fontSize: 14,
    fontWeight: '600',
  },
  roundDayBoxSelected: {
    backgroundColor: blue,
  },
  roundDayTextSelected: {
    color: white,
  },
  modalColorIconPicker: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 5,
    backgroundColor: '#eeeeee',
  },
  modalColorIconPickerDm: {
    backgroundColor: '#111111',
  },
  stylingModalTitleBox: {
    marginTop: 10,
    marginBottom: 5,
  },
  stylingModalTitleTxt: {
    textAlign: 'center',
    textAlignVertical: 'top',
    fontSize: 24,
    fontWeight: '600',
  },
  colorPickerBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  colorPickerColor: {
    width: 40,
    height: 40,
    margin: 10,
    borderRadius: 20,
  },
  colorPickerColorSelected: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: 'rgba(126, 126, 126, 0.6)',
  },
  iconPickerBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  iconPickerIcon: {
    width: 40,
    height: 40,
    margin: 10,
    borderRadius: 5,
  },

  //////////////////////////////
  // Settings.js
  //////////////////////////////

  //////////////////////////////
  // DarkModeToggle.js
  //////////////////////////////
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  darkModeTxtBox: {
    width: '50%',
  },
  darkModeTxt: {
    color: black,
  },
  darkModeTxtDm: {
    color: white,
  },
  darkModeSwitchBox: {
    width: '50%',
    alignItems: 'flex-end'
  },

  //////////////////////////////
  // History.js
  //////////////////////////////
  historyContainer: {
    flex: 1,
    //paddingTop: 20,
    //paddingBottom: 0,
  },
  dateBox: {
    marginLeft: 20,
    marginRight: 20,
    borderTopWidth: 1,
    borderColor: lightgray,
  },
  dateBoxDm: {
    borderColor: evendarkergray,
  },
  dateBoxHeader: {
    paddingTop: 15,
    paddingBottom: 5,
  },
  historyCompletionsBox: {
    marginBottom: 20,
  },
  dateTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateTitleDm: {
    color: 'white',
  },
  historyHabitName: {
    color: 'black',
    fontSize: 16,
    lineHeight: 32,
  },
  historyHabitNameDm: {
    color: 'white',
  },
  downHistoryIcon: {
    color: black,
    position: 'absolute',
    top: 15,
    right: 0,
    width: 18,
    height: 18,
    zIndex: 1,
  },
  downHistoryIconDm: {
    color: white,
  },
  editHistoryBtnContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 60,
    height: 24,
    borderRadius: 10,
    backgroundColor: lightergray,
  },
  editHistoryBtnContainerDm: {
    backgroundColor: evendarkergray,
  },
  editHistoryBtn: {
    color: blue,
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    width: 60,
    height: 24,
  },
  historyViewBtnContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  historyViewBtn: {
    width: '50%',
    height: 40,
  },
  historyViewBtnSelected: {
    width: '50%',
    height: 40,
    borderRadius: 10,
    backgroundColor: lightergray,
  },
  historyViewBtnSelectedDm: {
    backgroundColor: evendarkergray,
  },
  historyViewBtnTxtSelected: {
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 18,
    color: black,
    width: '100%',
    height: 40,
  },
  historyViewBtnTxtSelectedDm: {
    color: white,
  },
  historyViewBtnTxt: {
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 18,
    color: darkgray,
    width: '100%',
    height: 40,
  },
  historyViewBtnTxtDm: {
    color: darkgray,
  },
  historyCalendar: {
    backgroundColor: blue,
  },
  historyCalendarDm: {
    backgroundColor: white,
    color: 'pink',
  },
  editDayTitle: {
    fontSize: 36,
    color: black,
  },
  editDayTitleDm: {
    color: white,
  },
  editDayDate: {
    fontSize: 18,
    color: black,
    marginBottom: 20,
  },
  editDayDateDm: {
    color: white,
  },
  calendarLm: {
    agendaKnobColor: '#000',
    calendarBackground: '#fff',
    todayTextColor: '#4185e7',
    indicatorColor: '#4185e7',
    dayTextColor: '#000',
    //selectedDayTextColor: 'pink',
    //selectedDayBackgroundColor: 'pink',
    monthTextColor: '#000',
    arrowColor: '#000',
    textSectionTitleColor: '#757575',
    textDisabledColor: '#757575',
    textInactiveColor: 'pink',
  },
  calendarDm: {
    agendaKnobColor: '#fff',
    calendarBackground: '#000',
    todayTextColor: '#4185e7',
    indicatorColor: '#4185e7',
    dayTextColor: '#fff',
    //selectedDayTextColor: 'pink',
    //selectedDayBackgroundColor: 'pink',
    monthTextColor: '#fff',
    arrowColor: '#fff',
    textSectionTitleColor: '#757575',
    textDisabledColor: '#757575',
    textInactiveColor: 'pink',
  },
});

export {Styles, LightMode, DarkMode}