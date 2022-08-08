# TopNav

## Description

`TopNav` renders a list of top nav links

- [TopNav](#topnav)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)

## Usage

You can import the component directly in your code:

```js
import TopNav from './components/TopNav/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<TopNav />
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="top-nav" /> // This case the interface is called "top-nav"
```

## Properties

| Prop name | Type              | Description               | Default value |
| --------- | ----------------- | ------------------------- | ------------- |
| `items`   | `Array(Object())` | List of items with a link | `[]`          |

