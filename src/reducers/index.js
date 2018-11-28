import { combineReducers } from 'redux';
import { mobileSession, lovedTracks } from './user';
import { countries } from './countries';

export default combineReducers({
  mobileSession,
  lovedTracks,
  countries
});
