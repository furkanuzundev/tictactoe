import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import colors from '../../constants/colors';
import images from '../../constants/images';
import {SCREEN_WIDTH} from '../../constants/screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from '../../constants/theme';

import {setUser} from '../../store/user/actions';
import {useDispatch} from 'react-redux';
import {CommonActions, useNavigation} from '@react-navigation/native';

interface SplashProps {}

const Splash = (props: SplashProps) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const currentUser = await AsyncStorage.getItem('@user');

    if (currentUser) {
      dispatch(setUser(JSON.parse(currentUser)));
      resetNavigation('Main');
    } else {
      resetNavigation('Login');
    }
  };

  const resetNavigation = (name: string) => {
    /**
     * I add setTimeout to see splash screen
     */
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name}],
        }),
      );
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={images.logo} resizeMode="contain" />
      <Text style={styles.preparing}>Preparing</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: SCREEN_WIDTH * 0.6,
    height: SCREEN_WIDTH * 0.6,
  },
  preparing: {
    fontFamily: theme.font.family,
    color: colors.black,
    fontSize: theme.font.sizes.medium,
  },
});
