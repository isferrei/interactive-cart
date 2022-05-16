# NewsLine

## Description

`NewsLine` is used to render some `child` components, withe the possibility of changing the `backgroundColor` or disabling it.

- [NewsLine](#newsline)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)

## Usage

You can import the component directly in your code:

```js
import NewsLine from './components/NewsLine/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<NewsLine ...NewsLineProps />
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="news-line" /> // This case the interface is called "news-line"
```

## Properties

| Prop name         | Type      | Description                  | Default value |
| ----------------- | --------- | ---------------------------- | ------------- |
| `backgroundColor` | `string`  | Background color of the line | -             |
| `children`        | `Node()`  | Sub title                    | -             |
| `enabled`         | `boolean` | Show or not                  | -             |

