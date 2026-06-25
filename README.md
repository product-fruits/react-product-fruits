# react-product-fruits

A small React component to initialize [Product Fruits](https://productfruits.com)
in React applications. It wraps the [`product-fruits`](https://www.npmjs.com/package/product-fruits)
loader and manages init/update/teardown through the React lifecycle. Written in
TypeScript with bundled type definitions.

## Install

```bash
npm install react-product-fruits
# or
yarn add react-product-fruits
```

React 17 or newer is required (declared as a peer dependency).

## Usage

Render the `ProductFruits` component once, high in your tree, with the current user.

```tsx
import { ProductFruits } from 'react-product-fruits';

export default function App() {
  const userInfo = {
    username: 'john123', // REQUIRED, unique identifier of the current user
    email: 'john@example.com',
    firstname: 'John',
    // ...other optional fields, see ProductFruitsUserObject
  };

  return (
    <ProductFruits
      workspaceCode="YOUR_WORKSPACE_CODE"
      language="en"
      user={userInfo}
    />
  );
}
```

When the `user` prop changes, the component pushes a user-data update automatically.

### Props

| Prop            | Type                                | Required | Description                                                                 |
| --------------- | ----------------------------------- | -------- | --------------------------------------------------------------------------- |
| `workspaceCode` | `string`                            | yes      | Your Product Fruits workspace code.                                         |
| `language`      | `string`                            | yes      | Language code (e.g. `"en"`).                                                |
| `user`          | `ProductFruitsUserObject`           | yes      | Current user; `username` is required.                                       |
| `config`        | `ProductFruitsInitOptions`          | no       | Init options (custom navigation, etc.).                                     |
| `lifeCycle`     | `'neverUnmount' \| 'unmount'`       | no       | `unmount` destroys Product Fruits when the component unmounts. Default keeps it mounted. |
| `debug`         | `boolean`                           | no       | Logs lifecycle events to the console.                                       |

### Hooks

```tsx
import { useProductFruitsApi, isProductFruitsReady } from 'react-product-fruits';

function MyComponent() {
  useProductFruitsApi((api) => {
    // called once Product Fruits is ready
    // return an optional cleanup function
  }, []);

  // ...
}
```

`isProductFruitsReady()` returns whether Product Fruits has finished loading.

## More docs

See the [Product Fruits help center](https://help.productfruits.com).

## Versioning & security

- **Releases / changelog:** every npm version has a matching
  [GitHub Release](https://github.com/product-fruits/react-product-fruits/releases).
  The latest version on npm is the recommended one for production.
- **Provenance:** each release is built and published from CI with npm provenance,
  so the published package is verifiably built from this repository
  (`npm audit signatures`).
- **Security policy:** see [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE)
