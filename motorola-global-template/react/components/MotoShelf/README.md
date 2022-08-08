# MotoShelf

## Description

`MotoShelf` is used to render a shelf based in the query provided in the props.

- [MotoShelf](#motoshelf)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)


## Usage
You can import the component directly in your code:
```js
import MotoShelf from './components/MotoShelf/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<MotoShelf 
  shelfs={shelfList}
  ...componentProps
/>
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="moto-shelf" /> // This case the interface is called "moto-shelf"
```

## Properties

| Prop name        | Type       | Description                                                      | Default value |
| ---------------- | ---------- | ---------------------------------------------------------------- | ------------- |
| `shelfTitle`     | `string`   | The title of the shelf                                           | -             |
| `shelfVariables` | `Object()` | The object containing the information to search for the products | -             |
