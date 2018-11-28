import EStyleSheet from 'react-native-extended-stylesheet';

// define extended styles
export const CommonStyle = EStyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'white'
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  textCenter: {
    textAlign: 'center',
  },

  flexOne: {
    flex: 1,
  },
});