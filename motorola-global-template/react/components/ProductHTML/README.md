# ProductHTML

## Description

`ProductHTML` renders the HTML of a single product based on the query of the current URL of the product. The information of the specification comes from the specification group with the name of **Blocks**

- [ProductHTML](#producthtml)
  - [Description](#description)
  - [Usage](#usage)

## Usage

You can import the component directly in your code:

```js
import ProductHTML from './components/ProductHTML/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<ProductHTML />
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="product-html" /> // This case the interface is called "product-html"
```
