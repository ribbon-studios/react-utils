[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]

[![CI Build][github-actions-image]][github-actions-url]
[![Coveralls][coveralls-image]][coveralls-url]
[![Semantic Release][semantic-release-image]][semantic-release-url]

</div>

# React Utils

Collection of react utilities curated by the Rainbow Cafe~

## `useCachedState` and `useReadOnlyCachedState`

```tsx
import {
  useCachedState, 
  useReadOnlyCachedState,
} from '@rain-cafe/react-utils';
import classnames from 'classnames';
import * as styles from './MySimpleInput.module.scss';

export type MySimpleInputProps = {
  className?: string;
  value?: string;
}

export function MySimpleInput({ className: externalClassName, value: externalValue }: MySimpleInputProps) {
  // This is a utility for keeping external properties in-sync with the internal state
  const [value, setValue] = useCachedState(() => externalValue, [externalValue]);

  // This is a utility for computing properties only when changes occur
  const className = useReadOnlyCachedState(() => {
    return classnames(styles.input, externalClassName);
  }, [externalClassName]);

  return (
    <input 
      className={className}
      value={value} 
      onChange={(event) => setValue(event.target.value)} 
    />
  );
}
```

[_**Want to Contribute?**_](/CONTRIBUTING.md)

[npm-version-image]: https://img.shields.io/npm/v/@rain-cafe/react-utils.svg?style=flat
[npm-downloads-image]: https://img.shields.io/npm/dm/@rain-cafe/react-utils.svg?style=flat
[npm-url]: https://npmjs.org/package/@rain-cafe/react-utils
[github-actions-image]: https://github.com/rain-cafe/react-utils/actions/workflows/ci.yml/badge.svg?branch=main
[github-actions-url]: https://github.com/rain-cafe/react-utils/actions/workflows/ci.yml
[coveralls-image]: https://img.shields.io/coveralls/rain-cafe/react-utils.svg
[coveralls-url]: https://coveralls.io/github/rain-cafe/react-utils?branch=main
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[semantic-release-image]: https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079?style=flat
