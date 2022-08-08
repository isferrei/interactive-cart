# MotoStoreWrapper

## Description

`MotoStoreWrapper` is a component that wraps the entire website and has some JavaScript code that is applied to the entire website

- [MotoStoreWrapper](#motostorewrapper)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)

## Usage

You can import the component directly in your code:

```js
import MotoStoreWrapper from './components/MotoStoreWrapper/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<MotoStoreWrapper />
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="moto-store-wrapper" /> // This case the interface is called "moto-store-wrapper"
```

## Properties

| Prop name  | Type     | Description               | Default value |
| ---------- | -------- | ------------------------- | ------------- |
| `children` | `Node()` | Children of the component | -             |
