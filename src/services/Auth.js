import { post } from './request';
import { Preferences, MOBILE_TOKEN } from './preferences';
import { API_USER, API_PASSWORD } from '../../config';
export const Auth = {

  async getMobileSession() {
    return post('?method=auth.getMobileSession', { body: {
      method: 'auth.getMobileSession',
      password: API_PASSWORD,
      username: API_USER,
    }, apiKey: true, apiSig: 'auth.getMobileSession', store: MOBILE_TOKEN });
  },

  async isAuthenticated() {
    return Preferences.getItem(MOBILE_TOKEN);
  },

  async logout() {
    return Promise.all([
      Preferences.removeItem(MOBILE_TOKEN),
    ]);
  },

};
