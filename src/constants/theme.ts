import {Platform} from 'react-native';

export default {
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  font: {
    family: Platform.OS === 'ios' ? 'IndieFlower' : 'IndieFlower-Regular',
    sizes: {
      extraSmall: 14,
      small: 18,
      medium: 25,
      large: 35,
    },
  },
};
