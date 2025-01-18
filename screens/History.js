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

// const Stack = createStackNavigator({
//   screens: {
//     List: HistoryList,
//     Calendar: HistoryCalendar,
//   },
// });

export default function History() {
  const {theme} = useContext(ThemeContext)
  const [completions, setCompletions] = useState(null)

  // GET COMPLETIONS FROM DB AND ADD TO STATE
  const getCompletions = async () => {
    const docRef = doc(db, "completions", "dates");
    const completionsSnapshot = await getDoc(docRef);
    setCompletions(completions => ({
      ...completions,
      ...completionsSnapshot.data()
    }))
  }

  // if (completions) {   
  //   Object.keys(completions).map((key) => (
  //     console.log(key),
  //     completions[key].map((value) => (
  //       console.log(value)
  //     ))
  //   ))
  // }

  useEffect (() => {
    getCompletions()
  }, [])

  return (
    <ScrollView style={Styles.historyContainer}>

    <View style={{flexDirection:"row", width:"100%"}}>
      <View style={{width:"50%"}}>
        <Button
          title="List"
          onPress={() => Alert.alert('Left button pressed')}
        />
      </View>
      <View style={{width:"50%"}}>
        <Button
          title="Calendar"
          onPress={() => Alert.alert('Right button pressed')}
        />
      </View>
    </View>

    <View>
      {completions && Object.keys(completions).sort().map(key => (
        <View key={key} style={theme == LightMode ? Styles.dateBoxLm : Styles.dateBoxDm}>
          <Feather name="edit-2" size={18} color='white' style={theme == LightMode ? Styles.editHistoryIconLm : Styles.editHistoryIconDm} />
          <Text style={theme == LightMode ? Styles.dateTitleLm : Styles.dateTitleDm}>{key}</Text>
        {completions[key].sort().map((value, i) => (
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