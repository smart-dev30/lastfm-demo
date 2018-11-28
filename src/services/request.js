import queryString from 'query-string';
import md5 from 'md5';
import { API_URL, API_KEY, API_USER, API_PASSWORD, API_SECRET, LOCAL_CONFIG } from '../../config';
import { Preferences, MOBILE_TOKEN } from './preferences';

export async function request(_url, { apiKey, apiSig, authorize, method, body, store, fullUrl }) {
  let url = _url;
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  };
  if (apiKey) {
    body = {
      api_key: API_KEY,
      ...body,
    }
  }
  if (authorize) {
    const token = await Preferences.getItem(MOBILE_TOKEN);
    if (token) {
      body = {
        ...body,
        sk: token,
      }
    } else {
      throw new Error('Missing Token');
    }
  }
  if (apiSig) {
    let rawString = '';
    const orderedBody = {};
    Object.keys(body).sort().forEach(function(key) {
      orderedBody[key] = body[key];
    });
    Object.keys(orderedBody).map(key => {
      rawString = rawString.concat(`${key}${orderedBody[key]}`);
    });

    rawString = `${rawString}${API_SECRET}`;
    const api_sig = md5(rawString);
    console.log('RAW String from object keys:', rawString);
    console.log('Md5 from object keys', api_sig);
    body.method && delete body.method;
    body = {
      ...body,
      api_sig,
    }
  }
  if ((method === 'post' || method === 'put' || method === 'delete') && body) {
    options.body = queryString.stringify(body);
  } else if (method === 'get' && body) {
    url += `?${queryString.stringify(body)}`;
  }
  const requestUrl = fullUrl ? url : `${API_URL}/${url}&format=json`;
  console.log('Url:', requestUrl);
  console.log('potions:', options);
  const response = await fetch(requestUrl, options);
  const result = await response.json();
  if (result.error) {
    throw new Error(result);
  }
  if (store) {
    const storageValue = store === MOBILE_TOKEN ? result.session.key : JSON.stringify(result);
    Preferences.setItem(store, storageValue).then();
  }
  return result;
}

export async function get(url, params) {
  return request(url, {
    ...params,
    method: 'get',
  });
}

export async function getWithFullUrl(url, params) {
  return request(url, {
    ...params,
    method: 'get',
    fullUrl: true,
  });
}

export async function post(url, params) {
  return request(url, {
    ...params,
    method: 'post',
  });
}

export async function put(url, params) {
  return request(url, {
    ...params,
    method: 'put',
  });
}

export async function remove(url, params) {
  return request(url, {
    ...params,
    method: 'delete',
  });
}
