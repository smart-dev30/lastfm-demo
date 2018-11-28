import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { CommonStyle } from '../styles';
import { styles } from './style';
import { LOCAL_CONFIG } from '../../../config';
import { getMobileSession } from '../../actions/user';

class _SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.checkNavigation().then();
  }

  async checkNavigation() {
    await this.props.getMobileSession();
    console.log('Mobile Session:', this.props.mobileSession);
    setTimeout(() => {
      this.props.navigation.navigate('MainNavigator');
    }, LOCAL_CONFIG.ENV === 'dev' ? 0 : 2000)
  }

  render() {
    return (
      <View style={[CommonStyle.container, CommonStyle.center]}>
        <Text style={styles.title}>MOP Demo App</Text>
        <Text style={styles.author}>by Revaz Danelia</Text>
      </View>
    );
  }
}

function mapStateToProps(store) {
  return {
    mobileSession: store.mobileSession
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMobileSession: () => dispatch(getMobileSession()),
  };
}

export const SplashScreen = connect(mapStateToProps, mapDispatchToProps)(_SplashScreen);