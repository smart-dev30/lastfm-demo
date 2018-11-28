import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import { getAllCountries } from '../../actions/countries';
import { Spinner, CountryListItem } from '../../components';
import { CommonStyle } from '../styles';

class _CountryListScreen extends Component {

  static navigationOptions = {
    title: 'Country List',
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  componentWillMount() {
    this.updateCountryList().then();
  }

  _keyExtractor = (item, index) => `${item.name}_index_${index}`;

  async updateCountryList() {
    this.setState({loading: true});
    try {
      await this.props.getAllCountries();
    } catch (error) {
      console.log(JSON.stringify(error));
    }
    this.setState({loading: false});
  }

  onPressCountry = (country) => {
    this.props.navigation.navigate('TopTrackScreen', {country});
  };

  renderCountryItem = ({item}) => (
    <CountryListItem
      flag={item.flag}
      region={item.region}
      onPress={() => this.onPressCountry(item)}
      title={item.name}
    />
  );

  render() {
    const { countries } = this.props;
    const { loading } = this.state;
    return (
      <View style={CommonStyle.flexOne}>
        <Spinner visible={loading}/>
        <FlatList
          style={CommonStyle.container}
          data={countries}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderCountryItem}
        />
      </View>
    );
  }
}

function mapStateToProps(store) {
  return {
    countries: store.countries
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllCountries: () => dispatch(getAllCountries()),
  };
}

export const CountryListScreen = connect(mapStateToProps, mapDispatchToProps)(_CountryListScreen);