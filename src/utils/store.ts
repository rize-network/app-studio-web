import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as store from 'store';
import * as AsyncStorage from 'src/utils/localstorage';

export default {
  save: (key: string, data: any) => {
    // localStorage.setItem(USER_KEY,JSON.stringify(user))
    store.set(key, data);
  },
  get: (key: string) => {
    // return JSON.parse(localStorage.getItem(USER_KEY)||'{}')
    return store.get(key) || {};
  },
  remove: (key: string) => {
    // localStorage.removeItem(USER_KEY)
    store.remove(key);
  },
};

const saveCurrentUrl = async (url) => {
  await AsyncStorage.write('@currentUrl', url);
};

export const useSaveCurrentUrl = () => {
  const location = useLocation();

  useEffect(() => {
    const currentUrl = location.pathname + location.search + location.hash;
    console.log('Current URL:', currentUrl);
    saveCurrentUrl(currentUrl); // Save the URL to AsyncStorage
  }, [location]);
};
