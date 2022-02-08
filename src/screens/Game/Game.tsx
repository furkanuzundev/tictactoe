import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface GameProps {}

const Game = (props: GameProps) => {
  return (
    <View style={styles.container}>
      <Text>Game</Text>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {},
});
