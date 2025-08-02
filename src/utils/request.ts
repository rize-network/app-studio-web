//import * as message from 'src/utils/message';
import queryString, { stringify } from 'qs';
import { API_URL, DEFAULT_LANGUAGE } from 'src/configs/AppConfig';
import { read } from './localstorage';
import { isBrowser } from 'src/utils/env';
import { OpenAPI } from 'src/services/api';

async function checkStatus(response: any, url: string, params: any, options = { silent: false }) {
  if (response) {
    const json = await response.json();

    if (response.status >= 200 && response.status < 300) {
      try {
        if (json.data !== undefined) {
          console.info(`[${url}]`, json.data);
          return json.data;
        } else {
          console.info(`[${url}]`, json);

          return json;
        }
      } catch (e) {
        console.warn(`${url} =>`, e);
      }
    }

    // if (response.status === 401) {
    //   useAuthStore.getState().logout();
    // }

    if (isBrowser()) {
      console.log(`${url} =>`, json);
    }

    if (json) {
      const error = json.message ? new Error(json.message) : new Error(`Erreur ${response.status}`);

      // console.table(error);

      if (!options.silent) {
        if (json.errors !== null && json.errors) {
          Object(json.errors)
            .keys()
            .map((key: string) => {
              if (json.message.toLowerCase().indexOf(key.toLowerCase()) >= 0) {
                // getForm().setFieldError(key, json.errors[key]);
              }
            });
        } else if (json.message) {
          Object(params)
            .keys()
            .map((key: string) => {
              if (json.message.toLowerCase().indexOf(key.toLowerCase()) >= 0) {
                //getForm().setFieldError(key, json.message);
              }
            });
        }

        // message.error(error);

        throw error;
      }
    }
  } else {
    return false;
  }
}
// });

/**
 * apis a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to api
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

interface RequestProps {
  url: string;
  method: string;
  params?: any;
  options?: any;
}

export function request({ url, method = 'GET', params = {}, options = {} }: RequestProps) {
  let body;
  const headers: any = {};
  headers.locale = getLocale();

  if (method === 'GET') {
    const query = stringify(params);
    url = `${url}?${query}`;
  } else {
    body = JSON.stringify(params);
  }

  if (url.indexOf('http') === -1) {
    url = API_URL + url;
    headers.Accept = 'application/json';
    headers['Content-Type'] = 'application/json';

    let accessToken = read('accessToken');

    if (params.access_token !== undefined) {
      accessToken = params.access_token;
    }

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    if (method !== 'GET') {
      headers['Cache-Control'] = 'no-cache';
    }
  }

  // if (isBrowser()) {
  console.info(`[${method}] ${url} => `, body, headers);
  //}

  return fetch(url, {
    //mode: 'no-cors',
    method,
    headers,
    body,
  })
    .then((response) => checkStatus(response, url, params, options))
    .catch((e: Error) => console.error(e));
}

export const remove = async (url: string, params = {}) => {
  return request({
    url,
    method: 'DELETE',
    params,
  });
};

export const post = async (url: string, params = {}) => {
  return request({
    url,
    method: 'POST',
    params,
  });
};

export const patch = async (url: string, params = {}) => {
  return request({
    url,
    method: 'PATCH',
    params,
  });
};

export const put = async (url: string, params = {}) => {
  return request({
    url,
    method: 'PUT',
    params,
  });
};

export const get = async (url: string, params = {}) => {
  return request({
    url,
    method: 'GET',
    params,
  });
};

interface UploadRequestProps {
  url: string;
  file: any;
  params?: any;
  onProgress?: Function;
  onSuccess?: Function;
  onFailure?: Function;
}

export const upload = async ({ file, url, onProgress, onSuccess, onFailure }: UploadRequestProps) => {
  if (isBrowser()) {
    let xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (e) => {
      const progress = Math.round((e.loaded * 100.0) / e.total);

      if (onProgress) {
        onProgress(progress);
      }

      console.log(`fileuploadprogress data.loaded: ${e.loaded},
  data.total: ${e.total}`);
    });

    xhr.onreadystatechange = function onreadystatechange() {
      if (xhr.readyState === 4) {
        console.log('readyState', xhr.readyState);

        let response;
        try {
          response = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300) {
            // File uploaded successfully
            // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
            // Create a thumbnail of the uploaded image, with 150px width

            if (response.success) {
              if (onSuccess) {
                onSuccess(response);
              }
              console.log('success', response);
            }
          } else {
            if (onFailure) {
              onFailure(response);
            }
            console.log('failure', response);
          }
        } catch (e) {
          if (onFailure) {
            onFailure(response);
          }
          console.log('failure', response);
        }
      }
    };

    url = url.indexOf('//') === -1 ? API_URL + url : url;
    console.log('url', url, access_token);

    if (access_token && xhr) {
      xhr.open('POST', `${url}?accessToken=${access_token}`, true);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.setRequestHeader('Authorization', `Bearer ${access_token}`);

      const formData = new FormData();

      formData.append('accessToken', access_token);
      formData.append('file', file);
      console.log('formData', formData);

      xhr.send(formData);
    }
  }
};

let locale = DEFAULT_LANGUAGE;

export async function setLocale(newLocale: string) {
  locale = newLocale;
  OpenAPI.HEADERS = { locale: newLocale };
}

export function getLocale() {
  return locale;
}

let access_token = '';

export async function setToken(token: string) {
  access_token = token;
  OpenAPI.TOKEN = token;
}

export function getToken() {
  return access_token === 'string' ? access_token : '';
}

OpenAPI.BASE = API_URL;

const googleApiUrl = 'https://maps.googleapis.com/maps/api';

export const googleApi = {
  details(params: any) {
    const query = queryString.stringify({
      ...params,
      radius: '50000',
      language: 'fr',
      components: 'country:fr',
      key: 'AIzaSyCdV54dOszL-uIsWABe5m-74LUd-NUdMN8',
    });
    const url = `${googleApiUrl}/place/details/json?${query}`;

    return fetch(url).then(async (response) => {
      if (response.status === 200) {
        const json = await response.json();
        console.log(json);

        return json;
      }

      throw response.status;
    });
  },
  autocomplete(params: any) {
    const query = queryString.stringify({
      ...params,
      radius: '50000',
      language: 'fr',
      components: 'country:fr',
      key: 'AIzaSyCdV54dOszL-uIsWABe5m-74LUd-NUdMN8',
    });
    const url = `${googleApiUrl}/place/autocomplete/json?${query}`;

    return fetch(url).then(async (response) => {
      if (response.status === 200) {
        const json = await response.json();
        console.log(json);
        return json;
      }

      throw response.status;
    });
  },
  geocode(params: any) {
    const query = queryString.stringify({
      ...params,
      key: 'AIzaSyCdV54dOszL-uIsWABe5m-74LUd-NUdMN8',
    });

    const url = `${googleApiUrl}/geocode/json?${query}`;

    return fetch(url).then(async (response) => {
      if (response.status === 200) {
        const json = await response.json();
        console.log(json);

        return json;
      }

      throw response.status;
    });
  },
};
