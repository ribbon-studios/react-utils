import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { wrap } from '../wrap';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from '../libs/react-router';
import { QueryClientProvider } from '../libs/react-query';

describe('utils(wrap)', () => {
  describe('fn(wrap)', () => {
    it('should support not providing props', async () => {
      const Component = wrap(Router);

      const MyComponent = await Component(() => (
        <Routes>
          <Route index element={'Index'} />
        </Routes>
      ));

      render(<MyComponent />);

      expect(screen.getByText('Index')).toBeTruthy();
    });

    it('should support options as direct props', async () => {
      const Component = wrap(Router, {
        initialEntries: ['/profile'],
      });

      const MyComponent = await Component(() => (
        <Routes>
          <Route path="/profile" element={'Profile'} />
        </Routes>
      ));

      render(<MyComponent />);

      expect(screen.getByText('Profile')).toBeTruthy();
    });

    it('should support options as a function that returns the props', async () => {
      const Component = wrap(Router, () => ({
        initialEntries: ['/profile'],
      }));

      const MyComponent = await Component(() => (
        <Routes>
          <Route path="/profile" element={'Profile'} />
        </Routes>
      ));

      render(<MyComponent />);

      expect(screen.getByText('Profile')).toBeTruthy();
    });

    it('should providing components via promises', async () => {
      const Component = wrap(Router);

      const MyComponent = await Component(
        Promise.resolve(() => (
          <Routes>
            <Route index element={'Index'} />
          </Routes>
        ))
      );

      render(<MyComponent />);

      expect(screen.getByText('Index')).toBeTruthy();
    });

    it('should providing components via react routers async Component format', async () => {
      const Component = wrap(Router);

      const MyComponent = await Component(
        Promise.resolve({
          Component: () => (
            <Routes>
              <Route index element={'Index'} />
            </Routes>
          ),
        })
      );

      render(<MyComponent />);

      expect(screen.getByText('Index')).toBeTruthy();
    });

    it('should providing components via default async exports', async () => {
      const Component = wrap(Router);

      const MyComponent = await Component(
        Promise.resolve({
          default: () => (
            <Routes>
              <Route index element={'Index'} />
            </Routes>
          ),
        })
      );

      render(<MyComponent />);

      expect(screen.getByText('Index')).toBeTruthy();
    });

    it('should providing components via default async exports', async () => {
      const mockOptions = jest.fn();
      const Component = wrap(Router, mockOptions);

      const MyComponent = await Component(
        Promise.resolve({
          default: () => (
            <Routes>
              <Route index element={'Index'} />
            </Routes>
          ),
        })
      );

      expect(mockOptions).toHaveBeenCalledTimes(0);

      render(<MyComponent />);

      expect(mockOptions).toHaveBeenCalledTimes(1);

      const { rerender } = render(<MyComponent />);

      expect(mockOptions).toHaveBeenCalledTimes(2);

      rerender(<MyComponent />);

      expect(mockOptions).toHaveBeenCalledTimes(2);
    });
  });

  describe('fn(wrap.concat)', () => {
    describe('sync', () => {
      it('should support basic component syntax', async () => {
        const KitchenSink = wrap.concat(MemoryRouter, QueryClientProvider);

        const MyComponent = await KitchenSink(({ value }: { value: string }) => {
          const { data, isSuccess } = useQuery({
            queryKey: [],
            queryFn: async () => 'hello world!',
          });

          return (
            <>
              {isSuccess && <div data-testid="query">{data}</div>}
              <Routes>
                <Route index element={value} />
              </Routes>
            </>
          );
        });

        render(<MyComponent value={'Index'} />);

        expect(screen.findByTestId('query')).toBeTruthy();
        expect(screen.getByText('Index')).toBeTruthy();
      });

      it('should support react routers component syntax', async () => {
        const KitchenSink = wrap.concat(MemoryRouter, QueryClientProvider);

        const MyComponent = await KitchenSink({
          Component: ({ value }: { value: string }) => {
            const { data, isSuccess } = useQuery({
              queryKey: [],
              queryFn: async () => 'hello world!',
            });

            return (
              <>
                {isSuccess && <div data-testid="query">{data}</div>}
                <Routes>
                  <Route index element={value} />
                </Routes>
              </>
            );
          },
        });

        render(<MyComponent value={'Index'} />);

        expect(screen.findByTestId('query')).toBeTruthy();
        expect(screen.getByText('Index')).toBeTruthy();
      });
    });

    describe('async', () => {
      it('should support basic component syntax', async () => {
        const KitchenSink = wrap.concat(MemoryRouter, QueryClientProvider);

        const MyComponent = await KitchenSink(
          Promise.resolve(({ value }: { value: string }) => {
            const { data, isSuccess } = useQuery({
              queryKey: [],
              queryFn: async () => 'hello world!',
            });

            return (
              <>
                {isSuccess && <div data-testid="query">{data}</div>}
                <Routes>
                  <Route index element={value} />
                </Routes>
              </>
            );
          })
        );

        render(<MyComponent value={'Index'} />);

        expect(screen.findByTestId('query')).toBeTruthy();
        expect(screen.getByText('Index')).toBeTruthy();
      });
    });

    it('should support react routers component syntax', async () => {
      const KitchenSink = wrap.concat(MemoryRouter, QueryClientProvider);

      const MyComponent = await KitchenSink(
        Promise.resolve({
          Component: ({ value }: { value: string }) => {
            const { data, isSuccess } = useQuery({
              queryKey: [],
              queryFn: async () => 'hello world!',
            });

            return (
              <>
                {isSuccess && <div data-testid="query">{data}</div>}
                <Routes>
                  <Route index element={value} />
                </Routes>
              </>
            );
          },
        })
      );

      render(<MyComponent value={'Index'} />);

      expect(screen.findByTestId('query')).toBeTruthy();
      expect(screen.getByText('Index')).toBeTruthy();
    });
  });
});
