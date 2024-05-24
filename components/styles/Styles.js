import { StyleSheet } from 'react-native';

//////////////////////////////
// Theme Colors
//////////////////////////////
const lightgray = '#eee'
const gray = '#ddd'
const darkgray = '#666'
const darkergray = '#333'
const evendarkergray = '#111'
const blue = '#4185e7'
const black = '#000'
const white = '#fff'
const red = '#da4836'
const green = 'green'

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
  habits_day_title_lm: {
    fontSize: 36,
    textAlign: 'center',
    color: black,
  },
  habits_day_title_dm: {
    fontSize: 36,
    textAlign: 'center',
    color: white,
  },
  habits_day_title_sub_lm: {
    fontSize: 10,
    textAlign: 'center',
    color: black,
  },
  habits_day_title_sub_dm: {
    fontSize: 10,
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
    margin: 20,
    backgroundColor: white,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView_dm: {
    margin: 20,
    backgroundColor: black,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 25,
    elevation: 5,
  },
  btn_add: {
    // width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    // backgroundColor: blue,
  },
  txt_add: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'normal',
    letterSpacing: 0.25,
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

  //////////////////////////////
  // AddHabit.js
  // HabitsItem.js
  //////////////////////////////
  checkbox_lm: {
    borderCurve: 'circular',
    width: 26,
    height: 26,
    marginRight: 10,
    borderColor: gray,
    borderRadius: 5,
  },
  checkbox_dm: {
    borderCurve: 'circular',
    width: 26,
    height: 26,
    marginRight: 10,
    borderColor: darkergray,
    borderRadius: 5,
  },
  checkbox_unchecked_lm: {
    borderCurve: 'circular',
    width: 26,
    height: 26,
    marginRight: 10,
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
  habit_lm: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomColor: lightgray,
    borderBottomWidth: 1,
  },
  habit_dm: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomColor: evendarkergray,
    borderBottomWidth: 1,
  },
  habit_name_lm: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  habit_name_completed_lm: {
    fontSize: 18,
    fontWeight: 'bold',
    color: gray,
    textDecorationLine: 'line-through',
  },
  habit_name_dm: {
    fontSize: 18,
    fontWeight: 'bold',
    color: white,
  },
  habit_name_completed_dm: {
    fontSize: 18,
    fontWeight: 'bold',
    color: darkergray,
    textDecorationLine: 'line-through',
  },
  habit_name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  habit_name_completed: {
    fontSize: 18,
    fontWeight: 'bold',
    color: gray,
    textDecorationLine: 'line-through',
  },

  //////////////////////////////
  // AddHabit.js
  //////////////////////////////
  page_title_add_habit_lm: {
    fontSize: 24,
    color: black,
  },
  page_title_add_habit_dm: {
    fontSize: 24,
    color: white,
  },
  input_label_lm: {
    marginTop: 15,
    marginBottom: 15,
    fontWeight: 'bold',
    color: black,
  },
  input_label_dm: {
    marginTop: 15,
    marginBottom: 15,
    fontWeight: 'bold',
    color: white,
  },
  input_lm: {
    borderWidth: 1,
    borderColor: black,
    borderRadius: 5,
    height: 30,
    paddingLeft: 8,
    paddingRight: 8,
    color: black,
  },
  input_dm: {
    borderWidth: 1,
    borderColor: darkgray,
    borderRadius: 5,
    height: 30,
    paddingLeft: 8,
    paddingRight: 8,
    color: white,
  },
  form_label_row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 15,
    marginBottom: 15,
  },
  form_label_lm: {
    color: black,
  },
  form_label_dm: {
    color: white,
  },
  form_input_label_frequency_lm: {
    fontWeight: 'bold',
    marginRight: 15,
    color: black,
  },
  form_input_label_frequency_dm: {
    fontWeight: 'bold',
    marginRight: 15,
    color: white,
  },
  form_txt_select_all: {
    color: blue,
  },
  checkbox_row: {
    flexDirection: 'row',
    marginBottom: 20,
    color: white,
  },
  btns_save_cancel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn_save: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 5,
    elevation: 3,
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
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 5,
    elevation: 3,
    shadowOpacity: 0,
  },
  txt_cancel: {
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
});

export {Styles, DarkMode, LightMode}