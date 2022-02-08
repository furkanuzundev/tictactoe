import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface GameListProps {}

const GameList = (props: GameListProps) => {
  return (
    <View style={styles.container}>
      <Text>GameList</Text>
    </View>
  );
};

export default GameList;

const styles = StyleSheet.create({
  container: {},
});
