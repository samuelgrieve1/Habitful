import { Text, Pressable, View } from 'react-native';
import Container from './Container';
import Styles from './Styles';
import { useState, useEffect } from 'react';
import { db, doc, collection, getDocs, updateDoc } from '../firebase/index';
import HabitsItem from './HabitsItem';

export default function Habits() {
  const [habits, setHabits] = useState([])
  const [date, setDate] = useState()

  // GET HABITS FROM DB AND ADD TO STATE
  const getHabits = async () => {
    const querySnapshot = await getDocs(collection(db, "habits"))
    setHabits(
      querySnapshot.docs.map((doc)=>({
        ...doc.data(),
        id: doc.id
      }))
    )
  }

  // ADD COMPLETED HABIT TO STATE
  // const addCompletedHabit = async() => {
  //   console.log(habitId)
  //   // await updateDoc(doc(db, "Habits", habit.id),{
  //   //   completed: arrayUnion("poop")
  //   // })
  // }

  useEffect (() => {
    getHabits()
    setDate(new Date().toDateString())
  }, [])

  return (
    <Container pageTitle='H'>
      <View style={Styles.habits_day}>
        <Text style={Styles.habits_day_title}>Today</Text>
        <Text style={Styles.habits_day_title_sub}>{date}</Text>
      </View>
      {habits.map(function(habit) {
        return(
        <HabitsItem
          key={habit.id}
          habitId={habit.id}
          habitName={habit.name}
          date={date}
        />)
      })}  
      <Pressable style={Styles.add_habit_btn}>
        <Text style={Styles.add_habit_txt}>Add H</Text>
      </Pressable>
    </Container>
  )
}