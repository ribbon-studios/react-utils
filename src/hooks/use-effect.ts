import { useEffect, useRef } from 'react';

/**
 * Accepts a function that contains imperative, possibly effectful code. (skips initial trigger)
 * @param effect Imperative function that can return a cleanup function
 * @param deps If present, effect will only activate if the values in the list change.
 */
export function useDidUpdateEffect(effect, deps) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      return effect();
    }

    didMountRef.current = true;
  }, deps);
}
