import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { $useStorage, useLocalStorage, useSessionStorage } from '../use-storage';
import { delay, RibbonStorage } from '@ribbon-studios/js-utils';

describe('Storage Hooks', () => {
  afterEach(() => {
    RibbonStorage.reset();
    RibbonStorage.clear();
  });

  describe('hooks($useStorage)', () => {
    it('should retrieve values from storage', () => {
      RibbonStorage.local.set('hello', 'welt');

      const { result } = renderHook(() => $useStorage('local', 'hello'));

      const [value] = result.current;

      expect(value).toBe('welt');
    });

    it('should support updating values in storage', () => {
      RibbonStorage.local.set('hello', 'welt');

      const { result } = renderHook(() => $useStorage('local', 'hello'));

      const [, setValue] = result.current;

      setValue('welt');

      expect(RibbonStorage.local.get('hello')).toBe('welt');
    });

    it('should react to changes elsewhere', async () => {
      RibbonStorage.local.set('hello', 'world');

      const { result } = renderHook(() => $useStorage('local', 'hello'));

      expect(result.current?.[0]).toBe('world');

      RibbonStorage.local.set('hello', 'welt');

      await delay();

      expect(result.current?.[0]).toBe('welt');
    });

    it('should ignore changes to other keys', async () => {
      RibbonStorage.local.set('hello', 'world');

      const { result } = renderHook(() => $useStorage('local', 'hello'));

      expect(result.current?.[0]).toBe('world');

      RibbonStorage.local.set('hallo', 'welt');

      await delay();

      expect(result.current?.[0]).not.toBe('welt');
    });
  });

  describe('hooks(useLocalStorage)', () => {
    it('should be a shorthand for local storage', () => {
      RibbonStorage.local.set('hello', 'welt');

      const { result } = renderHook(() => useLocalStorage('hello'));

      const [value] = result.current;

      expect(value).toBe('welt');
    });
  });

  describe('hooks(useSessionStorage)', () => {
    it('should be a shorthand for session storage', () => {
      RibbonStorage.session.set('hello', 'welt');

      const { result } = renderHook(() => useSessionStorage('hello'));

      const [value] = result.current;

      expect(value).toBe('welt');
    });
  });
});
