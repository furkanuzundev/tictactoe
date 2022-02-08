import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthStack, MainStack} from './Stacks';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import colors from '../constants/colors';

interface RootProps {}

const RootStack = createStackNavigator();

const Root = (props: RootProps) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <RootStack.Navigator screenOptions={{headerShown: false}}>
            <RootStack.Screen name="Auth" component={AuthStack} />
            <RootStack.Screen name="Main" component={MainStack} />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Root;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
