import { Pressable, Text, View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Footer from './Footer';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from '../constants/Game';
import { Container, Row, Col } from 'react-native-flex-grid';
import styles from '../styles/Styles'

let board = [];

export default function Gameboard() {

  const row = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <Pressable
          key={"row" + i}
          // onPress={() => selectDice(i)}
        >
        <MaterialCommunityIcons
          name={board[i]}
          key={"row" + i}
          size={50}
          // color={getDiceColor(i)}
        >
        </MaterialCommunityIcons>
      </Pressable>
    );
  }

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