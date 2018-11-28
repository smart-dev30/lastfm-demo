import { Alert } from 'react-native';

const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const Utils = {

  validateEmail(email) {
    return emailRegex.test(email);
  },

  validatePassword(password, confirmPassword) {
    if (!password || !confirmPassword) return false;
    return password === confirmPassword;
  },

  capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  },

  showAlert(title, message) {
    Alert.alert(
      title,
      message,
      [
        {text: 'OK', onPress: () => console.log('Alert OK Pressed'), style: 'cancel'},
      ],
      { cancelable: true }
    );
  },

  formatNumber( num ) {
    if (!num) return '';
    let str = num.toString().split('.');
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
  }
};

export * from './constants';