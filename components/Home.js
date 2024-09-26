import { useState } from 'react';
import { Text, View, TextInput, Pressable, Keyboard } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Footer from './Footer';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from '../constants/Game';
import styles from '../styles/Styles';

export default function Home({ navigation }) {

  const [playerName, setPlayerName] = useState('');
  const [hasPlayerName, setHasPlayerName] = useState(false);

  const handlePlayerName = (value) => {
    if (value.trim().length > 0) {
      setHasPlayerName(true);
      Keyboard.dismiss();
    }
  }

  return (
    <>
      <Header />
      <View style={styles.homeContainer}>
        <MaterialCommunityIcons
          name='information'
          size={90}
          color='#D87093'
        />
        <Text>For scoreboard enter your name...</Text>
        <TextInput
          onChangeText={setPlayerName}
          autoFocus={true}
        />
        <Pressable
          style={styles.button}
          onPress={() => handlePlayerName(playerName)}
        >
          <Text style={styles.buttonText}>OK</Text>
        </Pressable>
        <Text>Rules of the game</Text>
        <Text multiline='true'>
          THE GAME: Upper section of the classic Yahtzee
          dice game. You have {NBR_OF_DICES} dices and
          for the every dice you have {NBR_OF_THROWS}
          throws. After each throw you can keep dices in
          order to get same dice spot counts as many as
          possible. In the end of the turn you must select
          your points from {MIN_SPOT} to {MAX_SPOT}.
          Game ends when all points have been selected.
          The order for selecting those is free.
        </Text>
        <Text>Good luck, {playerName}!</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Gameboard')}
        >
          <Text style={styles.buttonText}>PLAY</Text>
        </Pressable>
      </View>
      <Footer />
    </>
  )
}