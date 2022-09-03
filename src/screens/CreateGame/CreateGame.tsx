import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import colors from '../../constants/colors';
import theme from '../../constants/theme';
import fonts from '../../constants/fonts';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import board from '../../constants/board';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Input from '../../components/Input';
import Header from './Header';
import Button from '../../components/Button';

import SelectBoard from './SelectBoard';
import PickColor from './PickColor';
import {RootState} from '../../store';

interface componentNameProps {}

const CreateGame = () => {
  const navigation = useNavigation();
  const {currentUser} = useSelector((store: RootState) => store.user);

  const [gameName, setGameName] = useState<string>('');
  const [boardBackgroundColor, setBoardbackgroundColor] =
    useState<string>('#d11cd5');
  const [grid, setGrid] = useState(board.grids[0]);

  const [selectBoardModal, setSelectBoardModal] = useState<boolean>(false);

  const onCreate = () => {
    if (!gameName) {
      return;
    }

    const data = {
      backgroundColor: boardBackgroundColor,
      between: [
        {
          ...currentUser,
          mark: 'X',
        },
      ],
      board: grid.data,
      dimension: grid.dimension,
      createdAt: new Date(),
      gameName,
      turn: {...currentUser},
      /**
       * status shows what state game is
       *
       *  0: Waiting for rival
       *  1: Playing
       *  2: Game is done!
       */
      status: 0,
      steps: 0,
    };

    firestore()
      .collection('games')
      .add(data)
      .then(item => {
        navigation.navigate('Game', {item});
      });
  };

  const back = () => navigation.goBack();

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.keyboard}>
      <Header onBackPress={back} />
      <View style={styles.container}>
        <View>
          <View style={styles.card}>
            <Input
              style={styles.input}
              placeholder="Name your game!"
              onChangeText={value => setGameName(value)}
              value={gameName}
            />
          </View>
          <View style={[styles.card, {marginTop: 10}]}>
            <TouchableOpacity
              onPress={() => setSelectBoardModal(true)}
              style={styles.selectBoard}>
              <Text style={styles.selectBoardText}>{grid.dimension}</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.card, {marginTop: 10}]}>
            <Input
              style={[styles.input, {backgroundColor: boardBackgroundColor}]}
              placeholder="Background Color"
              editable={false}
              placeholderTextColor={colors.white}
            />
            <PickColor
              boardBackgroundColor={boardBackgroundColor}
              setBoardbackgroundColor={setBoardbackgroundColor}
            />
          </View>
        </View>
        <Button title="CREATE!" onPress={onCreate} />
      </View>
      <SelectBoard
        isOpen={selectBoardModal}
        onClosed={() => setSelectBoardModal(false)}
        close={() => setSelectBoardModal(false)}
        selectGrid={(item: any) => setGrid(item)}
        selectedGrid={grid}
      />
    </KeyboardAwareScrollView>
  );
};

export default CreateGame;

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  description: {
    fontFamily: fonts.indie,
    fontSize: 18,
    color: colors.black,
  },
  button: {
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadow,
  },
  buttonText: {
    fontFamily: fonts.indie,
    fontSize: 25,
    color: colors.yellow,
  },
  input: {
    textAlign: 'center',
  },

  selectBoard: {
    ...theme.shadow,
    color: colors.black,
    backgroundColor: colors.white,
    borderRadius: 10,
    height: 50,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectBoardText: {
    fontFamily: theme.font.family,
    fontSize: theme.font.sizes.medium,
  },

  middle: {
    paddingHorizontal: 10,
  },
  card: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
