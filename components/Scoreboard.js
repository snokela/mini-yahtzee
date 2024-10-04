import { Button, Pressable, Text, View } from 'react-native'
import styles from '../styles/Styles'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Footer from './Footer';
import { DataTable } from 'react-native-paper';
import { SCOREBOARD_KEY, MAX_NBR_OF_SCOREBOARD_ROWS } from '../constants/Game';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Scoreboard() {

  const [scores, setScores] = useState([]);

  // https://reactnavigation.org/docs/function-after-focusing-screen/
  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  )

  // remove scoredata from asyncstorage
  const removeScoredata = async () => {
    try {
      if (scores.length > 0) {
        await AsyncStorage.removeItem(SCOREBOARD_KEY);
        console.log('Data removed from AsyncStorage');
      }
    } catch (e) {
      console.log(e);
    }
    setScores([]);
  }

  // get data from asyncstorage
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
      const storedScores = jsonValue != null ? JSON.parse(jsonValue) : [];

      console.log("Stored Scores: ", storedScores);

      // if ther is storedData in async. > sort that and take 5 biggest points
      if (storedScores) {
        const sortedScores = [...storedScores].sort((a, b) => b.points - a.points).slice(0, MAX_NBR_OF_SCOREBOARD_ROWS)
        setScores(sortedScores)
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header />
      <View style={styles.scoreboardContainer}>
        <View>
          <MaterialCommunityIcons
            name='trophy-variant'
            size={60}
            color='#D87093'
          />
          <Text style={styles.totalPointsText}>Top Five</Text>
        </View>
        {
          !scores.length ?
            (
              <Text style={styles.boldText}>Scoreboard is empty</Text>
            ) : (
              renderDataTable(scores)
            )
        }
        <Pressable style={styles.clearButton} onPress={removeScoredata}>
          <Text>CLEAR SCOREBOARD</Text>
        </Pressable>
      </View>
      <Footer />
    </>
  )
}

const renderDataTable = (scores) => {
  return (
    <DataTable>
      {scores.map((item, index) => (
        <DataTable.Row key={index + 1}>
          <DataTable.Cell numeric style={styles.rankCell}>
            <Text>{index + 1}.</Text>
          </DataTable.Cell>
          <DataTable.Cell style={styles.nameCell}>
            <Text>{item.name}</Text>
          </DataTable.Cell>
          <DataTable.Cell numeric style={styles.dateCell}>
            <Text>{item.date}</Text>
          </DataTable.Cell>
          <DataTable.Cell numeric style={styles.timeCell}>
            <Text>{item.time}</Text>
          </DataTable.Cell>
          <DataTable.Cell numeric style={styles.pointCell}>
            <Text style={styles.boldText}>{item.points} pts</Text>
          </DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  )
}
