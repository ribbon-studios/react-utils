import { describe, it, expect } from 'vitest';
import { render, renderHook } from '@testing-library/react';
import { useCachedState } from '../use-cached-state';
import Chance from 'chance';

const chance = new Chance();

describe('Cached State Hooks', () => {
  describe('hook(useCachedState)', () => {
    type ExampleComponentProps = {
      value: string;
    };

    it('should cache the value', () => {
      const expectedValue = chance.string();

      const { result, rerender } = renderHook((value: string) => useCachedState(() => value, [value]));

      rerender(expectedValue);

      const [value] = result.current;

      expect(value).toBe(expectedValue);
    });
  });
});
