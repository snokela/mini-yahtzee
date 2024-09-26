import { Text, View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Footer from './Footer';
import styles from '../styles/Styles'

export default function Gameboard() {
  return (
    <>
    <Header />
    <View>
      <Text>
        Gameboard will be here...
      </Text>
    </View>
    <Footer />
    </>
  )
}