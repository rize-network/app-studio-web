//import { message } from 'antd';
import { isBrowser } from 'src/utils/env';
import store from 'src/utils/store';

export const read = (key: string) => {
  if (isBrowser()) {
    return store.get(key);
  }
  return undefined;
};

export const readObject = (key: string) => {
  const text: any = read(key);
  let obj = {};
  try {
    if (text) {
      obj = JSON.parse(text);
    }
  } catch (error) {
    // message.error(error);
  }
  return obj;
};

export const write = (key: string, data: any) => {
  if (isBrowser()) {
    return store.save(key, data);
  }
  return undefined;
};

export const writeObject = (key: string, data: any) => {
  const text = JSON.stringify(data);
  store.save(key, text);
};

export const remove = (key: string) => {
  if (isBrowser()) {
    store.remove(key);
  }
};
