import { View, Text, Button, ScrollView } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { db, doc, getDoc } from '../firebase/index';
import { StyleSheet } from 'react-native';
import { Styles, LightMode } from '../components/styles/Styles';
import { ThemeContext } from '../components/Contexts';
import { Feather } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import HistoryList from './history/HistoryList';
import HistoryCalendar from './history/HistoryCalendar';
import { parse, compareAsc } from 'date-fns';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

// const Stack = createStackNavigator({
//   screens: {
//     List: HistoryList,
//     Calendar: HistoryCalendar,
//   },
// });

export default function History() {
  const {theme} = useContext(ThemeContext)
  const [completions, setCompletions] = useState([])
  const [completionsSorted, setCompletionsSorted] = useState([])

  // GET COMPLETIONS FROM DB AND ADD TO STATE
  const getCompletions = async () => {
    const docRef = doc(db, "completions", "dates");
    const completionsSnapshot = await getDoc(docRef);
    setCompletions(completions => ({
      ...completions,
      ...completionsSnapshot.data()
    }))
  }

  // SORT COMPLETIONS BY DATE
  const entriesArray = Object.entries(completions);

  // ASCENDING
  const sortedArrayAsc = entriesArray.sort((a, b) => {
    const dateA = new Date(a[0]);
    const dateB = new Date(b[0]);
    if (dateA.getTime() < dateB.getTime()) return -1;
    if (dateA.getTime() > dateB.getTime()) return 1;
    return 0;
  });
  const sortedStateAsc = Object.fromEntries(sortedArrayAsc);
  
  // DESCENDING
  const sortedArrayDes = entriesArray.sort((a, b) => {
    const dateA = new Date(a[0]);
    const dateB = new Date(b[0]);
    if (dateA.getTime() < dateB.getTime()) return 1;
    if (dateA.getTime() > dateB.getTime()) return -1;
    return 0;
  });
  const sortedStateDes = Object.fromEntries(sortedArrayDes);

  useEffect (() => {
    getCompletions()
  }, [])

  useEffect (() => {
    setCompletionsSorted(sortedStateAsc)
  }, [completions])

  return (
    <ScrollView style={Styles.historyContainer}>

    <View style={{flexDirection:"row", width:"100%"}}>
      <View style={{width:"50%"}}>
        <Button
          style={theme == LightMode ? Styles.historyListBtnLm : Styles.historyListBtnDm}
          title="List"
          onPress={() => Alert.alert('Left button pressed')}
        />
      </View>
      <View style={{width:"50%"}}>
        <Button
          style={theme == LightMode ? Styles.historyCalendarBtnLm : Styles.historyCalendarBtnDm}
          title="Calendar"
          onPress={() => Alert.alert('Right button pressed')}
        />
      </View>
    </View>

    <View>
      <Calendar
        onDayPress={day => {
          console.log('selected day', day);
        }}
      />
      {completionsSorted && Object.keys(completionsSorted).map(key => (
        <View key={key} style={theme == LightMode ? Styles.dateBoxLm : Styles.dateBoxDm}>
          <Feather name="edit-2" size={18} color='white' style={theme == LightMode ? Styles.editHistoryIconLm : Styles.editHistoryIconDm} />
          <Text style={theme == LightMode ? Styles.dateTitleLm : Styles.dateTitleDm}>{key}</Text>
        {completionsSorted[key].map((value, i) => (
          <Text style={theme == LightMode ? Styles.habitNameLm : Styles.habitNameDm} key={i}>{value}</Text>
        ))}
        </View>
      ))}
    </View>

    {/* <div>
      {Object.keys(data).map(key => (
        <div key={key}>
          <h3>{key}</h3>
          <ul>
            {Array.isArray(data[key]) && data[key].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div> */}

    </ScrollView>
  )
}