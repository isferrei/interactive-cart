# Subnav

## Description

`Subnav` renders a list of sub nav links

- [Subnav](#subnav)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)

## Usage

You can import the component directly in your code:

```js
import Subnav from './components/Subnav/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<Subnav />
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="subnav" /> // This case the interface is called "subnav"
```

## Properties

| Prop name | Type              | Description               | Default value |
| --------- | ----------------- | ------------------------- | ------------- |
| `items`   | `Array(Object())` | List of items with a link | `[]`          |

