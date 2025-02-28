import { useState, useContext } from 'react';
import { Text, Pressable, View } from 'react-native';
import { Styles, LightMode } from '../styles/Styles';
import { ThemeContext } from '../Contexts';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Feather } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function HabitsItem({habitId, habitName, isCompleted, addCompletedHabit, setSelectedHabitId, setModalVisibleEdit}) {
  const {theme} = useContext(ThemeContext)
  const [isCompletedLocal, setIsCompletedLocal] = useState(isCompleted)
  const checkUncheck = () => {
    setIsCompletedLocal(prev => !prev)
    addCompletedHabit(habitId, habitName, isCompletedLocal)
  }

  const getHabitToEdit = () => {
    console.log(habitId)
    setSelectedHabitId(habitId)
    setModalVisibleEdit(true)
  }

  const habitData = {
    name: 'HabitOne',
    frequency: {
      Type: 'daily',
      Days: ['sun', 'mon', 'tue'],
    },
    goal: 'amount',
    amount: 5
  }

  const completionData = {
    completion: {
      '01-01-1990': {
        'habitOne': 3
      }
    }
  }
  
  return (
    <>
      <View style={theme == LightMode ? Styles.habit_box_lm : Styles.habit_box_dm}>
        <View style={theme == LightMode ? Styles.habit_lm : Styles.habit_dm}>
        <View style={{width:40, height:40, backgroundColor:'white', marginRight: 10, borderRadius: 20, borderWidth: 1, borderColor: '#999'}}></View>
          <View style={Styles.habit_name_box}>
            <Text style={theme == LightMode ? Styles.habit_name_lm : Styles.habit_name_dm}>{habitName}</Text>
            <Text style={theme == LightMode ? Styles.habit_name_amount_lm : Styles.habit_name_amount_dm}>
              {completionData.completion['01-01-1990']['habitOne']} / {habitData.amount}
            </Text>
          </View>
          <AnimatedCircularProgress
            rotation={0}
            size={40}
            width={2}
            fill={(completionData.completion['01-01-1990']['habitOne'] / habitData.amount) * 100}
            tintColor="#4185e7"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#000"
          >
            {
              () => (
                <FontAwesome6 name="plus" size={16} color="#4185e7" />
                // <Text style={{color:'white'}}>
                //   { (completionData.completion['01-01-1990']['habitOne'] / habitData.amount) * 100 }%
                // </Text>
              )
            }
          </AnimatedCircularProgress>
        </View>
      </View>
    </>
  )
}