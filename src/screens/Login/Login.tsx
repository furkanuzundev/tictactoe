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

const Login = () => {
  const [userName, setUsername] = useState<string>('');

  const onLogin = () => {
    auth()
      .signInAnonymously()
      .then(response => console.log('user signed anonymously : ', response))
      .catch(err => console.log('err : ', err));
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.keyboard}>
      <View style={styles.container}>
        <Image source={images.logo} style={styles.logo} resizeMode="contain" />
        <View>
          <Text style={styles.description}>
            Enter your name, let the fun begin!
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={name => setUsername(name)}
            value={userName}
            selectionColor={colors.primary}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={onLogin}>
          <Text style={styles.buttonText}>GO!</Text>
        </TouchableOpacity>
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
    fontFamily: fonts.indie,
    fontSize: 18,
    color: colors.black,
  },
  button: {
    width: 100,
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
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: fonts.indie,
    textAlign: 'center',
    fontSize: 25,
    color: colors.black,
    ...theme.shadow,
  },
});
