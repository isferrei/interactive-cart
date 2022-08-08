# LenovoLogo

## Description

`LenovoLogo` renders the LenovoLogo

- [LenovoLogo](#lenovologo)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)

## Usage

You can import the component directly in your code:

```js
import LenovoLogo from './components/LenovoLogo/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<LenovoLogo 
  link="https://www.lenovo.com/"
/>
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="lenovo-logo" /> // This case the interface is called "lenovo-logo"
```

## Properties

| Prop name | Type     | Description | Default value |
| --------- | -------- | ----------- | ------------- |
| `link`    | `string` | A link      | -             |
