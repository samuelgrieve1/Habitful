import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Habits from './Habits';
import Progress from './Progress';
import HabitHistory from './HabitHistory';
import AppSettings from './AppSettings';
import { Styles } from './Styles';

const Tab = createBottomTabNavigator();

export default function BottomTabNav() {
  return (
    <Tab.Navigator
      initialRouteName="Habits"
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#eee',
          backgroundColor: 'fff',
        }
      }}
    >
      <Tab.Screen
        name="Habits"
        component={Habits}
        options={{
          tabBarActiveTintColor: '#0066ff',
          headerShown: false,
          tabBarIcon: (tintcolor) => (<Feather name="home" size={24} color={tintcolor.color} />),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={Progress}
        options={{
          tabBarActiveTintColor: '#0066ff',
          headerShown: false,
          tabBarIcon: (tintcolor) => (<Feather name="bar-chart" size={24} color={tintcolor.color} />)
        }}
      />
      <Tab.Screen
        name="History"
        component={HabitHistory}
        options={{
          tabBarActiveTintColor: '#0066ff',
          headerShown: false,
          tabBarIcon: (tintcolor) => (<Feather name="clock" size={24} color={tintcolor.color} />)
        }}
      />
      <Tab.Screen
        name="Profile"
        component={AppSettings}
        options={{
          tabBarActiveTintColor: '#0066ff',
          headerShown: false,
          tabBarIcon: (tintcolor) => (<Feather name="user" size={24} color={tintcolor.color} />)
        }}
      />
    </Tab.Navigator>
  );
}