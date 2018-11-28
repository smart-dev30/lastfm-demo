import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { TrackListItem } from '../../components';
import { CommonStyle } from '../styles';
import { ApiService } from '../../services';
import { Utils, Constants } from '../../utils';
import { styles } from './style';
import { getLovedTracks } from '../../actions/user';

class _TopTrackScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.country.name}`,
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      page: 1,
      limit: 50,
      topTracks: [],
    };
    this.maxPages = 1;
  }

  componentWillMount() {
    this.getTopTracks().then();
  }

  _keyExtractor = (item, index) => `track_${index}_${item.mbid}`;

  async getTopTracks() {
    const { page, limit, topTracks } = this.state;
    if (page > this.maxPages) return;
    const { name } = this.props.navigation.state.params.country;
    this.setState({loading: true});
    try {
      const { tracks } = await ApiService.getTopTracks({
        country: name,
        limit,
        page,
      });
      this.setState({
        topTracks: [...topTracks, ...tracks.track],
        page: page + 1
      });
      this.maxPages = tracks['@attr'].totalPages;
      await this.props.getLovedTracks();
      console.log('Loved Tracks:', this.props.lovedTracks)
    } catch (error) {
      console.log(JSON.stringify(error));
      error.message && Utils.showAlert('Error', error.message);
    }
    this.setState({loading: false});
  }

  onPressTrack = (track) => {
    this.props.navigation.navigate('TrackDetailScreen', {track});
  };

  renderTrackItem = ({item}) => {
    return <TrackListItem
      onPress={() => this.onPressTrack(item)}
      track={item}
    />
  };

  render() {
    const { topTracks, loading } = this.state;
    return (
      <View style={CommonStyle.flexOne}>
        {topTracks.length > 0 && <FlatList
          style={CommonStyle.container}
          data={topTracks}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderTrackItem}
          onEndReached={() => {this.getTopTracks().then()}}
        />}
        {loading && <View style={[styles.loadingContainer, topTracks.length > 0 ? {} : CommonStyle.flexOne]}>
          <ActivityIndicator
            color={Constants.primaryTextColor}
            size={'small'}/>
        </View>}
        {!loading && topTracks.length === 0 && <View style={[CommonStyle.center, CommonStyle.flexOne]}>
          <Text style={styles.notSupported}>{`We are sorry!\nThis region is not supported at the moment. Please try again with others.`}</Text>
        </View>}
      </View>
    );
  }
}

function mapStateToProps(store) {
  return {
    countries: store.countries,
    lovedTracks: store.lovedTracks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getLovedTracks: () => dispatch(getLovedTracks()),
  };
}

export const TopTrackScreen = connect(mapStateToProps, mapDispatchToProps)(_TopTrackScreen);