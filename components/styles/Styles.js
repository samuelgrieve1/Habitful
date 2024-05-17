import { StyleSheet } from 'react-native';

//////////////////////////////
// Theme Colors
//////////////////////////////
const lightgray = '#eee'
const gray = '#ddd'
const darkgray = '#666'
const darkergray = '#333'
const blue = '#0066ff'
const black = '#000'
const white = '#fff'
const red = '#ff0000'

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
    border: gray,
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
    padding: 30,
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

  //////////////////////////////
  // Habits.js
  //////////////////////////////
  habits_day: {
    marginBottom: 30,
  },
  habits_day_title: {
    fontSize: 36,
    textAlign: 'center',
  },
  habits_day_title_sub: {
    fontSize: 12,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
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
    fontWeight: 'bold',
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
    backgroundColor: gray,
    borderColor: gray,
    borderRadius: 5,
  },
  checkbox_dm: {
    borderCurve: 'circular',
    width: 26,
    height: 26,
    marginRight: 10,
    backgroundColor: darkgray,
    borderColor: darkgray,
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
    borderBottomColor: darkgray,
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
    color: darkgray,
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
  page_title_add_habit: {
    fontSize: 24,
  },
  input_label: {
    marginTop: 15,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: black,
    borderRadius: 5,
    height: 30,
    paddingLeft: 8,
    paddingRight: 8,
  },
  form_label_row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 15,
    marginBottom: 15,
  },
  form_input_label_frequency: {
    fontWeight: 'bold',
    marginRight: 15,
  },
  form_txt_select_all: {
    color: blue,
  },
  checkbox_row: {
    flexDirection: 'row',
    marginBottom: 20,
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
    backgroundColor: white,
    shadowOpacity: 0,
  },
  txt_cancel: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: red,
  },
  close_modal_x: {
    position: 'absolute',
    top: 0,
    right: 0,
  },

  //////////////////////////////
  // DarkModeToggle.js
  //////////////////////////////
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  dark_mode_txt_lm: {
    width: '50%',
  },
  dark_mode_txt_dm: {
    width: '50%',
  },
  dark_mode_switch: {
    width: '50%',
    alignItems: 'flex-end'
  },
});

export {Styles, DarkMode, LightMode}