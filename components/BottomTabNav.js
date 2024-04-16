import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import Habits from './Habits';
import Progress from './Progress';
import HabitHistory from './HabitHistory';
import AppSettings from './AppSettings';
import AddHabit from './AddHabit';
import Styles from './Styles';

const Tab = createBottomTabNavigator();

export default function BottomTabNav() {
  return (
    <Tab.Navigator style={Styles.bottom_nav} initialRouteName="Habits">
      <Tab.Screen
        name="Habits"
        component={Habits}
        options={{
          tabBarActiveTintColor: '#0066ff',
          headerShown: false,
          tabBarIcon: (tintcolor) => (<Entypo name="list" size={24} color={tintcolor.color} />),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={Progress}
        options={{
          tabBarActiveTintColor: '#0066ff',
          headerShown: false,
          tabBarIcon: (tintcolor) => (<Entypo name="bar-graph" size={24} color={tintcolor.color} />)
        }}
      />
      <Tab.Screen
        name="Add Habit"
        component={AddHabit}
        options={{
          headerShown: false,
          tabBarIcon: () => (<Entypo name="plus" size={24} color="black" />)
        }}
      />
      <Tab.Screen
        name="History"
        component={HabitHistory}
        options={{
          tabBarActiveTintColor: '#0066ff',
          headerShown: false,
          tabBarIcon: (tintcolor) => (<Entypo name="time-slot" size={24} color={tintcolor.color} />)
        }}
      />
      <Tab.Screen
        name="Settings"
        component={AppSettings}
        options={{
          tabBarActiveTintColor: '#0066ff',
          headerShown: false,
          tabBarIcon: (tintcolor) => (<Entypo name="user" size={24} color={tintcolor.color} />)
        }}
      />
    </Tab.Navigator>
  );
}