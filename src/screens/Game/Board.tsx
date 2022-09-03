import {CommonActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import board from '../../constants/board';

import colors from '../../constants/colors';
import {SCREEN_WIDTH} from '../../constants/screen';
import theme from '../../constants/theme';
import {RootState} from '../../store';

import {checkWinner} from '../../utils/winnerHandler';
import ResultModal from './ResultModal';
import {listenCurrentGame} from '../../store/game/actions';

interface BoardProps {}

const Board = (props: BoardProps) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {game, user} = useSelector((store: RootState) => store);
  const [allowTouch, setAllowTouch] = useState<boolean>(true);
  const [modal, setModal] = useState<any>(null);

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
    const currentBoard = game.currentGame.data().board;
    const length = Object.keys(currentBoard).length;

    return Object.values(currentBoard).map((rowItem, rowIndex) => {
      return (
        <View style={styles.row} key={rowIndex}>
          {renderColumns(rowItem, rowIndex, length)}
        </View>
      );
    });
  };

  useEffect(() => {
    const currentGame = game.currentGame.data();
    const boardLength = Math.pow(Object.keys(currentGame.board).length, 2);

    if (currentGame.steps === 0) {
      return;
    }

    if (currentGame.winner) {
      showWinner(currentGame);
    } else if (boardLength === currentGame.steps) {
      showDraw();
    }
  }, [game.currentGame.data().steps]);

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
    updatedGame.steps = updatedGame.steps + 1;

    let winner = checkWinner(
      updatedGame.board,
      {x: rowIndex, y: columnIndex},
      me.mark,
    );

    const boardLength = Math.pow(Object.keys(updatedGame.board).length, 2);

    if (winner) {
      updatedGame.winner = {
        moves: winner,
        user: myTurn ? me : away,
      };
      updatedGame.status = 2;
    } else if (boardLength === updatedGame.steps) {
      const resetBoard = board.grids.find(
        item => item.dimension === updatedGame.dimension,
      );

      updatedGame.board = resetBoard.data;
      updatedGame.turn = updatedGame.between[0];
    } else {
      updatedGame.turn = myTurn ? away : me;
    }

    game.currentGame.ref.update(updatedGame);
  };

  const resetNavigation = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Main'}],
      }),
    );
  };

  const showWinner = (currentGame: any) => {
    setModal(
      <ResultModal
        title={
          currentGame.winner.user.uid === user.currentUser.uid
            ? 'YOU WIN!'
            : 'YOU LOSE!'
        }
        description="You are being redirected to the homepage."
        onOpened={onShowOpened}
      />,
    );
  };

  const onShowOpened = () => {
    const timer = setTimeout(() => {
      setModal(null);
      dispatch(listenCurrentGame(null));
      resetNavigation();
    }, 1500);
    return () => clearTimeout(timer);
  };

  const showDraw = () => {
    setModal(
      <ResultModal
        title="DRAW!"
        description="Game restarting."
        onOpened={onDrawOpened}
      />,
    );

    game.currentGame.ref.update({...game.currentGame, steps: 0});
  };

  const onDrawOpened = () => {
    const timer = setTimeout(() => {
      setTimeout(() => {
        setModal(null);
      }, 1500);
    }, 1500);
    return () => clearTimeout(timer);
  };

  return (
    <View style={styles.container} pointerEvents={allowTouch ? 'auto' : 'none'}>
      {modal}
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
    width: 100,
    height: 5,
    backgroundColor: colors.white,
    borderRadius: 5,
    transform: [
      {
        translateX: 10,
      },
    ],
  },
});
