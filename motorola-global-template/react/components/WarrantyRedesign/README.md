# Warranty

## Description

`Warranty` renders a page with a list of products that contains a possibility of adding warranty. The list of products comes directly from the OrderForm. The information is inside the `assemblyOptions`. 

- [Warranty](#warranty)
  - [Description](#description)
  - [Usage](#usage)

## Usage

You can import the component directly in your code:

```js
import WarrantyRedesign from './components/WarrantyRedesign/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<Warranty />
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="warranty" /> // This case the interface is called "warranty"
```
