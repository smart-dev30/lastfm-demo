import defaultState from './defaultState';
import { GET_ALL_COUNTRIES } from '../actions/types';

export const countries = (state = defaultState.countries, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return action.data;
    default:
      return state;
  }
};
