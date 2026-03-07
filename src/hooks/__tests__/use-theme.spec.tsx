import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, Mocked, vi } from 'vitest';
import { createThemeHook } from '../use-theme';
import { RibbonStorage } from '@ribbon-studios/js-utils';

describe('Theme Hook', () => {
  afterEach(() => {
    RibbonStorage.clear();
  });

  describe('fn(createThemeHook)', () => {
    it('should support changing the theme', async () => {
      const useThemeHook = createThemeHook({
        themes: ['light', 'dark'] as const,
        light: 'light',
        dark: 'dark',
      });

      const { result, rerender } = renderHook(() => useThemeHook());

      const setMode = result.current[1];

      expect(result.current[0]).toBe('auto');
      expect(result.current[2]).toBe('light');

      setMode('dark');

      rerender();

      expect(result.current[0]).toBe('dark');
      expect(result.current[2]).toBe('dark');
    });

    it('should react to the preferred color scheme changing', async () => {
      const mediaQuery = {
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      } as unknown as Mocked<MediaQueryList>;

      vi.spyOn(window, 'matchMedia').mockReturnValue(mediaQuery);

      const useThemeHook = createThemeHook({
        themes: ['light', 'dark'] as const,
        light: 'light',
        dark: 'dark',
      });

      const { result, rerender } = renderHook(() => useThemeHook());

      expect(result.current[0]).toBe('auto');
      expect(result.current[2]).toBe('light');

      const listener = mediaQuery.addEventListener.mock.calls[0][1] as (ev: MediaQueryListEvent) => any;

      listener(
        new MediaQueryListEvent('change', {
          matches: true,
        })
      );

      rerender();

      expect(result.current[2]).toBe('dark');
    });

    it('should support preferring light mode', async () => {
      const mediaQuery = {
        addEventListener: vi.fn().mockImplementation((_, listener) => {
          listener({
            matches: false,
          });
        }),
        removeEventListener: vi.fn(),
      } as unknown as Mocked<MediaQueryList>;

      vi.spyOn(window, 'matchMedia').mockReturnValue(mediaQuery);

      const useThemeHook = createThemeHook({
        themes: ['light', 'dark'] as const,
        light: 'light',
        dark: 'dark',
      });

      const { result } = renderHook(() => useThemeHook());

      expect(result.current[0]).toBe('auto');
      expect(result.current[2]).toBe('light');
    });
  });
});
