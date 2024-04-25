import React , {useEffect, useState} from 'react';
import { StyleSheet, Text, View , Button, TextInput } from 'react-native';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddHabit() {
  const [habits, setHabits] = useState([])
  const [habitName, setHabitName] = useState('')
  const [habitFrequency, setHabitFrequency] = useState([])
  const [activeSun, setActiveSun] = useState(false)
  const [activeMon, setActiveMon] = useState(false)
  const [activeTue, setActiveTue] = useState(false)
  const [activeWed, setActiveWed] = useState(false)
  const [activeThu, setActiveThu] = useState(false)
  const [activeFri, setActiveFri] = useState(false)
  const [activeSat, setActiveSat] = useState(false)

  const addHabitBtn = async () => {
    setHabits([...habits, {
      'name': habitName,
      'frequency': [{
        'Sun': activeSun,
        'Mon': activeMon,
        'Tue': activeTue,
        'Wed': activeWed,
        'Thu': activeThu,
        'Fri': activeFri,
        'Sat': activeSat
      }]
    }])
  }

  const addToStoreBtn = async () => {
    try {
      const jsonValue = JSON.stringify(habits)
      await AsyncStorage.setItem('habits', jsonValue)
    } catch(e) {
      console.log(e)
    }
  }

  const getState = () => {
    console.log(habits)
  }

  const getStore = async () => {
    try {
      let habit =  await AsyncStorage.getItem('habits')
      console.log(JSON.parse(habit))
    } catch(e) {
      console.log(e)
    }
  }

  const clearState = () => {
    setHabits([])
  }

  const clearStore = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>{habits}</Text> */}
      <View style={styles.button} >
        <TextInput onChangeText={(text) => setHabitName(text)} style={styles.input}/>
      </View>
      <View>
        <Checkbox style={styles.checkbox} value={activeSun} onValueChange={setActiveSun} />
        <Checkbox style={styles.checkbox} value={activeMon} onValueChange={setActiveMon} />
        <Checkbox style={styles.checkbox} value={activeTue} onValueChange={setActiveTue} />
        <Checkbox style={styles.checkbox} value={activeWed} onValueChange={setActiveWed} />
        <Checkbox style={styles.checkbox} value={activeThu} onValueChange={setActiveThu} />
        <Checkbox style={styles.checkbox} value={activeFri} onValueChange={setActiveFri} />
        <Checkbox style={styles.checkbox} value={activeSat} onValueChange={setActiveSat} />
      </View>
      {/* <View style={styles.button} >
        <Button
          title={"Get All"}
          onPress={getAllHabits}
        />
      </View> */}
      <View style={styles.button} >
        <Button
          title={"Add to State"}
          onPress={addHabitBtn}
        />
        <Button
          title={"Add to Store"}
          onPress={addToStoreBtn}
        />
      </View>
      <View style={styles.button} >
        <Button
          title={"Get State"}
          onPress={getState}
        />
        <Button
          title={"Get Store"}
          onPress={getStore}
        />
      </View>
      <View style={styles.button} >
        <Button
          title={"Clear State"}
          onPress={clearState}
        />
        <Button
          title={"Clear Store"}
          onPress={clearStore}
        />
      </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text : {
    fontSize : 40,
    marginBottom : 30
  },
  button : {
    margin:20,
    width:250
  },
  input : {
    borderWidth: 1,
    borderColor: '#000'
  }
});