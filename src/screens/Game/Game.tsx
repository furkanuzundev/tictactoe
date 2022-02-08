import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

interface GameProps {}

const Game = props => {
  const {route} = props;

  const update = () => {
    const game = route.params.item;
    const data = game.data();

    const updatedData = {...data};

    updatedData.grid.data[2][2] = 'X';

    game.ref.update(updatedData);
    console.log('updatedData: ', updatedData);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={update}>
        <Text>Game</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {},
});
