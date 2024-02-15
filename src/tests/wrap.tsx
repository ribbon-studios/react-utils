import { ComponentProps, ElementType, useMemo } from 'react';

export type SupportedComponentFormats<C extends React.ElementType> = C | Promise<C | { Component: C } | { default: C }>;

async function getComponent<C extends React.ElementType>(value: SupportedComponentFormats<C>): Promise<C> {
  const response = await value;

  if (typeof response === 'object') {
    // TODO: Is there a better way to do this?
    const value = response as any;

    return value.default ?? value.Component;
  }

  return response;
}

function isComponentProps<P extends ComponentProps<any>>(props?: P | (() => P)): props is P {
  return !props || typeof props === 'object';
}

function getComponentProps<P extends ComponentProps<any>>(props?: P | (() => P)): P {
  if (isComponentProps(props)) {
    return props;
  }

  return props();
}

export function wrap<WC extends ElementType>(
  wrappedComponent: SupportedComponentFormats<WC>,
  wrappedProps?: Omit<ComponentProps<WC>, 'children'> | (() => Omit<ComponentProps<WC>, 'children'>)
) {
  return async <C extends React.ElementType>(component: SupportedComponentFormats<C>) => {
    const WrappedComponent: any = await getComponent(wrappedComponent);
    const Component = await getComponent(component);

    return (props: ComponentProps<C>) => {
      const outerProps = useMemo(() => getComponentProps(wrappedProps), []);

      return <WrappedComponent {...outerProps} children={<Component {...props} />} />;
    };
  };
}

// For some reason its marking the namespace as untested... ?
/* c8 ignore start */
export namespace wrap {
  /* c8 ignore end */
  export function concat(...wrappers: ReturnType<typeof wrap>[]): ReturnType<typeof wrap> {
    return async <C extends React.ElementType>(component: SupportedComponentFormats<C>) => {
      let result;

      // TODO: Figure out if this can be generated per concater rather then per component
      for (const wrapper of wrappers) {
        result = result ? wrapper(result) : wrapper(component);
      }

      return result;
    };
  }
}
