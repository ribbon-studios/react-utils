[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Coveralls][coveralls-image]][coveralls-url]

[![CI Build][github-actions-image]][github-actions-url]
[![Maintainability][maintainability-image]][maintainability-url]
[![Semantic Release][semantic-release-image]][semantic-release-url]
[![Code Style: Prettier][code-style-image]][code-style-url]

</div>

# React Utils 🔧

Collection of react utilities curated by the Rainbow Cafe~

- [Hooks](#hooks)
  - [`useCachedState`](#usecachedstate)
  - [`useSubtleCrypto`](#usesubtlecrypto)
- [React Router](#react-router)
  - [`useLoaderData`](#useloaderdata)
  - [`defer`](#defer)
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

### `defer`

```tsx
import { defer, useLoaderData } from '@ribbon-studios/react-utils/react-router';

export async function loader() {
  // Properly maps the types so our 'useLoaderData' type wrapper can get them!
  return defer({
    hello: 'world',
    hallo: Promise.resolve('welt'),
  });
}

export function Profile() {
  // No more type casting!
  const data = useLoaderData<typeof loader>();

  return value.hello;
}
```

### `<Await/>`

```tsx
import { defer, useLoaderData, Await } from '@ribbon-studios/react-utils/react-router';

export async function loader() {
  return defer({
    greetings: Promise.resolve(['hello world', 'hallo welt']),
  });
}

export function Profile() {
  const data = useLoaderData<typeof loader>();

  return (
    <Await resolve={data.greetings}>
      /* Retains the type! */
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

### `hooked`

```tsx
import { useMemo } from 'react';
import { hooked } from '@ribbon-studios/react-utils';

const useMyHook = (value: string) => useMemo(() => value, [value]);

const HookedComponent = hooked(useMyHook);

it('should ...', async () => {
  // Properties are forwarded to your component as you'd expect
  render(<HookedComponent hook="Hello world!" />);

  expect(screen.getByText('Hello world!')).toBeTruthy();
});
```

**Multiple Arguments**

```tsx
import { useMemo } from 'react';
import { hooked } from '@ribbon-studios/react-utils';

const useMyHook = (value: string, otherValue: string) => useMemo(() => `${value} ${otherValue}`, [value, otherValue]);

const HookedComponent = hooked(useMyHook);

it('should ...', async () => {
  // Properties are forwarded to your component as you'd expect
  render(<HookedComponent hook={['Hello world!', 'Hallo welt!']} />);

  expect(screen.getByText('Hello world! Hallo welt!')).toBeTruthy();
});
```

**Type Map**

| Type        | Output                   |                  Example |
| ----------- | ------------------------ | -----------------------: |
| `string`    | `string`                 |          `'hello world'` |
| `number`    | `number.toString()`      |                    `'1'` |
| `boolean`   | `boolean.toString()`     |                 `'true'` |
| `undefined` | `'<undefined>'`          |          `'<undefined>'` |
| `object`    | `JSON.stringify(object)` | `'{ "hello": "world" }'` |
| `array`     | `JSON.stringify(array)`  |   `'["hello", "world"]'` |

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
import { HelmetProvider } from '@ribbon-studios/react-utils/react-helmet-async';
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
[maintainability-image]: https://img.shields.io/codeclimate/maintainability/ribbon-studios/refreshly
[maintainability-url]: https://codeclimate.com/github/ribbon-studios/refreshly/maintainability
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[semantic-release-image]: https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079
