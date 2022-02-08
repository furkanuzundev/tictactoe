import * as actions from './actions';
import {firebase} from '@react-native-firebase/auth';

export const getGameList = () => (dispatch: any) => {
  console.log('gameList : ');
  firebase
    .firestore()
    .collection('games')
    .onSnapshot(snapshot => {
      console.log('snapshot : ', snapshot);
      dispatch(actions.getGameList(snapshot.docs));
    });
};
