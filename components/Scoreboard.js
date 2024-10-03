import { Text, View } from 'react-native'
import styles from '../styles/Styles'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Footer from './Footer';
import { DataTable } from 'react-native-paper';

const scores = [
  { id: 1, name: 'kalle', date: '6.12.2023', time: '12.15', points: 80 },
  { id: 2, name: 'matti', date: '6.12.2023', time: '12.15', points: 75 },
  { id: 3, name: 'heli', date: '6.12.2023', time: '12.15', points: 55 },
  { id: 4, name: 'ritva', date: '6.12.2023', time: '12.15', points: 40 },
]

export default function Scoreboard() {
  return (
    <>
      <Header />
      <View>
        <View>
      <MaterialCommunityIcons
                name='trophy-variant'
                size={60}
                color='#D87093'
              />
        <Text>Top Six</Text>
        </View>
        <DataTable>
          {scores.slice().map((item) => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell>{item.id}</DataTable.Cell>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell numeric>{item.date}</DataTable.Cell>
              <DataTable.Cell numeric>{item.time}</DataTable.Cell>
              <DataTable.Cell numeric>{item.points}</DataTable.Cell>
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
