import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {listenCurrentGame} from '../../store/game/operations';
import Indicator from '../../components/Indicator';
import Player from './Player';

import Board from './Board';
import {RootState} from '../../store';

interface GameProps {
  route: any;
}

const Game = (props: GameProps) => {
  const dispatch = useDispatch();

  const {game, user} = useSelector((store: RootState) => store);

  useEffect(() => {
    dispatch(listenCurrentGame(props.route.params.item));
  }, [dispatch, props.route]);

  if (!game.currentGame) {
    return <Indicator loading={false} />;
  }

  const me = game.currentGame
    .data()
    .between.find((item: any) => item.uid === user.currentUser.uid);

  const away = game.currentGame
    .data()
    .between.find((item: any) => item.uid !== user.currentUser.uid);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: game.currentGame.data().backgroundColor},
      ]}>
      <Player
        player={away}
        style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}
        turn={away && game.currentGame.data().turn.uid === away.uid}
      />
      <Board />
      <Player
        player={me}
        style={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}
        turn={me && game.currentGame.data().turn.uid === me.uid}
      />
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/* import {firebase} from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import {useSelector} from 'react-redux';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

interface GameProps {}

const Game = props => {
  const {route} = props;
  const {currentUser} = useSelector(store => store.user);

  const [currentGame, setCurrentGame] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection('games')
      .doc(route.params.item.id)
      .onSnapshot(snapshot => {
        setCurrentGame(snapshot);
      });
  }, []);

  const drawBoard = board => {
    return Object.values(board).map((columnItem, columnIndex) => {
      return (
        <View style={{flexDirection: 'row'}}>
          {columnItem.map((rowItem, rowIndex) => {
            return (
              <TouchableOpacity onPress={() => move(columnIndex, rowIndex)}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderWidth: 1,
                    borderColor: colors.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>{rowItem || ''}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    });
  };

  const move = (columnIndex, rowIndex) => {
    const data = {...currentGame.data()};

    const me = data.between.find(user => user.uid === currentUser.uid);

    data.board[columnIndex][rowIndex] = me.mark;

    currentGame.ref.update(data);
  };

  if (!currentGame) {
    return null;
  }

  const data = currentGame.data();

  const me = data.between.find(user => user.uid === currentUser.uid);

  const away = data.between.find(user => user.uid !== currentUser.uid);

  return (
    <View style={[styles.container, {backgroundColor: data.backgroundColor}]}>
      {away ? (
        <View
          style={[
            styles.userContainer,
            {borderBottomLeftRadius: 10, borderBottomRightRadius: 10},
          ]}>
          <Text style={styles.userText}>
            {away.username} - {away.mark}
          </Text>
        </View>
      ) : (
        <View
          style={[
            styles.userContainer,
            {borderBottomLeftRadius: 10, borderBottomRightRadius: 10},
          ]}>
          <Text style={styles.userText}>Waiting for somebody...</Text>
        </View>
      )}
      <View style={styles.board}>{drawBoard(data.board)}</View>
      <View
        style={[
          styles.userContainer,
          {borderTopLeftRadius: 10, borderTopRightRadius: 10},
        ]}>
        <Text style={styles.userText}>
          {me.username} - {me.mark}
        </Text>
      </View>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {flex: 1},
  userContainer: {
    alignSelf: 'center',
    backgroundColor: colors.primary,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  userText: {
    fontFamily: fonts.indie,
    fontSize: 16,
    color: colors.white,
  },
  board: {
    flex: 1,
    justifyContent: 'center',
  },
}); */
