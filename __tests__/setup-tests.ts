import { cleanup } from '@testing-library/react';
import { vi, afterEach } from 'vitest';
import 'vitest-dom/extend-expect';

afterEach(() => {
  vi.restoreAllMocks();
  cleanup();
});
