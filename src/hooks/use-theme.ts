import { useEffect, useState } from 'react';
import { useLocalStorage } from './use-storage';

export function createThemeHook<T extends string[]>(options: createThemeHook.Options<T>) {
  const hook = () => {
    const [mode, setMode] = useLocalStorage<T[number] | 'auto'>('theme', 'auto');
    const [theme, setTheme] = useState<T[number]>(createThemeHook.getTheme(mode, options));

    useEffect(() => {
      if (mode === 'auto') {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const listener = (event: MediaQueryListEvent) => {
          setTheme(event.matches ? options.dark : options.light);
        };

        mediaQuery.addEventListener('change', listener);

        return () => {
          mediaQuery.removeEventListener('change', listener);
        };
      } else {
        setTheme(mode);
      }
    }, [mode, setTheme]);

    useEffect(() => {
      document.body.setAttribute('data-theme', theme);
    }, [theme]);

    return [mode, setMode, theme] as const;
  };

  hook.$modes = [...options.themes, 'auto'] as const;

  return hook;
}

/* c8 ignore start */
export namespace createThemeHook {
  /* c8 ignore end */

  export type Options<T extends string[]> = {
    /**
     * A list of the available themes.
     */
    themes: T;

    /**
     * This theme will be used when light mode is detected.
     */
    light: T[number];

    /**
     * This theme will be used when dark mode is detected.
     */
    dark: T[number];
  };

  export function getTheme<T extends string[]>(mode: T[number] | 'auto', options: Options<T>): T[number] {
    if (mode === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? options.dark : options.light;
    }

    return mode;
  }
}
