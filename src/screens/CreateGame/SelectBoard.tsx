import * as React from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import Modal from 'react-native-modalbox';
import {ModalProps} from 'react-native-modalbox/index';
import colors from '../../constants/colors';
import theme from '../../constants/theme';

import board from '../../constants/board';

interface SelectBoardProps {
  selectGrid: (item: any) => void;
  close: () => void;
  selectedGrid: any;
}

const SelectBoard = (props: SelectBoardProps | ModalProps) => {
  const {selectGrid, close, selectedGrid} = props;

  const _renderItem = ({item}: any) => {
    const isSelected = selectedGrid.dimension === item.dimension;
    return (
      <TouchableOpacity
        style={[
          styles.card,
          isSelected && {backgroundColor: 'rgba(0,0,0,0.2)'},
        ]}
        onPress={() => {
          selectGrid(item);
          close();
        }}>
        <Text style={styles.item}>{item.dimension}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      {...props}
      style={styles.modal}
      coverScreen
      backdropPressToClose
      swipeToClose={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Select Board</Text>
        <FlatList
          data={board.grids}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Modal>
  );
};

export default SelectBoard;

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
  card: {
    padding: 10,
    alignItems: 'center',
  },
  item: {
    fontSize: theme.font.sizes.small,
    fontFamily: theme.font.family,
  },
});
