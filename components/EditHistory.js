import React , {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View , Button, TextInput, Pressable, useColorScheme } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Feather } from '@expo/vector-icons';
import { Styles, LightMode } from './styles/Styles';
import { ThemeContext } from './Contexts';
import { FlatList, TouchableOpacity } from 'react-native';
import HabitsItemHistory from './HabitsItemHistory';

export default function EditHistory({completions, getCompletions, closeModal, habits, checkedOrUnchecked, addCompletedHabit, setSelectedHabitId, selectedDate, doneBtn}) {
  const { theme } = useContext(ThemeContext)

  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{width: '100%'}}>
        
        <Text style={theme == LightMode ? Styles.editDayTitleLm : Styles.editDayTitleDm}>Edit Day</Text>
        <Text style={theme == LightMode ? Styles.editDayDateLm : Styles.editDayDateDm}>{selectedDate}</Text>
        <Pressable title='Close' style={{position: 'absolute', top: 0, right: 0,}} onPress={() => closeModal()}>
          <Feather name="x" size={24} color={theme == LightMode ? 'black' : 'white'} />
        </Pressable>

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

        <View style={Styles.btns_save_cancel}>
          <Pressable  style={Styles.btn_save} onPress={() => {closeModal()}}>
            <Text style={Styles.txt_save}>Done</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}