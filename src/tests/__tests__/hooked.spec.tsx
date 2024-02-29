import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { hooked } from '../hooked';
import { useMemo } from 'react';

describe('utils(hooked)', () => {
  describe('fn(hooked)', () => {
    it('should support singular values without an array', () => {
      const useMyHook = (value: string) => useMemo(() => value, [value]);
      const HookedComponent = hooked(useMyHook);

      render(<HookedComponent hook={'test'} />);

      expect(screen.getByText('test')).toBeTruthy();
    });

    it('should support singular values with an array', () => {
      const useMyHook = (value: string) => useMemo(() => value, [value]);
      const HookedComponent = hooked(useMyHook);

      render(<HookedComponent hook={['test']} />);

      expect(screen.getByText('test')).toBeTruthy();
    });

    it('should handle multiple inputs', () => {
      const useMyHook = (value: string, otherValue: string) => useMemo(() => `${value} ${otherValue}`, [value]);
      const HookedComponent = hooked(useMyHook);

      render(<HookedComponent hook={['test', 'otherTest']} />);

      expect(screen.getByText('test otherTest')).toBeTruthy();
    });

    it('should handle no inputs', () => {
      const useMyHook = () => 'test';
      const HookedComponent = hooked(useMyHook);

      render(<HookedComponent />);

      expect(screen.getByText('test')).toBeTruthy();
    });

    describe('primitives', () => {
      it.each(['hello', 4, true, false])('should handle (%s)', (value) => {
        const useMyHook = () => value;
        const HookedComponent = hooked(useMyHook);

        render(<HookedComponent />);

        expect(screen.getByText(value.toString())).toBeTruthy();
      });
    });

    it('should handle undefined', () => {
      const useMyHook = () => undefined;
      const HookedComponent = hooked(useMyHook);

      render(<HookedComponent />);

      expect(screen.getByText('<undefined>')).toBeTruthy();
    });

    it('should handle objects', () => {
      const useMyHook = () => ({
        hello: 'world',
      });
      const HookedComponent = hooked(useMyHook);

      render(<HookedComponent />);

      expect(
        screen.getByText(
          JSON.stringify({
            hello: 'world',
          })
        )
      ).toBeTruthy();
    });
  });
});
