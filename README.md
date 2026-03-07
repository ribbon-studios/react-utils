[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Coveralls][coveralls-image]][coveralls-url]

[![CI Build][github-actions-image]][github-actions-url]
[![Maintainability][maintainability-image]][maintainability-url]
[![Semantic Release][semantic-release-image]][semantic-release-url]
[![Code Style: Prettier][code-style-image]][code-style-url]

</div>

# React Utils 🔧

Collection of react utilities curated by Ribbon Studios Team~

- [Hooks](#hooks)
  - [`useCachedState`](#usecachedstate)
  - [`useSubtleCrypto`](#usesubtlecrypto)
  - [`useLocalStorage`](#uselocalstorage)
  - [`useSessionStorage`](#usesessionstorage)
  - [`useTheme`](#usetheme)
- [React Router](#react-router)
  - [`useLoaderData`](#useloaderdata)
  - [`<Await/>`](#await)
- [Testing Utilities](#testing-utilities)
  - [`wrap`](#wrap)
  - [`wrap.concat`](#wrapconcat)

## Hooks

### `useCachedState`

```tsx
import { useCachedState } from '@ribbon-studios/react-utils';

export type MySimpleInputProps = {
  value?: string;
};

export function MySimpleInput({ value: externalValue }: MySimpleInputProps) {
  // This is a utility for keeping external properties in-sync with the internal state
  const [value, setValue] = useCachedState(() => externalValue, [externalValue]);

  return <input value={value} onChange={(event) => setValue(event.target.value)} />;
}
```

### `useSubtleCrypto`

```tsx
import { useSubtleCrypto } from '@ribbon-studios/react-utils';

export type ProfileProps = {
  email?: string;
};

export function Profile({ email }: ProfileProps) {
  const hashedEmail = useSubtleCrypto('SHA-256', email);

  return <img src={`https://gravatar.com/avatar/${hashedEmail}.jpg`} />;
}
```

### `useLocalStorage`

```tsx
import { useLocalStorage } from '@ribbon-studios/react-utils';

export function Profile() {
  const [value, setValue] = useLocalStorage('hello');

  return value;
}
```

### `useSessionStorage`

```tsx
import { useSessionStorage } from '@ribbon-studios/react-utils';

export function Profile() {
  const [value, setValue] = useSessionStorage('hello');

  return value;
}
```

### `createThemeHook`

Creates a hook that automatically updates the `data-theme` attribute on the body to the active theme.

```tsx
// use-theme.ts
import { createThemeHook } from '@ribbon-studios/react-utils';

export const useTheme = createThemeHook({
  // Ensure you use `as const` or the types won't be correct!
  themes: ['light', 'dark'] as const,

  // This is the theme that will be used when light mode is preferred
  light: 'light',

  // This is the theme that will be used when dark mode is preferred
  dark: 'dark',
});

type Modes = typeof useTheme.$modes;

// Navigation.tsx
const THEME_LABELS: Record<Modes, string> = {
  auto: 'Auto',
  light: 'Light',
  dark: 'Dark',
};

const NEXT_THEME: Record<Modes, Modes> = {
  auto: 'light',
  light: 'dark',
  dark: 'auto',
};

export function Navigation() {
  const [mode, setMode] = useTheme();
  const nextTheme = useCallback(() => {
    setMode((mode) => NEXT_THEME[mode]);
  }, [setMode]);

  return (
    <div>
      <button onClick={nextTheme}>{THEME_LABELS[mode]}</button>
    </div>
  );
}
```

## React Router

### `useLoaderData`

```tsx
import { useLoaderData } from '@ribbon-studios/react-utils/react-router';

export async function loader() {
  return {
    hello: 'world',
  };
}

export function Profile() {
  // No more type casting!
  const value = useLoaderData<typeof loader>();

  return value.hello;
}
```

### `<Await/>`

```tsx
import { useLoaderData, Await } from '@ribbon-studios/react-utils/react-router';

export async function loader() {
  return Promise.resolve({
    greetings: Promise.resolve(['hello world', 'hallo welt']),
  });
}

export function Profile() {
  const data = useLoaderData<typeof loader>();

  return (
    <Await resolve={data.greetings}>
      {/* Retains the type! */}
      {(greetings) => (
        <>
          {greetings.map((greeting, i) => (
            <div key={i}>{greeting}</div>
          ))}
        </>
      )}
    </Await>
  );
}
```

## Testing Utilities

### `wrap`

This utility is more for testing purposes to easily create wrappers for other components.

```tsx
import { wrap } from '@ribbon-studios/react-utils';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Router = wrap(MemoryRouter);
const ReactQuery = wrap(QueryClientProvider, () => ({
  client: new QueryClient(),
}));

it('should ...', async () => {
  const Component = await Router(ReactQuery(import('../MyComponent.tsx')));

  // Properties are forwarded to your component as you'd expect
  render(<Component value="Hello world!" />);

  // ...
});
```

### `wrap.concat`

Helper function for wrappers that combines them together, useful if you need the whole kitchen sink!

```tsx
import { wrap } from '@ribbon-studios/react-utils';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Router = wrap(MemoryRouter);
const ReactQuery = wrap(QueryClientProvider, () => ({
  client: new QueryClient(),
}));

const KitchenSink = wrap.concat(Router, ReactQuery);

it('should ...', async () => {
  const Component = await KitchenSink(import('../MyComponent.tsx')));

  // Properties are forwarded to your component as you'd expect
  render(<Component value="Hello world!" />);

  // ...
});
```

### Built-Ins

We have a variety of wrappers for libraries built-in to simplify testing!

```tsx
import { HelmetProvider } from '@ribbon-studios/react-utils/react-helmet';
import { QueryClientProvider } from '@ribbon-studios/react-utils/react-query';
import { MemoryRouter } from '@ribbon-studios/react-utils/react-router';

const KitchenSink = wrap.concat(HelmetProvider, QueryClientProvider, MemoryRouter);

it('should ...', async () => {
  const Component = await KitchenSink(import('../MyComponent.tsx')));

  render(<Component value="Hello world!" />);

  // ...
});
```

[_**Want to Contribute?**_](/CONTRIBUTING.md)

[npm-version-image]: https://img.shields.io/npm/v/@ribbon-studios/react-utils.svg
[npm-downloads-image]: https://img.shields.io/npm/dm/@ribbon-studios/react-utils.svg
[npm-url]: https://npmjs.org/package/@ribbon-studios/react-utils
[github-actions-image]: https://img.shields.io/github/actions/workflow/status/ribbon-studios/react-utils/ci.yml?event=push
[github-actions-url]: https://github.com/ribbon-studios/react-utils/actions/workflows/ci.yml?query=branch%3Amain
[coveralls-image]: https://img.shields.io/coveralls/ribbon-studios/react-utils.svg
[coveralls-url]: https://coveralls.io/github/ribbon-studios/react-utils?branch=main
[code-style-image]: https://img.shields.io/badge/code%20style-prettier-ff69b4.svg
[code-style-url]: https://prettier.io
[maintainability-image]: https://img.shields.io/codeclimate/maintainability/ribbon-studios/react-utils
[maintainability-url]: https://codeclimate.com/github/ribbon-studios/react-utils/maintainability
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[semantic-release-image]: https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079
