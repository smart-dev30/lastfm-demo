import EStyleSheet from 'react-native-extended-stylesheet';

export const styles = EStyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white'
  },
  notSupported: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
    color: '$primaryTextColor',
    textAlign: 'center'
  }
});