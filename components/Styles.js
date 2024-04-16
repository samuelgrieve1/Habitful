import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
  },
  page_title: {
    fontSize: 36,
    textAlign: 'center',
    width: '100%',
  },
  checkbox: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    backgroundColor: '#fff'
  },
  habit: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomColor: '#ddd',
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
  habit_pressable: {
    width: '100%',
    flexDirection: 'row',
  },
  habit_name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  // add_habit_btn: {
  //   marginTop: 40,
  //   width: '50%',
  //   marginLeft: '25%',
  //   marginRight: '25%',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   paddingVertical: 12,
  //   paddingHorizontal: 32,
  //   borderRadius: 32,
  //   elevation: 3,
  //   backgroundColor: '#0066ff',
  // },
  // add_habit_txt: {
  //   fontSize: 16,
  //   lineHeight: 21,
  //   fontWeight: 'bold',
  //   letterSpacing: 0.25,
  //   color: 'white',
  // },
  add_habit_btn: {
    marginTop: 40,
    width: '50%',
    marginLeft: '25%',
    marginRight: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 32,
    elevation: 3,
  },
  add_habit_txt: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#0066ff',
  },
});

export default styles