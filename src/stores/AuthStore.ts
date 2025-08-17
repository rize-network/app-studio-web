import { create } from 'zustand';
import * as AsyncStorage from 'src/utils/localstorage';
import { AuthService } from 'src/services/api';
import { setToken } from 'src/utils/request';
import { setApiToken, clearApiToken } from 'src/utils/apiConfig';

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
  isInitialized: boolean;
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
  isInitialized: false,
  setAccount: (account) => set({ account }),
  location: '/',
  setLocation: (location) => set({ location }),

  setToken: async (token, me, onSuccess) => {
    try {
      if (token) {
        // Set token in both the utility function and OpenAPI directly
        setToken(token);
        await AsyncStorage.write('@token', token);

        const storedToken = await AsyncStorage.read('@token');

        try {
          // Set the token in OpenAPI configuration for API requests
          setApiToken(storedToken);

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
        clearApiToken();
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
    // Clear the token from OpenAPI configuration
    clearApiToken();
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
    useAuthStore.getState().setToken(token, undefined, () => {
      useAuthStore.setState({ isInitialized: true });
    });
  } else {
    useAuthStore.getState().logout();
    useAuthStore.setState({ isInitialized: true });
  }
})();
