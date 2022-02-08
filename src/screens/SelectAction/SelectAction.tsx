import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

interface SelectActionProps {}

const SelectAction = (props: SelectActionProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('CreateGame')}>
        <View style={styles.card}>
          <Text style={styles.text}>Create a game</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('GameList')}>
        <View style={styles.card}>
          <Text style={styles.text}>Join a game</Text>
        </View>
      </TouchableOpacity>
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
  card: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: 100,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.indie,
    color: colors.white,
    fontSize: 20,
  },
});
