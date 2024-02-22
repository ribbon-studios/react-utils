import { render } from '@testing-library/react';
import { useCachedState } from '../use-cached-state';
import Chance from 'chance';

const chance = new Chance();

describe('Cached State Hooks', () => {
  describe('hook(useCachedState)', () => {
    type ExampleComponentProps = {
      value: string;
    };

    function ExampleComponent({ value }: ExampleComponentProps) {
      const [internalValue] = useCachedState(() => value, [value]);

      return <div>{internalValue}</div>;
    }

    it('should cache the value', () => {
      const expectedValue = chance.string();

      const component = render(<ExampleComponent value={expectedValue} />);

      expect(component.getByText(expectedValue)).toBeTruthy();
    });
  });
});
