import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

//TODO: move files to jsonconfig
import colors from '../../constants/colors';
import theme from '../../constants/theme';
import fonts from '../../constants/fonts';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import board from '../../constants/board';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Input from '../../components/Input';

import SelectBoard from './SelectBoard';

interface componentNameProps {}

const CreateGame = () => {
  const navigation = useNavigation();
  const {currentUser} = useSelector(store => store.user);

  const [gameName, setGameName] = useState<string>('');
  const [boardBackgroundColor, setBoardbackgroundColor] =
    useState<string>('#d11cd5');
  const [grid, setGrid] = useState(board.grids[0]);

  const [selectBoardModal, setSelectBoardModal] = useState<boolean>(false);

  const onCreate = () => {
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
    };

    firestore()
      .collection('games')
      .add(data)
      .then(item => {
        navigation.navigate('Game', {item});
      });
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.keyboard}>
      <View style={styles.container}>
        <View>
          <View style={styles.card}>
            <Input
              style={styles.input}
              placeholder="Game Name"
              onChangeText={value => setGameName(value)}
              value={gameName}
            />
          </View>
          <View style={[styles.card, {marginTop: 10}]}>
            <Input
              style={styles.input}
              placeholder="Select Board"
              editable={false}
              value={grid.dimension}
              onPressIn={() => setSelectBoardModal(true)}
            />
          </View>
          <View style={[styles.card, {marginTop: 10}]}>
            <Input
              style={[styles.input, {backgroundColor: boardBackgroundColor}]}
              placeholder="Background Color"
              editable={false}
              placeholderTextColor={colors.white}
            />
            <ScrollView
              horizontal
              style={styles.scrollView}
              contentContainerStyle={styles.scrollViewContenContainer}
              showsHorizontalScrollIndicator={false}>
              {board.colorpalette.map((color, index) => {
                const selected = color === boardBackgroundColor;
                return (
                  <TouchableOpacity
                    onPress={() => setBoardbackgroundColor(color)}
                    key={index}>
                    <View
                      style={[
                        {backgroundColor: color},
                        selected && {transform: [{scale: 1.5}]},
                        styles.circle,
                      ]}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={onCreate}>
          <Text style={styles.buttonText}>CREATE GAME</Text>
        </TouchableOpacity>
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
  scrollView: {
    marginTop: 20,
    flexGrow: 0,
    height: 80,
  },
  scrollViewContenContainer: {
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    ...theme.shadow,
    borderWidth: 0.5,
    borderColor: colors.white,
    marginLeft: 15,
  },
  middle: {
    paddingHorizontal: 10,
  },
  card: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
