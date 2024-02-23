import { describe, it, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import Chance from 'chance';
import { useSubtleCrypto } from '../use-subtle-crypto';
import { Algorithms, hash } from '../../utils/subtle-crypto';

const chance = new Chance();

describe('Crypto Hooks', () => {
  describe('hook(useSubtleCrypto)', () => {
    type ExampleComponentProps = {
      algorithm?: Algorithms;
      value?: string;
      defaultValue?: string;
    };

    function ExampleComponent({ algorithm, value, defaultValue }: ExampleComponentProps) {
      const hashedValue = useSubtleCrypto(algorithm, value, defaultValue);

      return <div data-testid="example">{hashedValue}</div>;
    }

    it('should cache the value', async () => {
      const algorithm: Algorithms = 'SHA-256';
      const value = chance.string();
      const expectedValue = await hash(algorithm, value);

      const component = render(<ExampleComponent algorithm={algorithm} value={value} />);

      await waitFor(() => expect(component.getByTestId('example').innerText).toEqual(expectedValue));
    });

    it('should support an optional algorithm', async () => {
      const algorithm = undefined;
      const value = chance.string();
      const defaultValue = 'hello';
      const expectedValue = await hash(algorithm, value, defaultValue);

      const component = render(<ExampleComponent algorithm={algorithm} value={value} defaultValue={defaultValue} />);

      await waitFor(() => expect(component.getByTestId('example').innerText).toEqual(expectedValue));
    });

    it('should support default values', async () => {
      const algorithm: Algorithms = 'SHA-256';
      const value = chance.string();
      const defaultValue = 'hello';
      const originalExpectedValue = await hash(algorithm, undefined, defaultValue);
      const expectedValue = await hash(algorithm, undefined, defaultValue);

      const component = render(<ExampleComponent algorithm={algorithm} value={value} defaultValue={defaultValue} />);

      await waitFor(() => expect(component.getByTestId('example').innerText).toEqual(originalExpectedValue));

      component.rerender(<ExampleComponent algorithm={algorithm} value={undefined} defaultValue={defaultValue} />);

      await waitFor(() => expect(component.getByTestId('example').innerText).toEqual(expectedValue));
    });
  });
});
