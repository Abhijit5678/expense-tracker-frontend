import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);

const STORAGE_KEY = 'money-track-theme';

const getSystemTheme = () => (
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
);

export const ThemeProvider = ({ children }) => {
  const [themePreference, setThemePreference] = useState(() => (
    localStorage.getItem(STORAGE_KEY) || 'system'
  ));
  const [theme, setTheme] = useState(() => (
    localStorage.getItem(STORAGE_KEY) || getSystemTheme()
  ));

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const syncTheme = () => {
      setTheme(themePreference === 'system' ? getSystemTheme() : themePreference);
    };

    syncTheme();
    media.addEventListener('change', syncTheme);

    return () => media.removeEventListener('change', syncTheme);
  }, [themePreference]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');

    if (themePreference === 'system') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, themePreference);
    }
  }, [theme, themePreference]);

  const value = useMemo(() => ({
    theme,
    themePreference,
    setExplicitTheme: (nextTheme) => {
      setThemePreference(nextTheme);
    },
    toggleTheme: () => {
      setThemePreference((current) => {
        const base = current === 'system' ? getSystemTheme() : current;
        return base === 'dark' ? 'light' : 'dark';
      });
    },
    useSystemTheme: () => {
      setThemePreference('system');
    },
  }), [theme, themePreference]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
