import { LoaderFunction, useLoaderData as innerUseLoaderData, Await as InnerAwait } from 'react-router-dom';

export type UseLoaderDataFunction = <T extends LoaderFunction>() => LoaderData<T>;

export type LoaderData<T extends LoaderFunction> = Exclude<Awaited<ReturnType<T>>, Response>;

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

export const useLoaderData = innerUseLoaderData as UseLoaderDataFunction;
export const Await = InnerAwait as AwaitComponent;
