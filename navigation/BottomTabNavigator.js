import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import Habits from '../screens/Habits';
import Progress from '../screens/Progress';
import History from '../screens/History';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
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
        component={History}
        options={{
          tabBarActiveTintColor: '#0066ff',
          headerShown: false,
          tabBarIcon: (tintcolor) => (<Feather name="clock" size={24} color={tintcolor.color} />)
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Settings}
        options={{
          tabBarActiveTintColor: '#0066ff',
          headerShown: false,
          tabBarIcon: (tintcolor) => (<Feather name="user" size={24} color={tintcolor.color} />)
        }}
      />
    </Tab.Navigator>
  );
}