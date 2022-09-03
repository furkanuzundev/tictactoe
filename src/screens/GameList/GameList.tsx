import React, {useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {getGameList} from '../../store/game/operations';
import Indicator from '../../components/Indicator';
import colors from '../../constants/colors';
import theme from '../../constants/theme';
import {useNavigation} from '@react-navigation/native';
import Header from './Header';
import {RootState} from '../../store';

interface GameListProps {}

const GameList = (props: GameListProps) => {
  const {game, user} = useSelector((store: RootState) => store);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getGameList());
  }, [dispatch]);

  const _renderGames = ({item}: any) => {
    const data = item.data();
    return (
      <TouchableOpacity onPress={() => joinGame(item)}>
        <View style={styles.cardContainer}>
          <View style={styles.gameInformation}>
            <Text style={styles.title}>{data.gameName}</Text>
            <Text style={styles.grid}>{data.dimension}</Text>
            <View style={styles.betweenContainer}>
              {data.between && data.between.length > 0 && data.between[0] && (
                <Text style={styles.user}>{data.between[0].username}</Text>
              )}
              <Text style={styles.user}> vs </Text>
              {data.between && data.between.length > 0 && data?.between[1] && (
                <Text style={styles.user}>{data.between[1].username}</Text>
              )}
            </View>
          </View>
          <View>
            <View style={styles.statusContainer}>
              <View
                style={[
                  styles.circle,
                  {
                    backgroundColor:
                      data.status && colors.statusPalette[data.status].color,
                  },
                ]}
              />
              <Text style={styles.statusText}>
                {data.status && colors.statusPalette[data.status].text}
              </Text>
            </View>
            {data.winner && (
              <Text style={styles.wonUser}>
                🎉 {data.winner.user.username} won
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const _keyExtractor = (_: any, index: number) => index.toString();

  const joinGame = (item: any) => {
    let selectedGame = {...item.data()};

    if (selectedGame.status === 1 || selectedGame.status === 2) {
      return;
    }

    const joinedUser = {...user.currentUser, mark: 'O'};
    selectedGame.between = [...selectedGame.between, joinedUser];

    selectedGame.status = 1;

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
        data={game.games.sort(
          (a: any, b: any) => a.data().status - b.data().status,
        )}
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
  cardContainer: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    ...theme.shadow,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gameInformation: {
    flex: 1,
  },
  title: {
    fontFamily: theme.font.family,
    fontSize: theme.font.sizes.medium,
  },
  grid: {
    fontFamily: theme.font.family,
    fontSize: theme.font.sizes.small,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  statusText: {
    fontSize: theme.font.sizes.extraSmall,
    fontFamily: theme.font.family,
    marginLeft: 5,
  },
  betweenContainer: {
    flexDirection: 'row',
  },
  user: {
    fontFamily: theme.font.family,
    fontSize: theme.font.sizes.small,
  },
  wonUser: {
    fontFamily: theme.font.family,
    fontSize: theme.font.sizes.extraSmall,
  },
});
