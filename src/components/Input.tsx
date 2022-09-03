import * as React from 'react';
import {TextInput, StyleSheet, TextInputProps} from 'react-native';

import theme from '../constants/theme';
import colors from '../constants/colors';

const Input = (props: TextInputProps) => {
  return (
    <TextInput
      {...props}
      style={[styles.input, props.style]}
      selectionColor={colors.primary}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    ...theme.shadow,
    color: colors.black,
    backgroundColor: colors.white,
    fontFamily: theme.font.family,
    fontSize: theme.font.sizes.medium,
    borderRadius: 10,
    height: 50,
    padding: 0,
  },
});
