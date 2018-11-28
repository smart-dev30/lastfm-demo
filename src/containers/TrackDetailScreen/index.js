import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, Image, ScrollView, Linking } from 'react-native';
import { CommonStyle } from '../styles';
import { ApiService } from '../../services';
import { Utils, Constants } from '../../utils';
import { styles } from './style';
import { loveTrack, unLoveTrack } from '../../actions/user';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {TextButton} from "../../components/TextButton";

class _TrackDetailScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.track.name}`,
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      track: props.navigation.state.params.track
    };
    this.maxPages = 1;
  }

  componentWillMount() {
    this.getTrackDetails().then();
  }

  async getTrackDetails() {
    const { name, artist } = this.props.navigation.state.params.track;
    try {
      const { track } = await ApiService.getTrackDetail({
        artist: artist.name,
        track: name,
      });
      console.log("Track Detail:", track);
      this.setState({track});
    } catch (error) {
      console.log(JSON.stringify(error));
      error.message && Utils.showAlert('Error', error.message);
    }
    this.setState({loading: false});
  }

  isInLoveTrack = () => {
    const { track } = this.state;
    const { lovedTracks } = this.props;
    return lovedTracks.find(lovedTrack => lovedTrack.name === track.name && lovedTrack.artist.name === track.artist.name);
  };

  onPressHeart = async () => {
    const { track } = this.state;
    this.setState({loading: true});
    this.isInLoveTrack() ?
      await this.props.unLoveTrack(track) :
      await this.props.loveTrack(track);
    console.log('Love Tracks:', this.props.lovedTracks);
    this.setState({loading: false});
  };

  renderAlbum() {
    const { album } = this.state.track;
    const { loading } = this.state;
    const image = Array.isArray(album.image) && album.image.length > 0 ?
      {uri: album.image[album.image.length - 1]['#text']} :
      require('../../assets/images/lastfm.png');
    return <View style={styles.albumContainer}>
      <Image style={styles.albumImage} source={image}/>
      <TouchableOpacity onPress={this.onPressHeart} style={styles.favoriteButton} disabaled={loading}>
        <Icon name={this.isInLoveTrack() ? 'heart' : 'heart-o'} size={30} color={Constants.alertColor}/>
      </TouchableOpacity>
      <Text style={styles.albumTitle}>{album.title}</Text>
    </View>
  }

  onPressWikiMore = () => {
    const { url } = this.state.track;
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  };

  renderArtist() {
    const { track } = this.state;
    const { artist } = track;
    return <View style={styles.subContainer}>
      <Text style={styles.artistTitle}>{artist.name}</Text>
      <View style={styles.trackTitleWrapper}>
        <Text style={styles.trackTitle}>{track.name}</Text>
        <Text style={styles.trackDuration}>({moment.utc(parseInt(track.duration)).format('mm:ss')})</Text>
        <View style={styles.borderBottom}/>
      </View>
      <View style={styles.trackTitleWrapper}>
        <View>
          <Text style={styles.description}>LISTENERS</Text>
          <Text style={styles.contentText}>{Utils.formatNumber(track.listeners)}</Text>
        </View>
        <View style={styles.leftPadding}>
          <Text style={styles.description}>PLAY COUNT</Text>
          <Text style={styles.contentText}>{Utils.formatNumber(track.playcount)}</Text>
        </View>
      </View>
      <View style={styles.borderBottom}/>
    </View>
  }

  renderWiki() {
    const { wiki } = this.state.track;
    const { content } = wiki;


    return <View style={styles.subContainer}>
      <Text style={styles.contentText}>Wiki</Text>
      <Text style={styles.contentWiki}>{content.replace(/<a.*?<\/a>/g, '')}</Text>
      <View style={styles.moreButtonContainer}>
        <TextButton
          title='Read More'
          onPress={this.onPressWikiMore}
          style={styles.moreButton}
        />
      </View>
    </View>
  }

  render() {
    const { loading, track } = this.state;
    const { album, artist, wiki } = track;
    return (
      <ScrollView style={CommonStyle.container}>
        {album && this.renderAlbum()}
        {artist && this.renderArtist()}
        {wiki && this.renderWiki()}
      </ScrollView>
    );
  }
}

function mapStateToProps(store) {
  return {
    lovedTracks: store.lovedTracks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loveTrack: (track) => dispatch(loveTrack(track)),
    unLoveTrack: (track) => dispatch(unLoveTrack(track)),
  };
}

export const TrackDetailScreen = connect(mapStateToProps, mapDispatchToProps)(_TrackDetailScreen);