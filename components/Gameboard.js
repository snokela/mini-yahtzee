import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Footer from './Footer';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS, SCOREBOARD_KEY } from '../constants/Game';
import { Container, Row, Col } from 'react-native-flex-grid';
import styles from '../styles/Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';

// game board status
let board = [];

export default function Gameboard({ navigation, route }) {

  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);    //three throws for each turn --> there are a total of 18 throws in one game
  const [status, setStatus] = useState('Throw dices.');
  const [gameEndStatus, setGameEndStatus] = useState(false);
  // is dices selected or not in the game
  const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
  // dice spots e.g [3, 5, 2, 1, 6] or [3, 3, 3, 3, 3] /throw
  const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
  // if dice points are selected or not for spots
  const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));
  // total points for diffferent spots
  const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));
  const [rounds, setRounds] = useState(1);
  const [totalPoints, setTotalPoints] = useState(0);
  // initial state to show the icon
  const [showIcon, setShowIcon] = useState(true);
  const [playerName, setPlayerName] = useState('');

  // use useEffect to set playername
  useEffect(() => {
    if (playerName === '' && route.params?.player) {
      setPlayerName(route.params.player);
    }
  }, [])

  // use useEffect to calclute points and reduce rounds
  useEffect(() => {
    const totalPoints = dicePointsTotal.reduce((prevPoints, currentPoints) => prevPoints + currentPoints, 0)
    setTotalPoints(totalPoints)
  }, [dicePointsTotal, nbrOfThrowsLeft, selectedDicePoints]);

  // use useEffect to monitor rounds
  useEffect(() => {
    if (rounds === 7) {
      console.log('rounds = 7 > Game Over!');
      setGameEndStatus(true);
      setStatus('Game Over. All points selected.')
    }
  }, [rounds]);

  // Use useEffect to monitor gameEnd status
  useEffect(() => {
    const saveGameResult = async () => {
      console.log('ollaan gameendstatus useEffectissä eli gameendstatus: ' + gameEndStatus);
      if (gameEndStatus) {
        const currentDate = new Date().toLocaleDateString();
        const now = new Date();
        const currentTime = now.getHours() + ':' + now.getMinutes();

        // finalpoints calculation
        const finalPoints = calculatePoints();
        console.log('finalPoints on: ' +finalPoints);
        setTotalPoints(finalPoints);

        // tallennetaan pelin tiedot asyncstorageen eli kutsutaan esim saveGameResult funktiota
        const scores = { name: playerName, date: currentDate, time: currentTime, points: finalPoints };

        // save to asyncstorage
        try {
          const storedData = await getData();
          if (storedData === null) {
            await storeData([scores]); //saved scores as a new array
          } else {
            const updatedStoredData = [...storedData, scores];
            await storeData(updatedStoredData);
          }
        } catch (e) {
          console.log('storageen tallennus ei toimi' +e);
        }
      }
    }
    saveGameResult();
  }, [gameEndStatus]);

  const calculatePoints = () => {
    if (totalPoints >= BONUS_POINTS_LIMIT) {
      return totalPoints + BONUS_POINTS
    }
    return totalPoints;
  };

  // get earlier data from asyncstorage
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('datan haku ei onnistu' +e);
    }
  };

  // save scoredata to asyncstorage
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
    } catch (e) {
      console.log('datan tallennus ei onnistu:' +e);
    }
  };

  const row = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <Col key={"dice" + i}>
        <Pressable
          key={"dice" + i}
          onPress={() => {
            if (nbrOfThrowsLeft === 3) {
              setStatus('You have to throw dices first.')
            } else {
              selectDice(i)
            }
          }}
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
        <Text key={'pointsRow' + spot}>{getSpotTotal(spot)}</Text>
      </Col>
    )
  }

  // Buttons for selecting points for each dice face value
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
    // Check if there are no throws left OR if all dice have the same value
    const allSameSpots = diceSpots.every(spot => spot === diceSpots[0])
    if ((nbrOfThrowsLeft === 0) || (nbrOfThrowsLeft < 3 && allSameSpots)) {
      // let selected = [...selectedDices];
      let selectedPoints = [...selectedDicePoints];
      let points = [...dicePointsTotal];

      if (!selectedPoints[i]) {
        selectedPoints[i] = true;
        // Count how many dice match the selected face value
        let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
        // // Calculate points for the selected face value (spots 3 appears twice => points (2 * 3))
        points[i] = nbrOfDices * (i + 1);
        setDicePointsTotal(points);
        setSelectedDicePoints(selectedPoints);

        // Reset throws and move to the next round
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        setRounds(prev => prev + 1);
        setStatus('Throw dices');

        // reset dice selections after three throw
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));

        return points[i];

      } else {
        setStatus('You already selected points for ' + (i + 1) + '.');
      }

    } else {
      setStatus('Throw ' + NBR_OF_THROWS + ' times before setting points.')
    }
  }

  const throwDices = () => {
    console.log("kierrokset: " + rounds + "ja gameEndStatus: " + gameEndStatus);
    // if game has ended, initialize a new game
    if (gameEndStatus) {
      initializeGame();
      return
    }

    setShowIcon(false);
    // update dice results
    let spots = [...diceSpots];
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDices[i]) {
        let randomNumber = Math.floor(Math.random() * MAX_SPOT + 1);
        spots[i] = randomNumber;
        board[i] = 'dice-' + randomNumber;
      }
    }
    setDiceSpots(spots);

    // calculate the next nbr of throw
    setNbrOfThrowsLeft(prev => {
      const updatedNbrOfThrowsLeft = nbrOfThrowsLeft - 1;
      // update status based on nbrofthrowsleft
      if (updatedNbrOfThrowsLeft === 0) {
        setStatus('Select points.');
      } else {
        setStatus('Select and throw dices again.')
      }
      return updatedNbrOfThrowsLeft;
    })
  }

  const initializeGame = () => {
    setNbrOfThrowsLeft(NBR_OF_THROWS);
    setRounds(1);
    setTotalPoints(0);
    setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
    setDicePointsTotal(new Array(MAX_SPOT).fill(0));
    setStatus('Throw dices.');
    setShowIcon(true);
    setGameEndStatus(false);
  }

  function getSpotTotal(i) {
    return dicePointsTotal[i];
  }

  return (
    <>
      <Header />
      <View style={styles.gameboardContainer}>
        {showIcon ? (
          <MaterialCommunityIcons
            name='dice-multiple'
            size={90}
            color='#D87093'
          />
        ) : (
          <Container style={styles.diceRow}>
            <Row>{row}</Row>
          </Container>
        )}
        <Text style={styles.notifText}>Throws left: {nbrOfThrowsLeft}</Text>
        <Text style={styles.statusNotifText}>{status}</Text>
        <Pressable
          style={styles.button}
          onPress={() => throwDices()}
          disabled={(nbrOfThrowsLeft === 0 && !gameEndStatus)}
        >
          <Text style={styles.buttonText}>THROW DICES</Text>
        </Pressable>
        {/* <Text>kierrokset : {rounds}</Text>
        <Text>heittoja jäljellä: {nbrOfThrowsLeft}</Text> */}
        <Text style={styles.totalPointsText}>Total: {totalPoints}</Text>
        {
          ((totalPoints >= BONUS_POINTS_LIMIT)
          ) ? (
            <Text> Congrats! Bonus points {BONUS_POINTS} added.</Text>
          ) : (
            <Text>You are {BONUS_POINTS_LIMIT - totalPoints} points away from bonus.</Text>
          )
        }
        {/* <View style={styles.pointsRowContainer}> */}
        <Container style={styles.pointsRow} >
          <Row>{pointsRow}</Row>
        </Container>
        <Container style={styles.pointsToSelectRow}>
          <Row>{pointsToSelectRow}</Row>
        </Container>
        {/* </View> */}
        <Text style={styles.notifTextPlayer}>Player: {playerName}</Text>
      </View >
      <Footer />
    </>
  )
}
