import * as actions from './actions';
import {firebase} from '@react-native-firebase/auth';

export const getGameList = () => (dispatch: any) => {
  firebase
    .firestore()
    .collection('games')
    .onSnapshot(snapshot => {
      dispatch(actions.getGameList(snapshot.docs));
    });
};

export const listenCurrentGame = (item: any) => (dispatch: any) => {
  firebase
    .firestore()
    .collection('games')
    .doc(item.id)
    .onSnapshot(snapshot => {
      dispatch(actions.listenCurrentGame(snapshot));
    });
};
