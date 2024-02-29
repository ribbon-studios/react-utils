export type Hook<T extends any[], R> = (...args: T) => R;
export type HookProps<T extends [any] | any[]> = T extends []
  ? { hook?: undefined }
  : { hook: T extends [any] ? T | T[0] : T };

function toArgs<T extends [any] | any[]>(props: T extends [any] ? T | T[0] : T): T {
  if (Array.isArray(props)) return props;

  // TODO: Typescript doesn't understand that T[0] and [any] are the same values
  return [props] as T;
}

export function hooked<T extends [any] | any[], R>(useHook: Hook<T, R>) {
  return ({ hook }: HookProps<T>) => {
    const result = useHook(...toArgs(hook));

    if (typeof result === 'undefined') return '<undefined>';
    if (typeof result === 'object') return <div>{JSON.stringify(result)}</div>;

    return result.toString();
  };
}
