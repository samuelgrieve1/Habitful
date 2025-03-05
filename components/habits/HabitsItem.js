import { useState, useContext } from 'react';
import { Text, Pressable, View } from 'react-native';
import { Styles, LightMode } from '../styles/Styles';
import { ThemeContext, CustomColorContext } from '../Contexts';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Feather } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HabitsItem({habitId, habitName, isCompleted, addCompletedHabit, setSelectedHabitId, setModalVisibleEdit}) {
  const {theme} = useContext(ThemeContext)
  const {customColor} = useContext(CustomColorContext)
  
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
        'habitOne': 2
      }
    }
  }
  
  return (
    <>
      {/* <View style={theme == LightMode ? Styles.habit_separator_lm : Styles.habit_separator_dm} /> */}
      <View style={theme == LightMode ? Styles.habit_box_lm : Styles.habit_box_dm}>
        <View style={theme == LightMode ? Styles.habit_lm : Styles.habit_dm}>
          <View style={{marginRight: 20}}>
            <AnimatedCircularProgress
                rotation={0}
                size={50}
                width={2}
                fill={(completionData.completion['01-01-1990']['habitOne'] / habitData.amount) * 100}
                tintColor={customColor ? customColor : "#4185e7"}
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor={theme == LightMode ? 'rgba(126, 126, 126, 0.1)' : 'rgba(126, 126, 126, 0.1)'}
              >
                {
                  () => (
                    <FontAwesome6 name="volleyball" size={24} color={customColor ? customColor : "#4185e7"} />
                    // <Text style={{color: theme == LightMode ? '#4185e7' : '#4185e7', fontSize: 10, fontWeight: '600'}}>
                    //   { (completionData.completion['01-01-1990']['habitOne'] / habitData.amount) * 100 }%
                    // </Text>
                  )
                }
              </AnimatedCircularProgress>
            </View>
          <View style={Styles.habit_name_box}>
            <Text style={theme == LightMode ? Styles.habit_name_lm : Styles.habit_name_dm}>
              {habitName}
            </Text>
            <Text style={theme == LightMode ? Styles.habit_name_amount_lm : Styles.habit_name_amount_dm}>
              {completionData.completion['01-01-1990']['habitOne']} / {habitData.amount}
            </Text>
          </View>
          <View style={theme == LightMode ? Styles.habit_icon_lm : Styles.habit_icon_dm}>
            <Text style={theme == LightMode ? Styles.habit_icon_txt_lm : Styles.habit_icon_txt_dm}>
              <FontAwesome6 name="plus" size={16} color={customColor ? customColor : "#4185e7"} />
            </Text>
          </View>
        </View>
      </View>
    </>
  )
}