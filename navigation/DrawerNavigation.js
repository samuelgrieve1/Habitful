//import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';

import BottomTabNavigator from './BottomTabNavigator';
import Progress from '../screens/Progress';
import History from '../screens/History';
import Settings from '../screens/Settings';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return(
    <Drawer.Navigator>
      <Drawer.Screen name="Habits" component={BottomTabNavigator} />
      {/* <Drawer.Screen name="Progress" component={Progress} />
      <Drawer.Screen name="History" component={History} />
      <Drawer.Screen name="Settings" component={Settings} /> */}
    </Drawer.Navigator>
  )
}

  export default DrawerNavigator;