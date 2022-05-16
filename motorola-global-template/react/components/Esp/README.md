# Esp

## Description

`Esp` is component that is used to provided a route called `/esp`. The `useEffect` when loading orderForm, call another function to get `skuId` by `refId`. The `useEffect` that checks the `skuId` state, call the `updateOrderForm` to clear old orderForm and set new sku in same function. Also, it calls `updateCustomData` function to set fields in the orderForm app and then it redirects to checkout with navigate

- [Esp](#esp)
  - [Description](#description)
  - [Usage](#usage)

## Usage

You can import the component directly in your code:

```js
import Esp from './components/Esp/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<Esp />
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="esp" /> // This case the interface is called "esp"
```

