import { StyleSheet, Platform, StatusBar } from 'react-native';

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
  screenContainer: {
    flex: 1,
    // marginBottom: 120,
  },
  pageHeaderContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    // paddingBottom: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: darkergray,
  },
  pageHeaderLeft: {
    width: 50,
    paddingTop: 10,
  },
  pageHeaderLeftPressable: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  pageHeaderRight: {
    width: 50,
    paddingTop: 10,
  },
  pageHeaderRightPressable: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  pageHeaderCenter: {
    flex: 1,
  },
  pageHeaderCenterTitleLm: {
    fontSize: 36,
    fontWeight: '600',
    textAlign: 'center',
    color: black,
  },
  pageHeaderCenterTitleDm: {
    fontSize: 36,
    fontWeight: '600',
    textAlign: 'center',
    color: white,
  },
  pageHeaderCenterSubTitleLm: {
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'center',
    color: darkgray,
    marginTop: 5,
  },
  pageHeaderCenterSubTitleDm: {
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'center',
    color: gray9,
    marginTop: 5,
  },
  pageHeaderCenterDateLm: {
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'center',
    color: white,
    marginTop: 5,
  },
  pageHeaderCenterDateDm: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: white,
    marginTop: 35,
  },

  //////////////////////////////
  // App.js
  //////////////////////////////
  safe_area_view: {
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
  header_left: {
    marginLeft: 20,
  },
  header_right: {
    marginRight: 20,
  },
  btn_edit_habits: {
    backgroundColor: white,
  },
  headerIconLeftDm: {
    color: white,
    marginLeft: 40,
  },
  headerIconRightDm: {
    color: white,
    marginRight: 20,
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
  no_habits_container_lm: {
    justifyContent: 'center',
    height: '100%',
  },
  no_habits_container_dm: {
    justifyContent: 'center',
    height: '100%',
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
    fontWeight: '600',
    textAlign: 'center',
    color: black,
  },
  habits_day_title_sin_dm: {
    fontSize: 18,
    fontWeight: '600',
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
  btn_add_box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_add_lm: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  btn_add_dm: {
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: evendarkergray,
    borderRadius: 10,
  },
  txt_add_lm: {
    fontSize: 16,
    fontWeight: '600',
    color: blue,
  },
  txt_add_dm: {
    fontSize: 16,
    fontWeight: '600',
    color: blue,
  },
  btn_add_blue_container_lm: {
    justifyContent: 'center',
    alignItems: 'center' 
  },
  btn_add_blue_container_dm: {
    justifyContent: 'center',
    alignItems: 'center' 
  },
  btn_add_blue_lm: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 50,
    marginTop: 30,
    borderWidth: 1,
    borderColor: lightgray,
    //borderColor: blue,
    borderRadius: 10,
  },
  btn_add_blue_dm: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 50,
    marginTop: 30,
    borderWidth: 1,
    borderColor: evendarkergray,
    //borderColor: blue,
    borderRadius: 10,
  },
  txt_add_blue_lm: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    letterSpacing: 0.25,
    color: blue,
    padding: 10,
  },
  txt_add_blue_dm: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    letterSpacing: 0.25,
    color: blue,
    padding: 10,
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
    // color: black,
    color: blue,
  },
  menuIconDm: {
    // color: white,
    color: blue,
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
    // marginRight: 10,
    backgroundColor: lightgray,
    borderColor: lightgray,
    borderRadius: 5,
  },
  checkbox_dm: {
    borderCurve: 'circular',
    width: 26,
    height: 26,
    // marginRight: 10,
    backgroundColor: darkergray,
    borderColor: darkergray,
    borderRadius: 5,
  },
  checkbox_unchecked_lm: {
    borderCurve: 'circular',
    width: 26,
    height: 26,
    // marginRight: 10,
    backgroundColor: gray,
    borderColor: gray,
    borderRadius: 5,
    borderWidth: 0,
  },
  checkbox_checked_lm: {
    borderCurve: 'circular',
    width: 26,
    height: 26,
    // marginRight: 10,
    backgroundColor: blue,
    borderColor: blue,
    borderRadius: 5,
    borderWidth: 0,
  },
  checkbox_unchecked_dm: {
    borderCurve: 'circular',
    width: 26,
    height: 26,
    // marginRight: 10,
    backgroundColor: black,
    borderColor: darkergray,
    borderRadius: 5,
    borderWidth: 0,
  },
  checkbox_checked_dm: {
    borderCurve: 'circular',
    width: 26,
    height: 26,
    // marginRight: 10,
    backgroundColor: blue,
    borderColor: blue,
    borderRadius: 5,
    borderWidth: 0,
  },

  //////////////////////////////
  // HabitsItem.js
  //////////////////////////////
  habit_box_lm: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: lightergray,
    marginBottom: 15,
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: lightgray,
    // paddingTop: 10,
    // paddingBottom: 10,
  },
  habit_box_dm: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: evendarkergray,
    marginBottom: 15,
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: darkergray,
    // paddingTop: 10,
    // paddingBottom: 10,
  },
  habit_box_completed_lm: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: white,
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: lightgray,
    // paddingTop: 10,
    // paddingBottom: 10,
  },
  habit_box_completed_dm: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: evendarkergray,
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: darkergray,
    // paddingTop: 10,
    // paddingBottom: 10,
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
    // width: 40,
  },
  habit_name_box: {
    flex: 1,
    marginLeft: 15,
  },
  habit_name_box_icon: {
    width: 24,
    paddingTop: 8,
  },
  habit_name_box_text: {
    flex: 1,
  },
  habit_name_lm: {
    fontSize: 18,
    fontWeight: 'bold',
    color: black,
    marginTop: 10,
    marginBottom: 0,
  },
  habit_name_completed_lm: {
    fontSize: 18,
    fontWeight: 'bold',
    color: darkgray,
    textDecorationLine: 'line-through',
    marginTop: 10,
    marginBottom: 10,
  },
  habit_name_dm: {
    fontSize: 18,
    fontWeight: 'bold',
    color: white,
    marginTop: 10,
    marginBottom: 0,
  },
  habit_name_completed_dm: {
    fontSize: 18,
    fontWeight: 'bold',
    color: darkgray,
    textDecorationLine: 'line-through',
    marginTop: 10,
    marginBottom: 10,
  },
  habit_name_amount_lm: {
    fontSize: 18,
    fontWeight: 'normal',
    color: blue,
  },
  habit_name_amount_dm: {
    fontSize: 18,
    fontWeight: 'normal',
    color: blue,
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
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: black,
    marginBottom: 30,
  },
  page_title_add_habit_dm: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: white,
    marginBottom: 30,
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
    flex: 1,
    backgroundColor: lightergray,
    borderWidth: 0.5,
    borderColor: lightgray,
    borderRadius: 5,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    color: black,
    fontSize: 16,
  },
  input_dm: {
    flex: 1,
    backgroundColor: evendarkergray,
    borderWidth: 0.5,
    borderColor: darkergray,
    borderRadius: 5,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    color: white,
    fontSize: 16,
  },
  form_separator_lm: {
    flexDirection: 'row',
    height: 1,
    backgroundColor: lightergray,
    marginTop: 10,
    marginBottom: 10,
  },
  form_separator_dm: {
    flexDirection: 'row',
    height: 1,
    backgroundColor: evendarkergray,
    marginTop: 10,
    marginBottom: 10,
  },
  form_label_row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  form_row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 40,
  },
  form_row_vert: {
    flexDirection: 'column',
    //justifyContent: 'flex-start',
    marginBottom: 40,
  },
  form_label_lm: {
    flex: 1,
    color: black,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  form_label_dm: {
    flex: 1,
    color: white,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
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
  checkbox_col: {
    flex: 1,
  },
  btns_save_cancel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  btn_save: {
    width: '100%',
    height: 40,
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
  btn_cancel_lm: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 5,
    //backgroundColor: lightgray,
    borderColor: lightgray,
    borderWidth: 1,
  },
  btn_cancel_dm: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 5,
    //backgroundColor: darkergray,
    borderColor: darkergray,
    borderWidth: 1,
  },
  txt_cancel_lm: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '600',
    letterSpacing: 0.25,
    color: black,
  },
  txt_cancel_dm: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '600',
    letterSpacing: 0.25,
    color: white,
  },
  btns_archive_delete_lm: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 20,
    borderTopColor: lightgray,
    borderTopWidth: 1,
  },
  btns_archive_delete_dm: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 20,
    borderTopColor: evendarkergray,
    borderTopWidth: 1,
  },
  btns_archive_delete_left: {
    flex: 1,
    marginRight: 10,
  },
  btns_archive_delete_right: {
    flex: 1,
    marginLeft: 10,
  },
  btn_archive_lm: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 0,
    borderColor: blue,
    // backgroundColor: '#f0f5fd',
  },
  btn_archive_dm: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 0,
    borderColor: blue,
    // backgroundColor: '#050a12',
  },
  txt_archive: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'regular',
    letterSpacing: 0.25,
    color: blue,
  },
  btn_delete_lm: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 0,
    borderColor: red,
    // backgroundColor: '#fdf0f0',
  },
  btn_delete_dm: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 0,
    borderColor: red,
    // backgroundColor: '#120505',
  },
  txt_delete: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'regular',
    letterSpacing: 0.25,
    color: red,
  },
  close_modal_x_lm: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 2,
    backgroundColor: lightergray,
    borderRadius: 5,
  },
  close_modal_x_dm: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 2,
    backgroundColor: evendarkergray,
    borderRadius: 5,
  },
  close_modal_save: {
    position: 'absolute',
    top: 2,
    right: 0,
  },
  save_text: {
    color: blue,
    fontSize: 16,
    fontWeight: '600',
  },
  cancel_text: {
    color: blue,
    fontSize: 16,
    fontWeight: '600',
  },
  round_day_box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: blue,
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  round_day_text: {
    flex: 1,
    textAlign: 'center',
    color: white,
    fontSize: 16,
    fontWeight: '600',
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
    marginBottom: 20,
  },
  calendarViewContainer: {
    marginTop: 0,
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
  editHistoryBtnContainerLm: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 60,
    height: 24,
    borderRadius: 10,
    backgroundColor: lightergray,
  },
  editHistoryBtnContainerDm: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 60,
    height: 24,
    borderRadius: 10,
    backgroundColor: evendarkergray,
  },
  editHistoryBtnLm: {
    color: blue,
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    width: 60,
    height: 24,
  },
  editHistoryBtnDm: {
    color: blue,
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    width: 60,
    height: 24,
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