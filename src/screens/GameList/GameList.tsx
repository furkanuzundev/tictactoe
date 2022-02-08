import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';
import {useEffect} from 'react';
import {useState} from 'react';

interface GameListProps {}

const GameList = () => {
  const navigation = useNavigation();
  const [gameList, setGameList] = useState();

  useEffect(() => {
    firestore().collection('games').onSnapshot(onResult);
  }, []);

  const onResult = (snapshot: any) => {
    setGameList(snapshot.docs);
  };

  const _renderItem = ({item}) => {
    const data = item.data();
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Game', {item})}>
        <Text>{data.gameName}</Text>
      </TouchableOpacity>
    );
  };

  console.log('gameList: ', gameList);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('CreateGame')}>
        <Text>create a game</Text>
      </TouchableOpacity>

      <FlatList data={gameList} renderItem={_renderItem} />
    </View>
  );
};

export default GameList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
