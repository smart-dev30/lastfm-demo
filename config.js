import * as App from './app.json';

export const APP_VERSION = App.version;
export const APP_NAME = App.displayName;
export const API_URL = `https://ws.audioscrobbler.com/2.0`;
export const API_KEY = 'a71302e383f012663a2ad00aa7916765';
export const API_SECRET = '126fa22d2fc0c07fcf83e4d31e0b3edb';
export const API_USER = 'revdane';
export const API_PASSWORD = 'stHNb8Liy5Rp3SE!';
export const LOCAL_CONFIG = {
  ENV: App.env,
  SERVER_URL: App.server_url,
  APP_NAME,
  APP_VERSION,
  API_URL,
  API_KEY,
  API_USER,
  API_PASSWORD,
  API_SECRET,
};