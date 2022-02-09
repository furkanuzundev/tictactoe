import React, {useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {getGameList} from '../../store/game/operations';
import Indicator from '../../components/Indicator';
import colors from '../../constants/colors';
import theme from '../../constants/theme';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';

interface GameListProps {}

const GameList = (props: GameListProps) => {
  const {game, user} = useSelector(store => store);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getGameList());
  }, [dispatch]);

  const _renderGames = ({item}: any) => {
    const data = item.data();
    return (
      <TouchableOpacity onPress={() => joinGame(item)}>
        <View style={styles.card}>
          <Text style={styles.title}>{data.gameName}</Text>
          <Text style={styles.grid}>{data.dimension}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const _keyExtractor = (item, index) => index.toString();

  const joinGame = (item: any) => {
    let selectedGame = {...item.data()};

    const joinedUser = {...user.currentUser, mark: 'O'};
    selectedGame.between = [...selectedGame.between, joinedUser];

    item.ref.update(selectedGame);
    navigation.navigate('Game', {item});
  };

  if (!game.games) {
    return <Indicator loading={true} />;
  }

  return (
    <View style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />
      <FlatList
        data={game.games}
        renderItem={_renderGames}
        keyExtractor={_keyExtractor}
        contentContainerStyle={styles.flatlist}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default GameList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flatlist: {
    padding: 10,
  },
  card: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    ...theme.shadow,
    marginVertical: 5,
  },
  title: {
    fontFamily: theme.font.family,
    fontSize: theme.font.sizes.medium,
  },
  grid: {
    fontFamily: theme.font.family,
    fontSize: theme.font.sizes.small,
  },
});

/* import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';
import {useEffect} from 'react';
import {useState} from 'react';
import {useSelector} from 'react-redux';

interface GameListProps {}

const GameList = () => {
  const {currentUser} = useSelector(store => store.user);

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
      <TouchableOpacity
        onPress={() => {
          item.ref
            .update({
              ...data,
              between: [
                ...data.between,
                {
                  ...currentUser,
                  mark: 'O',
                },
              ],
            })
            .then(() => navigation.navigate('Game', {item}));
        }}>
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
}); */
