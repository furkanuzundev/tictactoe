import * as React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';
import theme from '../constants/theme';

interface ButtonProps {
  title: string;
  buttonStyle?: object;
  textStyle?: object;
  onPress: () => void;
}

const Button = (props: ButtonProps) => {
  const {title, onPress, buttonStyle, textStyle} = props;
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    padding: 5,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadow,
  },
  text: {
    fontFamily: theme.font.family,
    fontSize: theme.font.sizes.medium,
    color: colors.yellow,
  },
});
