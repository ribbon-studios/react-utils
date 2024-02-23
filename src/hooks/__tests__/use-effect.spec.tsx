import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { useDidUpdateEffect } from '../use-effect';

describe('Efect Hooks', () => {
  describe('hook(useDidUpdateEffect)', () => {
    const fn = vi.fn();

    type ExampleComponentProps = {
      value?: string;
    };

    function ExampleComponent({ value }: ExampleComponentProps) {
      useDidUpdateEffect(fn, [value]);

      return <div />;
    }

    it('should not trigger on initial render', () => {
      render(<ExampleComponent />);

      expect(fn).not.toHaveBeenCalled();
    });

    it('should trigger on change', () => {
      const { rerender } = render(<ExampleComponent />);

      expect(fn).not.toHaveBeenCalled();

      rerender(<ExampleComponent value={'something'} />);

      expect(fn).toHaveBeenCalledTimes(1);
    });
  });
});
