import { DependencyList, useEffect, useState } from 'react';

/**
 * Gives you a state value that is automatically updated whenever its dependencies change.
 * @param supplier calculates the value that is stored
 * @param deps the dependencies to watch
 * @returns A state value and its setter, identical to calling `useState`
 */
export function useCachedState<T>(
  supplier: (...deps: DependencyList) => T,
  deps: DependencyList
): ReturnType<typeof useState<T>> {
  const [value, setValue] = useState<T>(() => supplier(...deps));

  useEffect(() => setValue(() => supplier(...deps)), deps);

  return [value, setValue];
}
