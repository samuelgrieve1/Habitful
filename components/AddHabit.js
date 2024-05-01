import React , {useEffect, useState} from 'react';
import { StyleSheet, Text, View , Button, TextInput } from 'react-native';
import Checkbox from 'expo-checkbox';
import { app, db, getFirestore, collection, addDoc } from '../firebase/index';

export default function AddHabit({navigation}) {
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
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>{habits}</Text> */}
      <View style={styles.button} >
        <Text>Name</Text><TextInput onChangeText={(text) => setHabitName(text)} style={styles.input}/>
      </View>
      <View>
        <Text>Sun</Text><Checkbox style={styles.checkbox} value={activeSun} onValueChange={setActiveSun} />
        <Text>Mon</Text><Checkbox style={styles.checkbox} value={activeMon} onValueChange={setActiveMon} />
        <Text>Tue</Text><Checkbox style={styles.checkbox} value={activeTue} onValueChange={setActiveTue} />
        <Text>Wed</Text><Checkbox style={styles.checkbox} value={activeWed} onValueChange={setActiveWed} />
        <Text>Thu</Text><Checkbox style={styles.checkbox} value={activeThu} onValueChange={setActiveThu} />
        <Text>Fri</Text><Checkbox style={styles.checkbox} value={activeFri} onValueChange={setActiveFri} />
        <Text>Sat</Text><Checkbox style={styles.checkbox} value={activeSat} onValueChange={setActiveSat} />
      </View>
      {/* <View style={styles.button} >
        <Button
          title={"Get All"}
          onPress={getAllHabits}
        />
      </View> */}
      <View style={styles.button} >
        <Button
          title={"Save"}
          onPress={() => {addHabitBtn(); navigation.goBack()}}
        />
        <Button onPress={() => navigation.goBack()} title="Cancel" />
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