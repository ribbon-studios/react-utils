import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from '../react-query';
import { useQuery } from '@tanstack/react-query';

describe('wrappers(react-query)', () => {
  describe('wrapper(QueryClientProvider)', () => {
    it('should support queries', async () => {
      const MyComponent = await QueryClientProvider(() => {
        const { data } = useQuery({
          queryKey: ['test'],
          queryFn: () => 'Test',
        });

        return data;
      });

      render(<MyComponent />);

      await expect(screen.findByText('Test')).resolves.toBeTruthy();
    });
  });
});
