import { Text, View } from 'react-native'
import styles from '../styles/Styles'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Footer from './Footer';
import { DataTable } from 'react-native-paper';

const scores = [
  { name: 'kalle', date: '6.12.2023', time: '12.15', points: 80 },
  { name: 'matti', date: '6.12.2023', time: '12.15', points: 75 },
  { name: 'heli', date: '6.12.2023', time: '12.15', points: 55 },
  { name: 'ritva', date: '6.12.2023', time: '12.15', points: 40 },
  { name: 'heli', date: '6.12.2023', time: '12.15', points: 55 },
  { name: 'ritva', date: '6.12.2023', time: '12.15', points: 40 }
]

export default function Scoreboard() {

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
          <Text style={styles.totalPointsText}>Top Six</Text>
        </View>
        <DataTable>
          {scores.map((item, index) => (
            <DataTable.Row key={index + 1}>
              <DataTable.Cell numeric>
                <Text style={styles.rankCell}>{index + 1}.</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={styles.nameCell}>{item.name}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={styles.dateCell} >{item.date}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={styles.timeCell}>{item.time}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={styles.boldText}>{item.points}</Text>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
          <DataTable.Row>
          </DataTable.Row>
        </DataTable>
      </View>
      <Footer />
    </>
  )
}
