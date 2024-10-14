import { useState } from 'react';
import { Text, View, TextInput, Pressable, Keyboard, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
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
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <SafeAreaView style={styles.safeAreaView}>
      <Header />
      <View style={styles.homeContainer}>
        <MaterialCommunityIcons
          name='information'
          size={90}
          color='#D87093'
        />
        {!hasPlayerName ? (
          <>
            <Text style={styles.labelText}>For scoreboard enter your name...</Text>
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
          </>
        ) : (
          <>
           <Text style={styles.rulesHeadingText}>Rules of the game</Text>
            <View style={styles.rulesContainer}>
              <Text style={styles.paragraph}>
                <Text style={styles.paragraphHeading}>THE GAME: </Text>
                Upper section of the classic Yahtzee
                dice game. You have {NBR_OF_DICES} dices and
                for the every dice you have {NBR_OF_THROWS}
                throws. After each throw you can keep dices in
                order to get same dice spot counts as many as
                possible. In the end of the turn you must select
                your points from {MIN_SPOT} to {MAX_SPOT}.
                Game ends when all points have been selected.
                The order for selecting those is free.
              </Text>
              <Text style={styles.paragraph}>
                <Text style={styles.paragraphHeading}>POINTS: </Text>
                After each turn game calculates the sum
                for the dices you selected. Only the dices having
                the same spot count are calculated. Inside the
                game you can not select same points from
                {MIN_SPOT} to {MAX_SPOT} again.
              </Text>
              <Text style={styles.paragraph}>
                <Text style={styles.paragraphHeading}>GOAL: </Text>
                To get points as much as possible.
                {BONUS_POINTS_LIMIT} points is the limit of
                getting bonus which gives you {BONUS_POINTS}
                points more.
              </Text>
            </View>
            <Text style={styles.notifText}>Good luck, {playerName}!</Text>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate('Gameboard', {player : playerName})}
            >
              <Text style={styles.buttonText}>PLAY</Text>
            </Pressable>
          </>
        )
        }
      </View >
      <Footer />
    </SafeAreaView>
    </KeyboardAvoidingView>
  )
}