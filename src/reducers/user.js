import defaultState from './defaultState';
import { GET_MOBILE_SESSION, GET_LOVED_TRACKS } from '../actions/types';

export const mobileSession = (state = defaultState.mobileSession, action) => {
  switch (action.type) {
    case GET_MOBILE_SESSION:
      return action.data;
    default:
      return state;
  }
};

export const lovedTracks = (state = defaultState.lovedTracks, action) => {
  switch (action.type) {
    case GET_LOVED_TRACKS:
      return action.data;
    default:
      return state;
  }
};
