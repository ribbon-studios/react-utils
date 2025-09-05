import { describe, it, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { HelmetProvider } from '../react-helmet';

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
