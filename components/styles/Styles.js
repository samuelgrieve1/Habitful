import { StyleSheet } from 'react-native';

import { Dimensions } from 'react-native';
import { WeekCalendar } from 'react-native-calendars';
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
const green = '#4a8b47'

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
  // App.js
  //////////////////////////////
  safe_area_view: {
    flex: 1,
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
  header_left: {
    marginLeft: 20,
  },
  header_right: {
    marginRight: 20,
  },
  btn_edit_habits: {
    backgroundColor: white,
  },

  //////////////////////////////
  // Habits.js
  //////////////////////////////
  habitsContainer: {
  },
  one_hundred_percent_box_lm: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 3,
    marginBottom: 10,
  },
  one_hundred_percent_box_dm: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 3,
    marginBottom: 10,
  },
  one_hundred_percent_txt_lm: {
    color: white,
    textAlign: 'center',
    fontSize: 18,
  },
  one_hundred_percent_txt_dm: {
    color: white,
    textAlign: 'center',
    fontSize: 18,
  },
  no_habits_text_lm: {
    color: black,
    textAlign: 'center',
    fontSize: 36,
  },
  no_habits_text_dm: {
    color: white,
    textAlign: 'center',
    fontSize: 36,
  },
  habits_day_lm: {
    marginBottom: 30,
    color: black,
  },
  habits_day_dm: {
    marginBottom: 30,
    color: white,
  },
  habits_day_title_sin_lm: {
    fontSize: 18,
    textAlign: 'center',
    color: black,
  },
  habits_day_title_sin_dm: {
    fontSize: 18,
    textAlign: 'center',
    color: white,
  },
  habits_day_title_lm: {
    fontSize: 24,
    textAlign: 'center',
    color: black,
  },
  habits_day_title_dm: {
    fontSize: 24,
    textAlign: 'center',
    color: white,
  },
  habits_day_title_sub_lm: {
    fontSize: 12,
    textAlign: 'center',
    color: black,
  },
  habits_day_title_sub_dm: {
    fontSize: 12,
    textAlign: 'center',
    color: white,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalView_lm: {
    height: screenHeight - 50,
    marginTop: 50,
    backgroundColor: white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalView_dm: {
    height: screenHeight - 50,
    marginTop: 50,
    backgroundColor: black,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  btn_add_lm: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  btn_add_dm: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  txt_add_lm: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'normal',
    letterSpacing: 0.25,
    color: darkgray,
    padding: 10,
    borderWidth: 1,
    borderColor: lightgray,
    borderCurve: 'circular',
    borderRadius: 5,
  },
  txt_add_dm: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'normal',
    letterSpacing: 0.25,
    color: darkgray,
    padding: 10,
    borderWidth: 1,
    borderColor: evendarkergray,
    borderCurve: 'circular',
    borderRadius: 5,
  },
  btn_add_blue_lm: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  btn_add_blue_dm: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  txt_add_blue_lm: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'normal',
    letterSpacing: 0.25,
    color: blue,
    padding: 10,
    borderWidth: 1,
    borderColor: lightgray,
    borderCurve: 'circular',
    borderRadius: 5,
  },
  txt_add_blue_dm: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'normal',
    letterSpacing: 0.25,
    color: blue,
    padding: 10,
    borderWidth: 1,
    borderColor: evendarkergray,
    borderCurve: 'circular',
    borderRadius: 5,
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
    marginLeft: 0,
  },
  menuIconLm: {
    color: black,
  },
  menuIconDm: {
    color: white,
  },
  weekCalendarLm: {
    backgroundColor: white,
  },
  weekCalendarDm: {
    backgroundColor: black,
  },

  //////////////////////////////
  // AddHabit.js
  // HabitsItem.js
  //////////////////////////////
  checkbox_lm: {
    borderCurve: 'circular',
    width: 26,
    height: 26,
    marginRight: 10,
    backgroundColor: gray,
    borderColor: gray,
    borderRadius: 5,
  },
  checkbox_dm: {
    borderCurve: 'circular',
    width: 26,
    height: 26,
    marginRight: 10,
    backgroundColor: darkergray,
    borderColor: darkergray,
    borderRadius: 5,
  },
  checkbox_unchecked_lm: {
    borderCurve: 'circular',
    width: 26,
    height: 26,
    marginRight: 10,
    backgroundColor: gray,
    borderColor: gray,
    borderRadius: 5,
  },
  checkbox_checked_lm: {
    borderCurve: 'circular',
    width: 26,
    height: 26,
    marginRight: 10,
    backgroundColor: green,
    borderColor: gray,
    borderRadius: 5,
  },
  checkbox_unchecked_dm: {
    borderCurve: 'circular',
    width: 26,
    height: 26,
    marginRight: 10,
    backgroundColor: darkergray,
    borderColor: darkergray,
    borderRadius: 5,
  },
  checkbox_checked_dm: {
    borderCurve: 'circular',
    width: 26,
    height: 26,
    marginRight: 10,
    backgroundColor: green,
    borderColor: blue,
    borderRadius: 5,
  },

  //////////////////////////////
  // HabitsItem.js
  //////////////////////////////
  habit_box: {
    flex: 1,
  },
  habit_separator_lm: {
    flexDirection: 'row',
    height: 1,
    backgroundColor: lightgray,
  },
  habit_separator_dm: {
    flexDirection: 'row',
    height: 1,
    backgroundColor: evendarkergray,
  },
  habit_lm: {
    flexDirection: 'row',
  },
  habit_dm: {
    flexDirection: 'row',
  },
  habit_checkbox_box: {
    marginTop: 7,
    width: 40,
  },
  habit_name_box: {
    flex: 1,
  },
  habit_name_lm: {
    fontSize: 18,
    fontWeight: 'bold',
    color: black,
    marginTop: 10,
    marginBottom: 10,
  },
  habit_name_completed_lm: {
    fontSize: 18,
    fontWeight: 'bold',
    color: gray,
    //textDecorationLine: 'line-through',
    marginTop: 10,
    marginBottom: 10,
  },
  habit_name_dm: {
    fontSize: 18,
    fontWeight: 'bold',
    color: white,
    marginTop: 10,
    marginBottom: 10,
  },
  habit_name_completed_dm: {
    fontSize: 18,
    fontWeight: 'bold',
    color: green,
    //textDecorationLine: 'line-through',
    marginTop: 10,
    marginBottom: 10,
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
  page_title_add_habit_lm: {
    fontSize: 36,
    color: black,
  },
  page_title_add_habit_dm: {
    fontSize: 36,
    color: white,
  },
  input_label_lm: {
    marginTop: 15,
    marginBottom: 15,
    fontWeight: 'bold',
    color: black,
    fontSize: 16,
  },
  input_label_dm: {
    marginTop: 15,
    marginBottom: 15,
    fontWeight: 'bold',
    color: white,
    fontSize: 16,
  },
  input_lm: {
    borderWidth: 1,
    borderColor: black,
    borderRadius: 5,
    height: 40,
    paddingLeft: 8,
    paddingRight: 8,
    color: black,
    marginBottom: 20,
  },
  input_dm: {
    borderWidth: 1,
    borderColor: darkgray,
    borderRadius: 5,
    height: 40,
    paddingLeft: 8,
    paddingRight: 8,
    color: white,
    marginBottom: 20,
  },
  form_label_row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 15,
    marginBottom: 15,
  },
  form_label_lm: {
    color: black,
    lineHeight: 26,
  },
  form_label_dm: {
    color: white,
    lineHeight: 26,
  },
  form_input_label_frequency_lm: {
    fontWeight: 'bold',
    color: black,
    fontSize: 16,
  },
  form_input_label_frequency_dm: {
    fontWeight: 'bold',
    color: white,
    fontSize: 16,
  },
  form_txt_select_all: {
    color: blue,
    marginLeft: 10,
    fontSize: 16,
  },
  checkbox_row: {
    flexDirection: 'row',
    marginBottom: 20,
    color: white,
  },
  btns_save_cancel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btn_save: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 5,
    // elevation: 3,
    backgroundColor: blue,
  },
  txt_save: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: white,
  },
  btn_cancel: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 5,
    // elevation: 3,
    backgroundColor: lightgray,
  },
  txt_cancel_lm: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'regular',
    letterSpacing: 0.25,
    color: darkergray,
  },
  txt_cancel_dm: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'regular',
    letterSpacing: 0.25,
    color: darkergray,
  },
  btn_delete: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 32,
    // borderRadius: 5,
    // elevation: 3,
    // backgroundColor: lightred,
  },
  txt_delete: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'regular',
    letterSpacing: 0.25,
    color: red,
  },
  close_modal_x: {
    position: 'absolute',
    top: 0,
    right: 0,
  },

  //////////////////////////////
  // Settings.js
  //////////////////////////////
  setting_lm: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomColor: lightgray,
    borderBottomWidth: 1,
  },
  setting_dm: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomColor: evendarkergray,
    borderBottomWidth: 1,
  },

  //////////////////////////////
  // DarkModeToggle.js
  //////////////////////////////
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  dark_mode_txt_box: {
    width: '50%',
    color: black,
  },
  dark_mode_txt_lm: {
    color: black,
  },
  dark_mode_txt_dm: {
    color: white,
  },
  dark_mode_switch_box: {
    width: '50%',
    alignItems: 'flex-end'
  },

  //////////////////////////////
  // History.js
  //////////////////////////////
  historyContainer: {
    paddingTop: 20,
    paddingBottom: 27,
  },
  listViewContainer: {
    marginTop: 0,
    marginBottom: 40,
  },
  calendarViewContainer: {
    marginTop: 0,
    marginBottom: 0,
  },
  dateBoxLm: {
    marginLeft: 20,
    marginRight: 20,
    borderTopWidth: 1,
    borderColor: lightgray,
  },
  dateBoxDm: {
    marginLeft: 20,
    marginRight: 20,
    borderTopWidth: 1,
    borderColor: evendarkergray,
  },
  dateBoxHeader: {
    paddingTop: 15,
    paddingBottom: 5,
  },
  historyCompletionsBox: {
    paddingTop: 10,
    marginBottom: 20,
  },
  dateTitleLm: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateTitleDm: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyHabitNameLm: {
    color: 'black',
    fontSize: 16,
    lineHeight: 32,
  },
  historyHabitNameDm: {
    color: 'white',
    fontSize: 16,
    lineHeight: 32,
  },
  downHistoryIconLm: {
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
    position: 'absolute',
    top: 15,
    right: 0,
    width: 18,
    height: 18,
    zIndex: 1,
  },
  editHistoryIconContainerLm: {
    marginTop: 10,
    backgroundColor: lightergray,
    width: 100,
    padding: 10,
  },
  editHistoryIconContainerDm: {
    marginTop: 0,
    marginBottom: 15,
    position: 'absolute',
    top: 15,
    right: 5,
  },
  editHistoryIconLm: {
    color: blue,
    fontSize: 16,
  },
  editHistoryIconDm: {
    color: blue,
    fontSize: 16,
  },
  filterHistoryIconLm: {
    color: black,
  },
  filterHistoryIconDm: {
    color: white,
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
  historyViewBtnSelectedLm: {
    width: '50%',
    height: 40,
    borderRadius: 10,
    backgroundColor: lightergray,
  },
  historyViewBtnSelectedDm: {
    width: '50%',
    height: 40,
    borderRadius: 10,
    backgroundColor: evendarkergray,
  },
  historyViewBtnTxtSelectedLm: {
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 18,
    color: black,
    width: '100%',
    height: 40,
  },
  historyViewBtnTxtSelectedDm: {
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 18,
    color: white,
    width: '100%',
    height: 40,
  },
  historyViewBtnTxtLm: {
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 18,
    color: darkgray,
    width: '100%',
    height: 40,
  },
  historyViewBtnTxtDm: {
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 18,
    color: darkgray,
    width: '100%',
    height: 40,
  },
  historyCalendarLm: {
    backgroundColor: blue,
  },
  historyCalendarDm: {
    backgroundColor: white,
    color: 'pink',
  },
  editDayTitleLm: {
    fontSize: 36,
    color: black,
  },
  editDayTitleDm: {
    fontSize: 36,
    color: white,
  },
  editDayDateLm: {
    fontSize: 18,
    color: black,
    marginBottom: 20,
  },
  editDayDateDm: {
    fontSize: 18,
    color: white,
    marginBottom: 20,
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

export {Styles, DarkMode, LightMode}