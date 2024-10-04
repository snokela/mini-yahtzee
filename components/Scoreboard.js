import { Text, View } from 'react-native'
import styles from '../styles/Styles'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Footer from './Footer';
import { DataTable } from 'react-native-paper';
import { SCOREBOARD_KEY,  MAX_NBR_OF_SCOREBOARD_ROWS} from '../constants/Game';

const scores = [
  // { name: 'Kalle', date: '6.12.2023', time: '12.15', points: 120 },
  // { name: 'Matti', date: '6.12.2023', time: '12.15', points: 75 },
  // { name: 'Heli', date: '6.12.2023', time: '12.15', points: 55 },
  // { name: 'Ritva', date: '6.12.2023', time: '12.15', points: 40 },
  // { name: 'Heli', date: '6.12.2023', time: '12.15', points: 35 },
]

export default function Scoreboard() {

  // LISÄÄ TÄHÄN useFOCUSEffec esim renderöimään aina kun screeni avataan uudelleen!
  // https://reactnavigation.org/docs/function-after-focusing-screen/

    // get earlier data from asyncstorage
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        console.log(e);
      }
    };

  // For sorting scoreboard data according to number of points you can use sort()
// function: HUOM! MUISTA UUSI taulukko const järjestetty = [...scores]

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
