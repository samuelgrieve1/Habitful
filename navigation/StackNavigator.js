import { createStackNavigator } from '@react-navigation/stack';

import Habits from '../screens/Habits';
import Progress from '../screens/Progress';
import History from '../screens/History';
import Settings from '../screens/Settings';

import DrawerNavigator from './DrawerNavigation';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Habits" component={Habits} />
      <Stack.Screen name="Progress" component={Progress} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Settings" component={Settings} /> */}
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator