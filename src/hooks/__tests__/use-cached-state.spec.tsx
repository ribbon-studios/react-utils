import { render } from '@testing-library/react';
import { useCachedState, useReadOnlyCachedState } from '../use-cached-state';
import Chance from 'chance';

const chance = new Chance();

type ExampleComponentProps = {
  value: string;
};

describe('Cached State Hooks', () => {
  describe('hook(useCachedState)', () => {
    function ExampleComponent({
      value
    }: ExampleComponentProps) {
      const [internalValue] = useCachedState(() => value, [value]);

      return (
        <div>{internalValue}</div>
      );
    }

    it('should cache the value', () => {
      const expectedValue = chance.string();

      const component = render(<ExampleComponent value={expectedValue} />);

      expect(component.getByText(expectedValue)).toBeTruthy();
    });
  });

  describe('hook(useReadOnlyCachedState)', () => {
    function ExampleComponent({
      value
    }: ExampleComponentProps) {
      const internalValue = useReadOnlyCachedState(() => value, [value]);

      return (
        <div>{internalValue}</div>
      );
    }

    it('should cache the value', () => {
      const expectedValue = chance.string();

      const component = render(<ExampleComponent value={expectedValue} />);

      expect(component.getByText(expectedValue)).toBeTruthy();
    });
  });
});
