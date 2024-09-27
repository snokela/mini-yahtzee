import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles/Styles';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.author}>
        Author: Saana Nokela TIK23SP
      </Text>
    </View>
  )
}