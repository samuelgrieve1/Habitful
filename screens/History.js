import { View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HistoryList from './history/HistoryList';
import HistoryCalendar from './history/HistoryCalendar';

const Stack = createStackNavigator({
  screens: {
    List: HistoryList,
    Calendar: HistoryCalendar,
  },
});

export default function History() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List"
        component={List}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
      <Stack.Screen
        name="Calendar"
        component={Calendar}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
    </Stack.Navigator>
    // <View style={{flexDirection:"row", width:"100%"}}>
    //   <View style={{width:"50%"}}>
    //     <Button
    //       title="List"
    //       onPress={() => Alert.alert('Left button pressed')}
    //     />
    //   </View>
    //   <View style={{width:"50%"}}>
    //     <Button
    //       title="Calendar"
    //       onPress={() => Alert.alert('Right button pressed')}
    //     />
    //   </View>
    // </View>
  )
}