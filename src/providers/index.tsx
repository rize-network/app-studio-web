import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useMemo,
} from 'react';
import { ResponsiveProvider, ThemeProvider } from 'app-studio';
import { RouterProvider } from 'src/providers/Router';

interface ThemeModeContextType {
  mode: 'light' | 'dark';
  toggleThemeMode: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextType | undefined>(
  undefined
);

export const useThemeActions = () => {
  const context = useContext(ThemeModeContext);
  if (!context)
    throw new Error('useThemeActions must be used within a ThemeModeProvider');
  return context;
};

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const themeModeValue = useMemo(
    () => ({
      mode,
      toggleThemeMode: () =>
        setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    [mode]
  );

  return (
    <ThemeModeContext.Provider value={themeModeValue}>
      <ThemeProvider
        mode={mode}
        theme={{
          primary: 'color.blue.500',
          secondary: 'color.purple.500',
        }}
      >
        <ResponsiveProvider
          breakpoints={{
            xs: 0,
            sm: 340,
            md: 560,
            lg: 1080,
            xl: 1300,
          }}
          devices={{
            mobile: ['xs', 'sm'],
            tablet: ['md', 'lg'],
            desktop: ['lg', 'xl'],
          }}
        >
          <RouterProvider>{children}</RouterProvider>
        </ResponsiveProvider>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default Wrapper;
