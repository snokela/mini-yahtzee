import { Text, View } from 'react-native'
import styles from '../styles/Styles'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Footer from './Footer';

export default function Scoreboard() {
  return (
    <>
    <Header />
      <View>
        <Text>
          Scoreboard will be here...
        </Text>
      </View>
      <Footer />
    </>
  )
}