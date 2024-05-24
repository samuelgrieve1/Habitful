import { createBottomTabNavigator, createStackNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Habits from './Habits';
import Progress from './Progress';
import HabitHistory from './HabitHistory';
import AppSettings from './AppSettings';
import Styles from './styles';

const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator()
// const AddHabitStack = () => {
   
//     return (
//       <Stack.Navigator initialRouteName="AddHabit">
//          <Stack.Screen name="AddHabit" component={AddHabit} />
//          // Any additional screens located inside the stack of the tab Home
//       </Stack.Navigator>
//     )
// }

export default function BottomTabNav() {
  return (
    <Tab.Navigator style={Styles.bottom_nav} initialRouteName="Habits">
      <Tab.Screen
        name="Habits"
        component={Habits}
        options={{
          tabBarActiveTintColor: '#4185e7',
          headerShown: false,
          tabBarIcon: (tintcolor) => (<Feather name="list" size={24} color={tintcolor.color} />),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={Progress}
        options={{
          tabBarActiveTintColor: '#4185e7',
          headerShown: false,
          tabBarIcon: (tintcolor) => (<Feather name="bar-chart" size={24} color={tintcolor.color} />)
        }}
      />
      <Tab.Screen
        name="History"
        component={HabitHistory}
        options={{
          tabBarActiveTintColor: '#4185e7',
          headerShown: false,
          tabBarIcon: (tintcolor) => (<Feather name="clock" size={24} color={tintcolor.color} />)
        }}
      />
      <Tab.Screen
        name="Profile"
        component={AppSettings}
        options={{
          tabBarActiveTintColor: '#4185e7',
          headerShown: false,
          tabBarIcon: (tintcolor) => (<Feather name="user" size={24} color={tintcolor.color} />)
        }}
      />
    </Tab.Navigator>
  );
}