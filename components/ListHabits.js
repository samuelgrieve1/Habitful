import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export default function ListHabits() {
  const [habits, setHabits] = useState([])

  useEffect(() => {
    const getStore = async () => {
      try {
        let habit =  await AsyncStorage.getItem('habits')
        setHabits(JSON.parse(habit))
      } catch(e) {
        console.log(e)
      }
    }
  }, [])
  
  return (
    <>
      {habits.map(function(data) {
        debugger
        return (
          {data}
        )
      })}
    </>
  )
}