import * as React from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import colors from '../constants/colors';

interface IndicatorProps {
  loading: boolean;
}

const Indicator = ({loading}: IndicatorProps) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  return null;
};

export default Indicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
