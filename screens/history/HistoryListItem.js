import { ScrollView, View, Text, RefreshControl, Pressable } from 'react-native';
import { useContext, useState } from 'react';
import { Styles, LightMode, DarkMode } from '../../components/styles/Styles';
import { ThemeContext, CustomColorContext } from '../../components/Contexts';
import { Feather } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import { format, parseISO } from 'date-fns';

export default function HistoryListItem({date, i, completionsSorted, setModalVisibleEditHistory, setSelectedDate}) {
  const {theme} = useContext(ThemeContext)
  const {customColor} = useContext(CustomColorContext)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const showHide = () => {
    setIsCollapsed(!isCollapsed)
    console.log('showHide')
  }

  return (
    <View key={i} style={[Styles.dateBox, theme == DarkMode && Styles.dateBoxDm]}>
      <Pressable style={Styles.dateBoxHeader} onPress={() => {showHide()}}>
      {/* <Pressable onPress={() => {setModalVisibleEditHistory(true); setSelectedDate(date);}} style={theme == LightMode ? Styles.editHistoryIconContainerLm : Styles.editHistoryIconContainerDm}> */}
        <Feather name={isCollapsed == true ? 'chevron-down' : 'chevron-up'} size={18} color='white' style={[Styles.downHistoryIcon, theme == DarkMode && Styles.downHistoryIconDm]} />
        <Text style={[Styles.dateTitle, theme == DarkMode && Styles.dateTitleDm]}>{format(date, 'MMM dd, yyyy (EEEE)')}</Text>
      </Pressable>
      <Collapsible collapsed={isCollapsed}>
        <View style={Styles.historyCompletionsBox}>
        {completionsSorted[date].map((habit, i) => (
          <Text style={[Styles.historyHabitName, theme == DarkMode && Styles.historyHabitNameDm]} key={i}>
            <Feather name="check" size={16} color="#4a8b47" /> {habit}
          </Text>
        ))}
        <Pressable style={[Styles.editHistoryBtnContainer, theme == DarkMode && Styles.editHistoryBtnContainerDm]} onPress={() => {setModalVisibleEditHistory(true); setSelectedDate(date);}}>
          <Text style={[Styles.editHistoryBtn, customColor && {color: customColor}]}>Edit</Text>
        </Pressable>
        </View>
      </Collapsible>
    </View>
  )
}