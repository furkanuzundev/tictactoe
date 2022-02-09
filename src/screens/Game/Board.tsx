import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

import colors from '../../constants/colors';
import {SCREEN_WIDTH} from '../../constants/screen';
import theme from '../../constants/theme';
import {RootState} from '../../store';

import {checkWinner} from '../../utils/winnerHandler';

interface BoardProps {}

const Board = (props: BoardProps) => {
  const {game, user} = useSelector((store: RootState) => store);
  const [allowTouch, setAllowTouch] = useState<boolean>(true);

  let myTurn = game.currentGame.data().turn.uid === user.currentUser.uid;

  useEffect(() => {
    const currentGame = game.currentGame.data();

    if (currentGame.status === 0 || !myTurn || currentGame.between.length < 2) {
      setAllowTouch(false);
    } else {
      setAllowTouch(true);
    }
  }, [game.currentGame, myTurn]);

  const renderBoard = () => {
    const board = game.currentGame.data().board;
    const length = Object.keys(board).length;

    return Object.values(board).map((rowItem, rowIndex) => {
      return (
        <View style={styles.row} key={rowIndex}>
          {renderColumns(rowItem, rowIndex, length)}
          <View style={styles.line} />
        </View>
      );
    });
  };

  const renderColumns = (rowItem: any, rowIndex: number, length: number) => {
    const boxDimension = SCREEN_WIDTH / length;
    return rowItem.map((columnItem: any, columnIndex: number) => {
      return (
        <TouchableOpacity
          onPress={() => move(rowIndex, columnIndex)}
          key={columnIndex}>
          <View
            style={[
              {
                width: boxDimension,
                height: boxDimension,
              },
              styles.box,
            ]}>
            <Text style={[styles.rowItem, {fontSize: boxDimension / 2}]}>
              {columnItem || ''}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  const move = (rowIndex: number, columnIndex: number) => {
    const updatedGame = {...game.currentGame.data()};

    const me = updatedGame.between.find(
      (item: any) => item.uid === user.currentUser.uid,
    );

    const away = updatedGame.between.find(
      (item: any) => item.uid !== user.currentUser.uid,
    );

    updatedGame.board[rowIndex][columnIndex] = me.mark;

    let winner = checkWinner(
      updatedGame.board,
      {x: rowIndex, y: columnIndex},
      me.mark,
    );

    console.log('winner : ', winner);

    if (myTurn) {
      updatedGame.turn = away;
    } else {
      updatedGame.turn = me;
    }

    game.currentGame.ref.update(updatedGame);
  };

  return (
    <View style={styles.container} pointerEvents={allowTouch ? 'auto' : 'none'}>
      {renderBoard()}
    </View>
  );
};

export default Board;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  box: {
    borderWidth: 2,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowItem: {
    fontFamily: theme.font.family,
    color: colors.white,
  },
  line: {
    position: 'absolute',
  },
});
