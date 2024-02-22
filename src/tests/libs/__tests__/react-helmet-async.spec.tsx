import { render, waitFor } from '@testing-library/react';
import { Helmet } from 'react-helmet-async';
import { HelmetProvider } from '../react-helmet-async';

describe('wrappers(react-router-dom)', () => {
  describe('wrapper(Router)', () => {
    it('should be a MemoryRouter', async () => {
      const MyComponent = await HelmetProvider(() => (
        <Helmet>
          <title>Test</title>
        </Helmet>
      ));

      render(<MyComponent />);

      await waitFor(() => expect(document.title).toEqual('Test'));
    });
  });
});
