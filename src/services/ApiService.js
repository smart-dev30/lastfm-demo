import { getWithFullUrl, get, post } from './request';
import { Preferences, ALL_COUNTRIES } from './preferences';
import { API_USER, API_PASSWORD } from '../../config';

export const ApiService = {
  async getAllCountries() {
    let allCountries = await Preferences.parseJsonItem(ALL_COUNTRIES);
    if (!allCountries) {
      allCountries = await getWithFullUrl('https://restcountries.eu/rest/v2/all', {store: ALL_COUNTRIES});
    }
    return allCountries;
  },

  async getTopTracks(body) {
    return get('', {
      body: {
        method: 'geo.gettoptracks',
        ...body,
      },
      apiKey: true,
    });
  },

  async getLovedTracks() {
    return get('', { body: {
      method: 'user.getLovedTracks',
      username: API_USER,
    }, apiKey: true });
  },

  async loveTrack(body) {
    return post('?method=track.love', { body: {
      method: 'track.love',
      track: body.track,
      artist: body.artist,
    }, apiKey: true, apiSig: 'track.love', authorize: true });
  },

  async unLoveTrack(body) {
    return post('?method=track.unlove', { body: {
      method: 'track.unlove',
      track: body.track,
      artist: body.artist,
    }, apiKey: true, apiSig: 'track.unlove', authorize: true });
  },

  async getTrackDetail(body) {
    return get('', {
      body: {
        method: 'track.getInfo',
        ...body,
      },
      apiKey: true,
    });
  }
};
