import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../constants/colors';
import theme from '../../constants/theme';

interface PlayerProps {
  style: any;
  player: any;
  turn: boolean;
}

const Player = (props: PlayerProps) => {
  const {game, user} = useSelector(store => store);
  const {style, player, turn} = props;

  return (
    <View style={[styles.player, style, turn && styles.turnBorder]}>
      {player ? (
        <Text style={styles.userText}>
          {player.username} - {player.mark}
        </Text>
      ) : (
        <Text style={styles.userText}>Waiting for somebody...</Text>
      )}
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({
  player: {
    alignSelf: 'center',
    backgroundColor: colors.primary,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  userText: {
    fontFamily: theme.font.family,
    fontSize: theme.font.sizes.small,
    color: colors.white,
  },
  turnBorder: {
    borderWidth: 2,
    borderColor: colors.white,
  },
});
