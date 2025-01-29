import { View, Text, Button, ScrollView, RefreshControl } from 'react-native';
import { useState, useEffect, useContext, useCallback } from 'react';
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
  const [refreshing, setRefreshing] = useState(false);
  const {theme} = useContext(ThemeContext)
  const [completions, setCompletions] = useState([])
  const [completionsSorted, setCompletionsSorted] = useState([])

  // RELOAD COMPLETIONS
  const onRefresh = useCallback(() => {
    getCompletions()
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

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
    setCompletionsSorted(sortedStateDes)
  }, [completions])

  const calendarThemeLm = {
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
  }

  const calendarThemeDm = {
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
  }

  return (
    <>
    <CalendarList
      pastScrollRange={50}
      futureScrollRange={0}
      key={theme == LightMode ? 'calendarLm' : 'calendarDm'}
      theme={theme == LightMode ? calendarThemeLm : calendarThemeDm}
      onDayPress={day => {
        console.log('selected day', day);
      }}
    />
    <ScrollView
      style={Styles.historyContainer}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >

    {/* <View style={{flexDirection:"row", width:"100%"}}>
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
    </View> */}

    <View>
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
    </>
  )
}