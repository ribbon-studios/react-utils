import { render } from '@testing-library/react';
import { useCachedState, useClassNames, useReadOnlyCachedState } from '../use-cached-state';
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

  describe('hook(useReadOnlyCachedState)', () => {
    type ExampleComponentProps = {
      value: string;
    };

    function ExampleComponent({ value }: ExampleComponentProps) {
      const internalValue = useReadOnlyCachedState(() => value, [value]);

      return <div>{internalValue}</div>;
    }

    it('should cache the value', () => {
      const expectedValue = chance.string();

      const component = render(<ExampleComponent value={expectedValue} />);

      expect(component.getByText(expectedValue)).toBeTruthy();
    });
  });

  describe('hook(useClassNames)', () => {
    type ExampleComponentProps = {
      sticky?: boolean;
    };

    function ExampleComponent({ sticky }: ExampleComponentProps) {
      const classes = useClassNames(['my-class', sticky && 'sticky']);

      return <div data-testid="example" className={classes} />;
    }

    it('should support base classes', () => {
      const component = render(<ExampleComponent />);

      expect(component.getByTestId('example').className).toEqual('my-class');
    });

    it('should support conditional classes', () => {
      const component = render(<ExampleComponent sticky />);

      expect(component.getByTestId('example').className).toEqual('my-class sticky');
    });
  });
});
