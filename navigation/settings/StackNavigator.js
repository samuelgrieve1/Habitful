import { createStackNavigator } from '@react-navigation/stack';

import Account from '../../screens/settings/Account';
import Feedback from '../../screens/settings/Feedback';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={Account}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Feedback"
        component={Feedback}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator