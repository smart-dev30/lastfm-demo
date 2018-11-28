import { Auth, ApiService } from '../services';
import { GET_MOBILE_SESSION, GET_LOVED_TRACKS } from './types';

export function getMobileSession(){
  return async (dispatch) => {

    try {
      const { session } = await Auth.getMobileSession();
      dispatch({type: GET_MOBILE_SESSION, data: session.key});

    } catch (error) {
      console.log(`ERROR - GET_MOBILE_SESSION: ${JSON.stringify(error)}`);
    }
  };
}

export function getLovedTracks(){
  return async (dispatch) => {

    try {
      const { lovedtracks } = await ApiService.getLovedTracks();
      dispatch({type: GET_LOVED_TRACKS, data: lovedtracks.track});

    } catch (error) {
      console.log(`ERROR - GET_LOVED_TRACKS: ${JSON.stringify(error)}`);
    }
  };
}

export function loveTrack(track){
  return async (dispatch) => {
    try {
      const result = await ApiService.loveTrack({
        track: track.name,
        artist: track.artist.name,
      });
      console.log('Love Track Success', result);
      const { lovedtracks } = await ApiService.getLovedTracks();
      dispatch({type: GET_LOVED_TRACKS, data: lovedtracks.track});

    } catch (error) {
      console.log(`ERROR - GET_LOVED_TRACKS after LOVE TRACK: ${JSON.stringify(error)}`);
    }
  };
}

export function unLoveTrack(track){
  return async (dispatch) => {
    try {
      const result = await ApiService.unLoveTrack({
        track: track.name,
        artist: track.artist.name,
      });
      console.log('UnLove Track Success', result);
      const { lovedtracks } = await ApiService.getLovedTracks();
      dispatch({type: GET_LOVED_TRACKS, data: lovedtracks.track});

    } catch (error) {
      console.log(`ERROR - GET_LOVED_TRACKS after UNLOVE TRACK: ${JSON.stringify(error)}`);
    }
  };
}