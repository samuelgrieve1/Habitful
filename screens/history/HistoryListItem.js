import { ScrollView, View, Text, RefreshControl, Pressable } from 'react-native';
import { useContext, useState } from 'react';
import { Styles, LightMode, DarkMode } from '../../components/styles/Styles';
import { ThemeContext } from '../../components/Contexts';
import { Feather } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import { format, parseISO } from 'date-fns';

export default function HistoryListItem({date, i, completionsSorted, setModalVisibleEditHistory, setSelectedDate}) {
  const {theme} = useContext(ThemeContext)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const showHide = () => {
    setIsCollapsed(!isCollapsed)
    console.log('showHide')
  }

  return (
    <View key={i} style={theme == LightMode ? Styles.dateBoxLm : Styles.dateBoxDm}>
      <Pressable style={Styles.dateBoxHeader} onPress={() => {showHide()}}>
      {/* <Pressable onPress={() => {setModalVisibleEditHistory(true); setSelectedDate(date);}} style={theme == LightMode ? Styles.editHistoryIconContainerLm : Styles.editHistoryIconContainerDm}> */}
        <Feather name={isCollapsed == true ? 'chevron-down' : 'chevron-up'} size={18} color='white' style={theme == LightMode ? Styles.downHistoryIconLm : Styles.downHistoryIconDm} />
        <Text style={theme == LightMode ? Styles.dateTitleLm : Styles.dateTitleDm}>{format(date, 'MMM dd, yyyy (EEEE)')}</Text>
      </Pressable>
      <Collapsible collapsed={isCollapsed}>
        <View style={Styles.historyCompletionsBox}>
        {completionsSorted[date].map((habit, i) => (
          <Text style={theme == LightMode ? Styles.historyHabitNameLm : Styles.historyHabitNameDm} key={i}>
            <Feather name="check" size={16} color="#4a8b47" /> {habit}
          </Text>
        ))}
        <Pressable style={theme == LightMode ? Styles.editHistoryIconContainerLm : Styles.editHistoryIconContainerDm} onPress={() => {setModalVisibleEditHistory(true); setSelectedDate(date);}}>
          <Text style={theme == LightMode ? Styles.editHistoryIconLm : Styles.editHistoryIconDm}>Edit</Text>
        </Pressable>
        </View>
      </Collapsible>
    </View>
  )
}