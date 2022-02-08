import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface LoginProps {}

const Login = (props: LoginProps) => {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {},
});
