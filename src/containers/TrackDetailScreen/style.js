import EStyleSheet from 'react-native-extended-stylesheet';

export const styles = EStyleSheet.create({
  albumContainer: {
    position: 'relative',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftPadding: {
    paddingLeft: 30,
  },
  albumImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '$alertColor',
    borderWidth: 1,
  },
  albumTitle: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  favoriteButton: {
    position: 'absolute',
    right: '44%',
    bottom: '20%',
  },

  subContainer: {
    padding: 10,
    position: 'relative',
  },
  artistTitle: {
    fontSize: 14,
    color: '$primaryColor'
  },
  trackTitleWrapper: {
    paddingVertical: 10,
    flexDirection: 'row'
  },
  trackTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  trackDuration: {
    fontSize: 20,
    paddingLeft: 10,
  },
  borderBottom: {
    position: 'absolute',
    bottom: 0,
    height: 1,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  description: {
    color: '$primaryTextColor',
    opacity:  0.5,
    fontSize: 14,
    lineHeight: 30,
  },
  contentText: {
    color: '$primaryTextColor',
    fontSize: 17,
  },
  contentWiki: {
    paddingHorizontal: 2,
    paddingTop: 10
  },
  moreButton: {
    color: '$primaryColor',
    fontSize: 15,
  },
  moreButtonContainer: {
    marginTop: 10,
    marginBottom: 30,
    alignItems: 'flex-end'
  }
});