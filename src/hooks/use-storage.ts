import { useEffect, useState } from 'react';
import { RibbonStorage } from '@ribbon-studios/js-utils';

export function useLocalStorage<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>];
export function useLocalStorage<T>(
  key: string,
  defaultValue?: T
): [T | null, React.Dispatch<React.SetStateAction<T | null>>];
export function useLocalStorage<T>(
  key: string,
  defaultValue?: T
): [T | null, React.Dispatch<React.SetStateAction<T | null>>] {
  return $useStorage<T>('local', key, defaultValue);
}

export function useSessionStorage<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>];
export function useSessionStorage<T>(
  key: string,
  defaultValue?: T
): [T | null, React.Dispatch<React.SetStateAction<T | null>>];
export function useSessionStorage<T>(
  key: string,
  defaultValue?: T
): [T | null, React.Dispatch<React.SetStateAction<T | null>>] {
  return $useStorage<T>('session', key, defaultValue);
}

export function $useStorage<T>(
  type: 'local' | 'session',
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>];
export function $useStorage<T>(
  type: 'local' | 'session',
  key: string,
  defaultValue?: T
): [T | null, React.Dispatch<React.SetStateAction<T | null>>];
export function $useStorage<T>(
  type: 'local' | 'session',
  key: string,
  defaultValue?: T
): [T | null, React.Dispatch<React.SetStateAction<T | null>>] {
  const [value, setValue] = useState<T | null>(RibbonStorage[type].get<T>(key, defaultValue));

  useEffect(() => {
    const listener = (event: RibbonStorage.ChangeEvent) => {
      if (event.key !== key) return;

      setValue(event.value);
    };

    RibbonStorage.on('change', listener);

    return () => {
      RibbonStorage.off('change', listener);
    };
  }, [key]);

  useEffect(() => {
    RibbonStorage[type].set(key, value);
  }, [type, key, value]);

  return [value, setValue] as const;
}
