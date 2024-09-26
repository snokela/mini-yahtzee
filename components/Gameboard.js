import { useState } from 'react';
import { Pressable, Text, View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Footer from './Footer';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from '../constants/Game';
import { Container, Row, Col } from 'react-native-flex-grid';
import styles from '../styles/Styles'

let board = [];

export default function Gameboard() {

  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);    //three throws for each turn --> there are a total of 18 throws in one game
  const [status, setStatus] = useState('Throw dices');
  const [gameEndStatus, setGameEndStatus] = useState('false');

  // if dices are selected or not
  const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));   // is dices selected or not in the game
  // dice spots
  const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
  // if dice points are selected on not for spots
  const [selecteDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));
  // total points for diffferent spots
  const [DicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));

  // name of the player
  const [player, setPlayerName] = useState('');

  const row = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <Col key={"dice" + i}>
        <Pressable
          key={"dice" + i}
        // onPress={() => selectDice(i)}
        >
          <MaterialCommunityIcons
            // name={board[i]}
            name={'dice-4'}
            key={"dice" + i}
            size={50}
            color={'#D87093'}
          // color={getDiceColor(i)}
          >
          </MaterialCommunityIcons>
        </Pressable>
      </Col>
    );
  }

  return (
    <>
      <Header />
      <View>
        <Container>
          <Row>{row}</Row>
        </Container>
      </View>
      <Footer />
    </>
  )
}