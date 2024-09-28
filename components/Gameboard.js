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
  const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));
  // total points for diffferent spots
  const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));

  // name of the player
  const [playerName, setPlayerName] = useState('');

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
            color={getDiceColor(i)}
          />
        </Pressable>
      </Col>
    );
  }

  const pointsRow = [];
  for (let spot = 0; spot < MAX_SPOT; spot++) {
    pointsRow.push(
      <Col key={'pointsRow' + spot}>
        <Text key={'pointsRow' + spot}>0</Text>
      </Col>
    )
  }

  const pointsToSelectRow = [];
  for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
    pointsToSelectRow.push(
      <Col Col key={'buttonsRow' + diceButton} >
        <Pressable
          key={'buttonsRow' + diceButton}
          onPress={() => selectDicePoints(diceButton)}
        >
          <MaterialCommunityIcons
            name={'numeric-' + (diceButton + 1) + '-circle'} //numeric-1-circle...
            key={'buttonsRow' + diceButton}
            size={35}
            color={getDicePointsColor(diceButton)}
          />
        </Pressable>
      </Col >
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

  function getDicePointsColor(i) {
    return selectedDicePoints[i] ? '#38383a' : '#D87093';
  }

  const selectDicePoints = (i) => {
    let selectedPoints = [...selectDicePoints];
    let points = [...dicePointsTotal];
    selectedPoints[i] = true;
    // nbrOfDices = how many dice have been rolled with the same number of spots
    let nbrOfDices = diceSpots.reduce(
      (total, x) => (x === (i + 1) ? total + 1 : total), 0);
    // points are calculated for the number of spots corresponding to index i.
    // if the number of spots is 3 and it appears twice, the points will be 6 (2 * 3)
    points[i] = nbrOfDices * (i + 1);
    setDicePointsTotal(points);
    setSelectedDicePoints(selectedPoints);
    return points[i];
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

  function getSpotTotal(i) {
    return dicePointsTotal[i];
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
        {/* <View style={styles.pointsRowContainer}> */}
          <Container style={styles.pointsRow} >
            <Row>{pointsRow}</Row>
          </Container>
          <Container style={styles.pointsToSelectRow}>
            <Row>{pointsToSelectRow}</Row>
          </Container>
        {/* </View> */}
      </View>
      <Footer />
    </>
  )
}