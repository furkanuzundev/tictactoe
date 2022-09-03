import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import Modal from 'react-native-modalbox';
import {ModalProps} from 'react-native-modalbox/index';
import colors from '../../constants/colors';
import theme from '../../constants/theme';

type ResultModalProps = {
  title: string;
  description: string;
} & ModalProps;

const ResultModal = (props: ResultModalProps) => {
  const {title, description} = props;
  return (
    <Modal
      {...props}
      isOpen={true}
      style={styles.modal}
      coverScreen
      backdropPressToClose
      swipeToClose={false}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Modal>
  );
};

export default ResultModal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    ...theme.shadow,
    width: '60%',
  },
  title: {
    fontSize: theme.font.sizes.medium,
    fontFamily: theme.font.family,
    textAlign: 'center',
  },
  description: {
    fontSize: theme.font.sizes.small,
    fontFamily: theme.font.family,
    textAlign: 'center',
  },
});
