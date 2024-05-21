import { useContext } from 'react';
import { Image, Button, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { Styles, LightMode } from '../components/styles/Styles';
import { ThemeContext } from '../components/Contexts';

import Habits from '../screens/Habits';
import Progress from '../screens/Progress';
import History from '../screens/History';
import Settings from '../screens/Settings';

// import StackNavigator from './settings/StackNavigator';

const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 36, height: 36 }}
      source={require('../assets/ninja2.png')}
    />
  );
}

export default function BottomTabNavigator() {
  const {theme} = useContext(ThemeContext)

  return (
    <Tab.Navigator
      initialRouteName="Habits"
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: theme == LightMode ? '#eee' : '#333',
        },
        headerStyle : {
          borderBottomWidth: 1,
          borderBottomColor: theme == LightMode ? '#eee' : '#333',
        },
        headerTitleAlign: 'center'
      }}
    >
      <Tab.Screen
        name="Habits"
        component={Habits}
        options={{
          tabBarActiveTintColor: '#0066ff',
          headerShown: true,
          tabBarIcon: (tintcolor) => (<Feather name="list" size={24} color={tintcolor.color} />),
          //headerTitle: (props) => <LogoTitle {...props} />,
          headerLeft: () => (
            <View style={Styles.header_left}>
              <Button
                onPress={() => alert('This is a button!')}
                title="Edit"
                color={Styles.blue}
                style={Styles.btn_edit_habits}
              />
            </View>
          ),
          headerRight: () => (
            <View style={Styles.header_right}>
              <Feather name="plus" size={24} color={theme == LightMode ? '#0066ff' : '#fff'} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={Progress}
        options={{
          tabBarActiveTintColor: '#0066ff',
          headerShown: true,
          tabBarIcon: (tintcolor) => (<Feather name="bar-chart" size={24} color={tintcolor.color} />)
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarActiveTintColor: '#0066ff',
          headerShown: true,
          tabBarIcon: (tintcolor) => (<Feather name="clock" size={24} color={tintcolor.color} />)
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarActiveTintColor: '#0066ff',
          headerShown: true,
          tabBarIcon: (tintcolor) => (<Feather name="settings" size={24} color={tintcolor.color} />)
        }}
      />
    </Tab.Navigator>
  );
}