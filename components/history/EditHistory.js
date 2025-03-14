import React , {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View , Button, TextInput, Pressable, useColorScheme } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Feather } from '@expo/vector-icons';
import { Styles, LightMode } from '../styles/Styles';
import { ThemeContext } from '../Contexts';
import { FlatList, TouchableOpacity } from 'react-native';
import HabitsItemHistory from './HabitsItemHistory';

export default function EditHistory({completions, completionsSorted, getCompletions, closeModal, habits, checkedOrUnchecked, addCompletedHabit, setSelectedHabitId, selectedDate, doneBtn}) {
  const { theme } = useContext(ThemeContext)
  //const [selectedDateHabits, setSelectedDateHabits] = useState(null)

  //setSelectedDateHabits(completionsSorted[selectedDate])

  useEffect(() => {
    // console.log('Habits:', habits)
    // console.log('Completions Sorted:', completionsSorted)
    // console.log(completionsSorted[selectedDate])
    console.log(completionsSorted[selectedDate] == undefined)
  }, [])

  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{width: '100%'}}>
        
        <Text style={theme == LightMode ? Styles.editDayTitleLm : Styles.editDayTitleDm}>Edit Day</Text>
        <Text style={theme == LightMode ? Styles.editDayDateLm : Styles.editDayDateDm}>{selectedDate}</Text>
        <Pressable title='Close' style={{position: 'absolute', top: 0, right: 0,}} onPress={() => closeModal()}>
          <Feather name="x" size={24} color={theme == LightMode ? 'black' : 'white'} />
        </Pressable>

        {/* NO COMPLETIONS - CALLING FROM HABITS */}
        <FlatList
          style={{width: '100%'}}
          data={habits.sort((a, b) => a.name.localeCompare(b.name))}
          renderItem={({item}) => {
            return(
              <HabitsItemHistory
                key={item.id}
                habitId={item.id}
                habitName={item.name}
                selectedDate={selectedDate}
                isCompleted={checkedOrUnchecked(item)}
                addCompletedHabit={addCompletedHabit}
                setSelectedHabitId={setSelectedHabitId}
              />
            )
          }}
          keyExtractor={item => item.id}
        />

        {/* HAS COMPLETIONS - CALLING FROM COMPLETIONS SORTED */}
        <FlatList
          style={{width: '100%'}}
          data={completionsSorted[selectedDate]}
          renderItem={({item}) => {
            return(
              <HabitsItemHistory
                key={selectedDate}
                habitName={item}
                selectedDate={selectedDate}
                isCompleted={checkedOrUnchecked(item)}
                addCompletedHabit={addCompletedHabit}
                setSelectedHabitId={setSelectedHabitId}
              />
            )
          }}
          //keyExtractor={item => item.id}
        />

        <View style={Styles.btnsSaveCancel}>
          <Pressable  style={Styles.btnSave} onPress={() => {closeModal()}}>
            <Text style={Styles.txtSave}>Done</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}