import React , {useEffect, useState} from 'react';
import { StyleSheet, Text, View , Button, TextInput, Pressable } from 'react-native';
import Checkbox from 'expo-checkbox';
import { app, db, getFirestore, collection, addDoc } from '../firebase/index';
import Styles from './Styles';

export default function AddHabit({getHabits, closeModal}) {
  const [habitName, setHabitName] = useState('')
  const [activeSun, setActiveSun] = useState(false)
  const [activeMon, setActiveMon] = useState(false)
  const [activeTue, setActiveTue] = useState(false)
  const [activeWed, setActiveWed] = useState(false)
  const [activeThu, setActiveThu] = useState(false)
  const [activeFri, setActiveFri] = useState(false)
  const [activeSat, setActiveSat] = useState(false)

  const addHabitBtn = async () => {
    try {
      const docRef = await addDoc(collection(db, "habits"), {
        name: habitName,
        sun: activeSun,
        mon: activeMon,
        tue: activeTue,
        wed: activeWed,
        thu: activeThu,
        fri: activeFri,
        sat: activeSat,
        completed: []
      })
      console.log("Document written with ID: ", docRef.id)
      getHabits()
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>{habits}</Text> */}
      <View>
        <Text>Name</Text><TextInput onChangeText={(text) => setHabitName(text)} style={styles.input}/>
      </View>
      <View>
        <Text>Frequency</Text>
      </View>
      <View style={styles.checkbox_row}>
        <Checkbox style={styles.checkbox} value={activeSun} onValueChange={setActiveSun} /><Text style={styles.day_name}>Sun</Text>
        {/* <Checkbox style={styles.checkbox} value={activeMon} onValueChange={setActiveMon} /><Text>Mon</Text>
        <Checkbox style={styles.checkbox} value={activeTue} onValueChange={setActiveTue} /><Text>Tue</Text>
        <Checkbox style={styles.checkbox} value={activeWed} onValueChange={setActiveWed} /><Text>Wed</Text>
        <Checkbox style={styles.checkbox} value={activeThu} onValueChange={setActiveThu} /><Text>Thu</Text>
        <Checkbox style={styles.checkbox} value={activeFri} onValueChange={setActiveFri} /><Text>Fri</Text>
        <Checkbox style={styles.checkbox} value={activeSat} onValueChange={setActiveSat} /><Text>Sat</Text> */}
      </View>
      <View>
        <Pressable style={Styles.add_habit_btn} onPress={() => {addHabitBtn(); closeModal()}}>
          <Text style={Styles.add_habit_txt}>Save</Text>
        </Pressable>
        <Pressable style={Styles.add_habit_btn} onPress={() => closeModal()}>
          <Text style={Styles.add_habit_txt}>Cancel</Text>
        </Pressable>
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
    marginBottom : 30,
  },
  input : {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    width: '100%',
    height: 30,
  },
  checkbox_row: {
    flex: 1
  },
  day_name: {
    flexDirection: 'row',
    width: 120,
    height: 20,
  },
  checkbox: {
    flexDirection: 'row',
    borderCurve: 'circular',
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    backgroundColor: '#fff'
  },
});