import { ScrollView, View, Text, RefreshControl, Pressable } from 'react-native';
import { useContext, useState } from 'react';
import { Styles, LightMode, DarkMode } from '../../components/styles/Styles';
import { ThemeContext } from '../../components/Contexts';
import { Feather } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import { format, parseISO } from 'date-fns';
import HistoryListItem from './HistoryListItem';

export default function HistoryList({ refreshing, onRefresh, historyView, completionsSorted, setModalVisibleEditHistory, setSelectedDate }) {
  const {theme} = useContext(ThemeContext)

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      {historyView == 'listview' &&
        <View style={Styles.listViewContainer}>
          {completionsSorted && Object.keys(completionsSorted).map((date, i) => (

            <HistoryListItem
              key={i}
              date={date}
              i={i}
              completionsSorted={completionsSorted}
              setModalVisibleEditHistory={setModalVisibleEditHistory}
              setSelectedDate={setSelectedDate}
            />

          ))}
        </View>
      }
    </ScrollView>
  )
}