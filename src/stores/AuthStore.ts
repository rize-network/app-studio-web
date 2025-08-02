import { create } from 'zustand';
import * as AsyncStorage from 'src/utils/localstorage';
import { AuthService, OpenAPI } from 'src/services/api';
import { setToken } from 'src/utils/request';

type User = {
  id: string;
  blocked: boolean;
  createdAt: string;
  image?: any;
  imageUrl?: string;
  inactive: boolean;
  language: string;
  birthdate: string;
  email: string;
  enterprise: string;
  textModel: string;
  name: string;
  textProvider: string;
  role: string;
  updatedAt: string;
};

type AuthState = {
  isAuthentificated: boolean;
  token: boolean | string;
  location: string;
  device: boolean;
  user: null | User;
  setLocation: (location: any) => void;
  account: any;
  setAccount: (account: any) => void;
  setToken: (token: string, me?: any, onSuccess?: Function) => void;
  login: (params: any, onSuccess?: Function) => void;
  logout: (location?: string) => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthentificated: false,
  token: false,
  device: false,
  user: null,
  account: null,
  setAccount: (account) => set({ account }),
  location: '/',
  setLocation: (location) => set({ location }),

  setToken: async (token, me, onSuccess) => {
    try {
      if (token) {
        setToken(token);
        await AsyncStorage.write('@token', token);
        //   await AsyncStorage.write('@email', email);

        const storedToken = await AsyncStorage.read('@token');

        try {
          OpenAPI.HEADERS = {
            Authorization: `Bearer ${storedToken}`,
          };
          if (me) {
            await set({
              token: storedToken,
              isAuthentificated: true,
              user: me,
            });
            // Sync user language with LocaleStore
          } else {
            const response: any = await AuthService.authUserControllerMe();
            if (response.data) {
              await set({
                token: storedToken,
                isAuthentificated: true,
                user: response.data,
              });
            }
          }
          if (onSuccess) {
            onSuccess();
          }
          const location = get().location;

          if (location !== '/' && window.location.href !== location) {
            window.location.href = location;
          }
        } catch (e) {
          console.warn(e);
          set({ isAuthentificated: false, token: false });
        }
      } else {
        await AsyncStorage.remove('@token');
        set({ token: false });
      }
    } catch (error) {
      console.warn(error);
      set({ isAuthentificated: false, token: false });
    }
  },

  login: async (params, onSuccess) => {
    try {
      const {
        data: { token, me },
      } = await AuthService.authUserControllerSignIn(params);
      console.log('token', token);
      useAuthStore.getState().setToken(token, me, onSuccess);
    } catch (error) {
      console.warn(error);
      // Handle error
    }
  },

  logout: async (location = '/') => {
    set({ isAuthentificated: false, token: false, user: null, location });
    OpenAPI.HEADERS = {};
    await AsyncStorage.remove('@token');
    await AsyncStorage.remove('@email');

    return true;
  },
}));

export const isAuthentificated = () => {
  try {
    return useAuthStore.getState().isAuthentificated;
  } catch {}
  return false;
};

(async () => {
  const token = await AsyncStorage.read('@token');
  const email = await AsyncStorage.read('@email');
  if (typeof token == 'string') {
    useAuthStore.getState().setToken(token);
  } else {
    useAuthStore.getState().logout();
  }
})();
