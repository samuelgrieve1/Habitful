import { View, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { db, doc, getDoc } from '../firebase/index';
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
    <div>

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

    <div>
      {completions && Object.keys(completions).map(key => (
        <div key={key}>
          <div>{key}</div>
        {completions[key].map((value, i) => (
          <div key={i}>{value}</div>
        ))}
        </div>
      ))}
    </div>

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

    </div>
  )
}