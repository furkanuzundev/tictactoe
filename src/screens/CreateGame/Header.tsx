import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../constants/colors';
import theme from '../../constants/theme';

interface HeaderProps {
  onBackPress: () => void;
}

const Header = (props: HeaderProps) => {
  const backSlop = {top: 10};
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        hitSlop={backSlop}
        onPress={props.onBackPress}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.middle}>
        <Text style={styles.title}>Create Game</Text>
      </View>
      <View style={styles.empty} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.background,
    flexDirection: 'row',
  },
  title: {
    fontFamily: theme.font.family,
    fontSize: theme.font.sizes.large,
    color: colors.primary,
  },
  middle: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  empty: {
    flex: 1,
  },
  backButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    color: colors.black,
    fontFamily: theme.font.family,
    fontSize: theme.font.sizes.small,
  },
});
