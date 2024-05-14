import {
  View
} from 'react-native';
import { Styles } from './styles/Styles';

const ScreenWrapper = (props) => {
  return (
    <View style={Styles.screen_wrapper}>
      {props.children}
    </View>
  )
}

export default ScreenWrapper