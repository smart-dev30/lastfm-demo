import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CommonStyle } from '../containers/styles';
import { Constants } from '../utils';
import { loveTrack, unLoveTrack } from '../actions/user';

class _TrackListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  static propTypes = {
    track: PropTypes.any.isRequired,
    onPress: PropTypes.func.isRequired,
    customStyle: PropTypes.any,
  };

  onPressHeart = async () => {
    this.setState({loading: true});
    this.isInLoveTrack() ?
      await this.props.unLoveTrack(this.props.track) :
      await this.props.loveTrack(this.props.track);
    console.log('Love Tracks:', this.props.lovedTracks);
    this.setState({loading: false});
  };

  isInLoveTrack = () => {
    const { lovedTracks, track } = this.props;
    return lovedTracks.find(lovedTrack => lovedTrack.name === track.name && lovedTrack.artist.name === track.artist.name);
  };

  render() {
    const { loading } = this.state;
    const { track, onPress, customStyle, lovedTracks } = this.props;
    const imageLink = track.image[1] ? track.image[1]['#text'] : null;
    const trackImage = imageLink ? {uri: imageLink} : require('../assets/images/lastfm.png');
    return (
      <TouchableOpacity onPress={onPress} style={[style.itemContainer, customStyle]}>
        <View>
          <Image source={trackImage} width={50} height={50} style={style.trackImage}/>
        </View>
        <View style={CommonStyle.flexOne}>
          <Text style={style.title}> {track.name} </Text>
          <Text style={style.duration}> Artist: {track.artist.name} </Text>
        </View>
        <TouchableOpacity onPress={this.onPressHeart} style={style.favoriteButton} disabaled={loading}>
          <Icon name={this.isInLoveTrack() ? 'heart' : 'heart-o'} size={20} color={Constants.alertColor}/>
        </TouchableOpacity>
        <Icon name="chevron-right" size={10} color={Constants.primaryTextColor} />
      </TouchableOpacity>
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

export const TrackListItem = connect(mapStateToProps, mapDispatchToProps)(_TrackListItem);

const style = EStyleSheet.create({
  itemContainer: {
    height: 60,
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)'
  },
  title: {
    flex: 1,
    color: '$primaryTextColor',
    fontSize: 18,
    lineHeight: 22,
  },
  duration: {
    flex: 1,
    color: '$primaryTextColor',
    fontSize: 14,
    opacity: 0.7,
    paddingTop: 4,
  },
  trackImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  favoriteButton: {
    paddingHorizontal: 10,
  }
});