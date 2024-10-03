import { Text, View } from 'react-native'
import styles from '../styles/Styles'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Footer from './Footer';
import { DataTable } from 'react-native-paper';

const scores = [
  { name: 'Kalle', date: '6.12.2023', time: '12.15', points: 120 },
  { name: 'Matti', date: '6.12.2023', time: '12.15', points: 75 },
  { name: 'Heli', date: '6.12.2023', time: '12.15', points: 55 },
  { name: 'Ritva', date: '6.12.2023', time: '12.15', points: 40 },
  { name: 'Heli', date: '6.12.2023', time: '12.15', points: 35 },
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
          <Text style={styles.totalPointsText}>Top Five</Text>
        </View>
        {renderDataTable(scores)}
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
