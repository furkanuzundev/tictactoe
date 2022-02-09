import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

import colors from '../../constants/colors';
import {SCREEN_WIDTH} from '../../constants/screen';
import theme from '../../constants/theme';

interface BoardProps {}

const Board = (props: BoardProps) => {
  const {game, user} = useSelector(store => store);

  let turn = game.currentGame.data().turn.uid === user.currentUser.uid;

  const renderColumns = () => {
    const board = game.currentGame.data().board;
    const length = Object.keys(board).length;

    return Object.values(board).map((columnItem, columnIndex) => {
      return (
        <View style={styles.row}>
          {renderRows(columnItem, columnIndex, length)}
        </View>
      );
    });
  };

  const renderRows = (columnItem: any, columnIndex: number, length: number) => {
    const boxDimension = SCREEN_WIDTH / length;
    return columnItem.map((rowItem: any, rowIndex: number) => {
      return (
        <TouchableOpacity onPress={() => move(columnIndex, rowIndex)} a>
          <View
            style={[
              {
                width: boxDimension,
                height: boxDimension,
              },
              styles.box,
            ]}>
            <Text style={[styles.rowItem, {fontSize: boxDimension / 2}]}>
              {rowItem || ''}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  const move = (columnIndex: number, rowIndex: number) => {
    const updatedGame = {...game.currentGame.data()};

    const me = updatedGame.between.find(
      (item: any) => item.uid === user.currentUser.uid,
    );

    updatedGame.board[columnIndex][rowIndex] = me.mark;

    const away = updatedGame.between.find(
      (item: any) => item.uid !== user.currentUser.uid,
    );

    if (turn) {
      turn = false;
      updatedGame.turn = away;
    } else {
      updatedGame.turn = me;
    }

    game.currentGame.ref.update(updatedGame);
  };

  return (
    <View style={styles.container} pointerEvents={turn ? 'auto' : 'none'}>
      {renderColumns()}
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
  },
});
