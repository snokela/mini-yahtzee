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

  // is dices selected or not in the game
  const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
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
        onPress={() => selectDice(i)}
        >
          <MaterialCommunityIcons
            name={board[i]}
            key={"dice" + i}
            size={50}
          // color={'#D87093'}
          color={getDiceColor(i)}
          >
          </MaterialCommunityIcons>
        </Pressable>
      </Col>
    );
  }

  function getDiceColor(i) {
    return selectedDices[i] ? '#38383a' : '#D87093';
  }

  const selectDice = (i) => {
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;  //selected/unselected/selected...
    setSelectedDices(dices);
  }

  const throwDices = () => {
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDices[i]) {
        let randomNumber = Math.floor(Math.random() * MAX_SPOT + 1);
        board[i] = 'dice-' + randomNumber;
      }
    }
    setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
  }

  return (
    <>
      <Header />
      <View style={styles.gameboardContainer}>
        <Container style={styles.diceRow}>
          <Row>{row}</Row>
        </Container>
        <Text style={styles.notifText}>Throws left: {nbrOfThrowsLeft}</Text>
        <Text style={styles.notifText}>{status}</Text>
        <Pressable
          style={styles.button}
          onPress={() => throwDices()}
        >
          <Text style={styles.buttonText}>THROW DICES</Text>
        </Pressable>
      </View>
      <Footer />
    </>
  )
}