import {
  SafeAreaView,
  View,
  Text,
  Pressable
} from 'react-native';
import { Link } from 'expo-router';
import { Styles } from './Styles';

const Container = props => {
  return (
    <SafeAreaView style={Styles.wrapper}>
      <View style={Styles.top_bar}>
        <View style={Styles.top_bar_left}>
        </View>
        <View style={Styles.top_bar_middle}><Text style={Styles.page_title}>{props.pageTitle}</Text></View>
        <View style={Styles.top_bar_right}></View>
      </View>
      <View style={Styles.container}>
        {props.children}
      </View>
    </SafeAreaView>
  )
}

export default Container