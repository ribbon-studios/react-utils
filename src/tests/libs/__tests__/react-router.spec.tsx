import { describe, it, expect } from 'vitest';
import { Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from '../react-router';

describe('wrappers(react-router-dom)', () => {
  describe('wrapper(MemoryRouter)', () => {
    it('should be a MemoryRouter', async () => {
      const MyComponent = await MemoryRouter(() => (
        <Routes>
          <Route index element={'Index'} />
        </Routes>
      ));

      render(<MyComponent />);

      expect(screen.getByText('Index')).toBeTruthy();
    });
  });
});
