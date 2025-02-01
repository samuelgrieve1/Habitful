import React , {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View , Button, TextInput, Pressable, useColorScheme } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Feather } from '@expo/vector-icons';
import { Styles, LightMode } from './styles/Styles';
import { ThemeContext } from './Contexts';
import { FlatList, TouchableOpacity } from 'react-native';
import HabitsItem from '../components/HabitsItem';

export default function EditHistory({completions, getCompletions, closeModal, habits}) {
  const { theme } = useContext(ThemeContext)

  return (
    <View>
      <Text style={theme == LightMode ? Styles.page_title_add_habit_lm : Styles.page_title_add_habit_dm}>Edit Day</Text>
      <Pressable title='Close' style={{position: 'absolute', top: 0, right: 0,}} onPress={() => closeModal()}>
        <Feather name="x" size={24} color={theme == LightMode ? 'black' : 'white'} />
      </Pressable>
    </View>
  );
}