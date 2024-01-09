import classNames, { ArgumentArray } from 'classnames';
import { DependencyList, Dispatch, SetStateAction, useEffect, useState } from 'react';

export function useCachedState<T>(
  supplier: (...deps: DependencyList) => T,
  deps: DependencyList
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => supplier(...deps));

  useEffect(() => setValue(() => supplier(...deps)), deps);

  return [value, setValue];
}

export function useReadOnlyCachedState<T>(supplier: () => T, deps: DependencyList): T {
  const [value] = useCachedState(supplier, deps);

  return value;
}

export function useClassNames(deps: ArgumentArray): string {
  return useReadOnlyCachedState(() => {
    return classNames(deps);
  }, deps);
}
