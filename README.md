[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Coveralls][coveralls-image]][coveralls-url]

[![CI Build][github-actions-image]][github-actions-url]
[![Maintainability][maintainability-image]][maintainability-url]
[![Semantic Release][semantic-release-image]][semantic-release-url]
[![Code Style: Prettier][code-style-image]][code-style-url]

</div>

# React Utils

Collection of react utilities curated by the Rainbow Cafe~

## `useCachedState`

```tsx
import { useCachedState } from '@rain-cafe/react-utils';

export type MySimpleInputProps = {
  value?: string;
};

export function MySimpleInput({ value: externalValue }: MySimpleInputProps) {
  // This is a utility for keeping external properties in-sync with the internal state
  const [value, setValue] = useCachedState(() => externalValue, [externalValue]);

  return <input value={value} onChange={(event) => setValue(event.target.value)} />;
}
```

## `useSubtleCrypto`

```tsx
import { useSubtleCrypto } from '@rain-cafe/react-utils';

export type ProfileProps = {
  email?: string;
};

export function Profile({ email }: ProfileProps) {
  const hashedEmail = useSubtleCrypto('SHA-256', email);

  return <img src={`https://gravatar.com/avatar/${hashedEmail}.jpg`} />;
}
```

[_**Want to Contribute?**_](/CONTRIBUTING.md)

[npm-version-image]: https://img.shields.io/npm/v/@rain-cafe/react-utils.svg
[npm-downloads-image]: https://img.shields.io/npm/dm/@rain-cafe/react-utils.svg
[npm-url]: https://npmjs.org/package/@rain-cafe/react-utils
[github-actions-image]: https://img.shields.io/github/actions/workflow/status/rain-cafe/react-utils/ci.yml?event=push
[github-actions-url]: https://github.com/rain-cafe/react-utils/actions/workflows/ci.yml?query=branch%3Amain
[coveralls-image]: https://img.shields.io/coveralls/rain-cafe/react-utils.svg
[coveralls-url]: https://coveralls.io/github/rain-cafe/react-utils?branch=main
[code-style-image]: https://img.shields.io/badge/code%20style-prettier-ff69b4.svg
[code-style-url]: https://prettier.io
[maintainability-image]: https://img.shields.io/codeclimate/maintainability/rain-cafe/refreshly
[maintainability-url]: https://codeclimate.com/github/rain-cafe/refreshly/maintainability
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[semantic-release-image]: https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079
