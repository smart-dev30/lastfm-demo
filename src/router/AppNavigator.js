import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  SplashScreen,
  CountryListScreen,
  TopTrackScreen,
  TrackDetailScreen,
} from '../containers';

export const MainNavigator = createStackNavigator({
  CountryListScreen,
  TopTrackScreen,
  TrackDetailScreen,
}, {
  initialRouteName: 'CountryListScreen',
  headerMode: 'screen',
});

export const AppNavigator = createStackNavigator({
  SplashScreen,
  MainNavigator,
}, {
  initialRouteName: 'SplashScreen',
  headerMode: 'none',
});