import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import colors from '../../constants/colors';
import images from '../../constants/images';
import theme from '../../constants/theme';
import fonts from '../../constants/fonts';

import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setUser} from '../../store/user/actions';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [username, setUsername] = useState<string>('');

  const onLogin = () => {
    // TODO: Add splash screen
    if (username) {
      auth()
        .signInAnonymously()
        .then(async response => {
          const user = {
            uid: response.user.uid,
            username,
          };

          await AsyncStorage.setItem('@user', JSON.stringify(user));
          dispatch(setUser(user));

          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Main'}],
            }),
          );
        })
        .catch(err => console.error('err : ', err));
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.keyboard}>
      <View style={styles.container}>
        <Image source={images.logo} style={styles.logo} resizeMode="contain" />
        <View>
          <Text style={styles.description}>
            Enter your name, let the fun begin!
          </Text>
          <Input
            style={styles.input}
            placeholder="Name"
            onChangeText={name => setUsername(name)}
            value={username}
          />
        </View>
        <Button title="GO!" onPress={onLogin} />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;

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
    fontFamily: theme.font.family,
    fontSize: theme.font.sizes.small,
    color: colors.black,
    textAlign: 'center',
  },
  input: {
    marginTop: 10,
    textAlign: 'center',
  },
});
