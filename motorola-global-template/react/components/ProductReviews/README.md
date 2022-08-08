# ProductReviews

## Description

`ProductReviews` renders the reviews of a single product based on the query of the current URL of the product

- [ProductReviews](#productreviews)
  - [Description](#description)
  - [Usage](#usage)

## Usage

You can import the component directly in your code:

```js
import ProductReviews from './components/ProductReviews/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<ProductReviews />
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="product-reviews" /> // This case the interface is called "product-reviews"
```
