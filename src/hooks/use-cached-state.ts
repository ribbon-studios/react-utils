import classNames, { ArgumentArray } from 'classnames';
import { DependencyList, useEffect, useMemo, useState } from 'react';

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

/**
 * @deprecated this will be removed in v2.0.0, please swap to [useMemo](https://react.dev/reference/react/useMemo) before then.
 * @see https://react.dev/learn/you-might-not-need-an-effect
 */
export function useReadOnlyCachedState<T>(supplier: () => T, deps: DependencyList): T {
  const [value] = useCachedState(supplier, deps);

  return value;
}

/**
 * @deprecated At best `useClassNames` is unnecessary and at worst it hurts performance. As such this will be removed in v2.0.0
 * @see https://react.dev/learn/you-might-not-need-an-effect
 */
export function useClassNames(deps: ArgumentArray): string {
  return useMemo(() => classNames(deps), deps);
}
