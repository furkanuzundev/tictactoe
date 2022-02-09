import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../../constants/colors';

import Button from '../../components/Button';

interface SelectActionProps {}

const SelectAction = (props: SelectActionProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Button
        title="Create game"
        onPress={() => navigation.navigate('CreateGame')}
        buttonStyle={styles.button}
        textStyle={styles.text}
      />
      <Button
        title="Join a game"
        onPress={() => navigation.navigate('GameList')}
        buttonStyle={styles.button}
        textStyle={styles.text}
      />
    </View>
  );
};

export default SelectAction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    height: 100,
    width: '80%',
  },
  text: {
    color: colors.white,
  },
});
