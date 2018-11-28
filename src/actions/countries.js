import { ApiService } from '../services';
import { GET_ALL_COUNTRIES } from './types';

export function getAllCountries(){
  return async (dispatch) => {

    try {
      const data = await ApiService.getAllCountries();
      dispatch({type: GET_ALL_COUNTRIES, data});
    } catch (error) {
      console.log(`ERROR - GET_ALL_COUNTRIES: ${JSON.stringify(error)}`);
    }
  };
}