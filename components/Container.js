import {
  SafeAreaView,
  View,
  Text,
  Pressable
} from 'react-native';
import { Link } from 'expo-router';
import Styles from './Styles';

const Container = props => {
  return (
    <SafeAreaView style={Styles.wrapper}>
      <View style={Styles.top_bar}>
        <Text style={Styles.page_title}>{props.pageTitle}</Text>
        {/* <Link href="/other" asChild>
          <Pressable>
            <Text>Home</Text>
          </Pressable>
        </Link> */}
      </View>
      <View style={Styles.container}>
        {props.children}
      </View>
    </SafeAreaView>
  )
}

export default Container