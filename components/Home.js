import { useState } from 'react';
import { Text, View, TextInput, Pressable, Keyboard } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Footer from './Footer';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from '../constants/Game';
import Styles from '../styles/Styles';

export default function Home() {

  const [playerName, setPlayerName] = useState('');
  const [hasPlayerName, setHasPlayerName] = useState(false);

  const handlePlayerName = (value) => {
    if (value.trim().length > 0) {
      setHasPlayerName(true);
      Keyboard.dismiss();
    }
  }

  return (
    <Header />
  )
}