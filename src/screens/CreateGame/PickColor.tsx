import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import board from '../../constants/board';
import colors from '../../constants/colors';
import theme from '../../constants/theme';

interface PickColorProps {
  boardBackgroundColor: string;
  setBoardbackgroundColor: (color: string) => void;
}

const PickColor = (props: PickColorProps) => {
  const {boardBackgroundColor, setBoardbackgroundColor} = props;
  return (
    <ScrollView
      horizontal
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContenContainer}
      showsHorizontalScrollIndicator={false}>
      {board.colorpalette.map((color: string, index: number) => {
        const selected = color === boardBackgroundColor;
        return (
          <TouchableOpacity
            onPress={() => setBoardbackgroundColor(color)}
            key={index}>
            <View
              style={[
                {backgroundColor: color},
                selected && {transform: [{scale: 1.5}]},
                styles.circle,
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default PickColor;

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 20,
    flexGrow: 0,
    height: 80,
  },
  scrollViewContenContainer: {
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    ...theme.shadow,
    borderWidth: 0.5,
    borderColor: colors.white,
    marginLeft: 15,
  },
});
