import { StyleSheet } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';

const green = '#009900'
const gray = '#eee'
const blue = '#0066ff'
const red ='red'
const white = '#fff'

const btn_bg_color_add = white
const btn_bg_color_save = blue
const btn_bg_color_cancel = white

const btn_txt_color_add = blue
const btn_txt_color_save = white
const btn_txt_color_cancel = red

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fff',
    background: '#fff',
  },
};

const Styles = StyleSheet.create({
  safe_area_view: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 30,
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
    backgroundColor: 'yellow',
  },
  top_bar_middle: {
    width: '60%',
  },
  top_bar_right: {
    width: '20%',
    backgroundColor: 'red'
  },
  page_title: {
    fontSize: 18,
    textAlign: 'center',
    width: '100%',
  },
  bottom_nav: {
    borderTopWidth: 5,
    borderTopColor: '#000',
    backgroundColor: 'red',
  },
  page_title_add_habit: {
    fontSize: 24,
  },
  checkbox_pressable: {
  },
  checkbox: {
    borderCurve: 'circular',
    width: 20,
    height: 20,
    marginRight: 10,
    backgroundColor: '#fff'
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
    fontSize: 24,
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
  }
});

export {Styles, MyTheme}