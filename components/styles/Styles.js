import { StyleSheet } from 'react-native';

const green = '#009900'
const gray = '#ddd'
const gray_dark = '#ddd'
const blue = '#0066ff'
const red ='red'
const white = '#fff'

const primary = blue
const background = '#fff'

const btn_bg_color_add = white
const btn_bg_color_save = blue
const btn_bg_color_cancel = white

const btn_txt_color_add = blue
const btn_txt_color_edit = gray_dark
const btn_txt_color_save = white
const btn_txt_color_cancel = red

const DarkMode = {
  dark: true,
  colors: {
    primary: 'white',
    background: 'black',
    card: 'black',
    text: 'white',
    border: 'gray',
    notification: 'rgb(255, 69, 58)',
  },
  test1: {
    color: 'pink'
  }
};

const LightMode = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'white',
    card: 'rgb(255, 255, 255)',
    text: 'black',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
  test1: {
    color: 'pink'
  }
};

const Styles = StyleSheet.create({
  safe_area_view: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    // backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 30,
  },
  screen_wrapper: {
    paddingLeft: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  dark_mode_txt: {
    width: '50%',
  },
  dark_mode_switch: {
    width: '50%',
    alignItems: 'flex-end'
  },
  header_left: {
    marginLeft: 20,
  },
  header_right: {
    marginRight: 10,
  },
  top_bar: {
    flexDirection: 'row',
    marginTop: 30,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  top_bar_left: {
    width: '20%',
  },
  top_bar_middle: {
    width: '60%',
  },
  top_bar_right: {
    width: '20%',
  },
  page_title: {
    fontSize: 18,
    textAlign: 'center',
    width: '100%',
  },
  page_title_add_habit: {
    fontSize: 24,
  },
  checkbox_pressable: {
  },
  checkbox: {
    borderCurve: 'circular',
    width: 26,
    height: 26,
    marginRight: 10,
    backgroundColor: gray,
    borderColor: gray,
    borderRadius: 5,
  },
  habit: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  habit_completed: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
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
  habit_item: {
    width: '100%',
    flexDirection: 'row',
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
  btn_add: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    backgroundColor: btn_bg_color_add,
  },
  txt_add: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: btn_txt_color_add,
  },
  txt_edit: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: btn_txt_color_edit,
  },
  txt_save: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: btn_txt_color_save,
  },
  txt_cancel: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: btn_txt_color_cancel,
  },
  input_label: {
    marginTop: 15,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    height: 30,
    paddingLeft: 8,
    paddingRight: 8,
  },
  checkbox_row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  day_name: {
    textAlign: 'left',
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
    backgroundColor: btn_bg_color_save,
  },
  btn_cancel: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: btn_bg_color_cancel,
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
  form_btn_select_all: {
  },
  form_txt_select_all: {
    color: blue,
  },
  close_modal_x: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  one_hundred_percent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  one_hundred_percent_txt: {
    fontSize: 24,
    color: 'green',
  },
});

export {Styles, DarkMode, LightMode}