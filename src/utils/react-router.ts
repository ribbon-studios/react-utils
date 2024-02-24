import {
  LoaderFunction,
  defer as innerDefer,
  useLoaderData as innerUseLoaderData,
  Await as InnerAwait,
} from 'react-router-dom';

export type DeferredData<T extends Record<string, any>> = Omit<ReturnType<typeof innerDefer>, 'data'> & {
  data: T;
};

export type DeferFunction = <T extends Record<string, any>>(data: T, init?: number | ResponseInit) => DeferredData<T>;

export type UseLoaderDataFunction = <T extends LoaderFunction>() => Awaited<ReturnType<T>> extends DeferredData<any>
  ? Awaited<ReturnType<T>>['data']
  : Awaited<ReturnType<T>>;

export interface AwaitProps<T> {
  children:
    | React.ReactNode
    | {
        (data: Awaited<T>): React.ReactNode;
      };
  errorElement?: React.ReactNode;
  resolve: T;
}

export type AwaitComponent = <T>(props: AwaitProps<T>) => React.JSX.Element;

export const defer = innerDefer as DeferFunction;
export const useLoaderData = innerUseLoaderData as UseLoaderDataFunction;
export const Await = InnerAwait as AwaitComponent;
