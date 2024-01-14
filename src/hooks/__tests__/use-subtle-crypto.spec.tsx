import { render, waitFor } from '@testing-library/react';
import Chance from 'chance';
import { useSubtleCrypto } from '../use-subtle-crypto';
import { hash } from '../../utils/subtle-crypto';

const chance = new Chance();

describe('Crypto Hooks', () => {
  describe('hook(useSubtleCrypto)', () => {
    type ExampleComponentProps = {
      value: string;
    };

    function ExampleComponent({ value }: ExampleComponentProps) {
      const hashedValue = useSubtleCrypto('SHA-256', value);

      return <div data-testid="example">{hashedValue}</div>;
    }

    it('should cache the value', async () => {
      const value = chance.string();
      const expectedValue = await hash('SHA-256', value);

      const component = render(<ExampleComponent value={value} />);

      await waitFor(() => expect(component.getByText(expectedValue)).toBeTruthy());
    });
  });
});
