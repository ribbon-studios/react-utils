import { vi, describe, it, expect } from 'vitest';
import { defer, useLoaderData } from '../react-router';
import { useLoaderData as innerUseLoaderData } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

vi.mock('react-router-dom', async (importOriginal: any) => ({
  ...(await importOriginal()),
  useLoaderData: vi.fn(),
}));
const useLoaderDataMocked = vi.mocked(innerUseLoaderData);

describe('React Router Utils', () => {
  describe('fn(defer)', () => {
    it('should map the type correctly', () => {
      const deferred = defer({
        test: ['hello world'],
        other_test: 1234,
      });

      expect(deferred.data.test).toEqual(['hello world']);
      expect(deferred.data.other_test).toEqual(1234);
    });
  });

  describe('fn(useLoaderData)', () => {
    it('should support basic data', async () => {
      const loader = () => ({
        hello: 'world',
      });

      useLoaderDataMocked.mockReturnValue(loader());

      const MyComponent = () => {
        const data = useLoaderData<typeof loader>();

        return data.hello;
      };

      render(<MyComponent />);

      await expect(screen.findByText('world')).resolves.toBeTruthy();
    });

    it('should support basic promises', async () => {
      const loader = async () => ({
        hello: await Promise.resolve('world'),
      });

      useLoaderDataMocked.mockReturnValue(await loader());

      const MyComponent = () => {
        const data = useLoaderData<typeof loader>();

        return data.hello;
      };

      render(<MyComponent />);

      await expect(screen.findByText('world')).resolves.toBeTruthy();
    });

    it('should support deferring', async () => {
      const loader = () => {
        return defer({
          hello: 'world',
        });
      };

      useLoaderDataMocked.mockReturnValue(loader().data);

      const MyComponent = () => {
        const data = useLoaderData<typeof loader>();

        return data.hello;
      };

      render(<MyComponent />);

      await expect(screen.findByText('world')).resolves.toBeTruthy();
    });
  });
});
