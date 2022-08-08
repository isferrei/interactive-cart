# MotoStoreWrapperCustom

## Description

`MotoStoreWrapperCustom` is a component that wraps the entire website and has some JavaScript code that is applied to the entire website. This component is used only be applied to custom pages that don't uses the global CSS and JavaScript that is in the website

- [MotoStoreWrapperCustom](#motostorewrappercustom)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)

## Usage

You can import the component directly in your code:

```js
import MotoStoreWrapperCustom from './components/MotoStoreWrapperCustom/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<MotoStoreWrapperCustom />
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="moto-store-wrapper-custom" /> // This case the interface is called "moto-store-wrapper-custom"
```

## Properties

| Prop name  | Type     | Description               | Default value |
| ---------- | -------- | ------------------------- | ------------- |
| `children` | `Node()` | Children of the component | -             |
