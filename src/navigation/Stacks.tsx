import React from 'react';
import Login from '../screens/Login';
import GameList from '../screens/GameList';
import Game from '../screens/Game';
import CreateGame from '../screens/CreateGame';
import SelectAction from '../screens/SelectAction';

import {createStackNavigator} from '@react-navigation/stack';

const Auth = createStackNavigator();

function AuthStack() {
  return (
    <Auth.Navigator screenOptions={{headerShown: false}}>
      <Auth.Screen name="Login" component={Login} />
    </Auth.Navigator>
  );
}

const Main = createStackNavigator();

function MainStack() {
  return (
    <Main.Navigator screenOptions={{headerShown: false}}>
      <Main.Screen name="SelectAction" component={SelectAction} />
      <Main.Screen name="GameList" component={GameList} />
      <Main.Screen name="CreateGame" component={CreateGame} />
      <Main.Screen name="Game" component={Game} />
    </Main.Navigator>
  );
}

export {AuthStack, MainStack};
