import { vi, describe, it, expect } from 'vitest';
import { Await, useLoaderData } from '../react-router';
import { useLoaderData as innerUseLoaderData, LoaderFunctionArgs, redirect } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

vi.mock('react-router-dom', async (importOriginal: any) => ({
  ...(await importOriginal()),
  useLoaderData: vi.fn(),
}));
const useLoaderDataMocked = vi.mocked(innerUseLoaderData);

describe('React Router Utils', () => {
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

    it('should support async data', async () => {
      const loader = async () => {
        return {
          hello: 'world',
        };
      };

      useLoaderDataMocked.mockReturnValue(await loader());

      const MyComponent = () => {
        const data = useLoaderData<typeof loader>();

        return data.hello;
      };

      render(<MyComponent />);

      await expect(screen.findByText('world')).resolves.toBeTruthy();
    });

    it('should exclude the response type', async () => {
      const loader = async ({ params }: LoaderFunctionArgs) => {
        if (!params.id) return redirect('/');

        return {
          hello: 'world',
        };
      };

      useLoaderDataMocked.mockReturnValue(
        await loader({
          params: {
            id: '12345',
          },
          request: {} as Request,
        })
      );

      const MyComponent = () => {
        const data = useLoaderData<typeof loader>();

        return data.hello;
      };

      render(<MyComponent />);

      await expect(screen.findByText('world')).resolves.toBeTruthy();
    });
  });

  describe('<Await/>', () => {
    it('should forward the type', async () => {
      render(<Await resolve={Promise.resolve({ hello: 'world' })}>{(data) => data.hello}</Await>);

      await expect(screen.findByText('world')).resolves.toBeTruthy();
    });
  });
});
