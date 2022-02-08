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

interface componentNameProps {}

const CreateGame = () => {
  const navigation = useNavigation();
  const {currentUser} = useSelector(store => store.user);

  const [gameName, setGameName] = useState<string>('test');
  const [boardBackgroundColor, setBoardbackgroundColor] =
    useState<string>('#FFE162');

  const onCreate = () => {
    const data = {
      backgroundColor: boardBackgroundColor,
      between: [
        {
          ...currentUser,
          mark: 'X',
        },
      ],
      board: board.grids[0].data,
      dimension: board.grids[0].dimension,
      createdAt: new Date(),
      gameName,
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
        <View style={styles.middle}>
          <TextInput
            style={styles.input}
            placeholder="Game Name"
            onChangeText={value => setGameName(value)}
            value={gameName}
            selectionColor={colors.primary}
          />
          <TextInput
            style={[styles.input, {backgroundColor: boardBackgroundColor}]}
            placeholder="Board color"
            editable={false}
            placeholderTextColor={colors.white}
          />
          <ScrollView
            horizontal
            style={styles.scrollView}
            showsHorizontalScrollIndicator={false}>
            {board.colorpalette.map((color, index) => (
              <TouchableOpacity
                onPress={() => setBoardbackgroundColor(color)}
                key={index}>
                <View style={[{backgroundColor: color}, styles.circle]} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.button} onPress={onCreate}>
          <Text style={styles.buttonText}>CREATE GAME</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: colors.white,
    marginTop: 10,
    borderRadius: 10,
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: fonts.indie,
    textAlign: 'center',
    fontSize: 25,
    color: colors.black,
    ...theme.shadow,
  },
  scrollView: {
    marginTop: 20,
    flexGrow: 0,
    height: 70,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    ...theme.shadow,
    borderWidth: 0.5,
    borderColor: colors.white,
    marginLeft: 10,
  },
  middle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
