/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AppNavigator } from './router/AppNavigator';
import store from './store'; //Import the store

EStyleSheet.build({
  $primaryColor: '#4286f4',
  $primaryTextColor: '#525266',
  $alertColor: '#FF5E35',
});

export default class App extends Component {
  componentDidMount () {}

  render() {
    return (
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
    );
  }
}