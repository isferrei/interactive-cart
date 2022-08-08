# MotoProductSummary

## Description

`MotoProductSummary` renders the summary with some details of the product that is in the prop.

- [MotoProductSummary](#motoproductsummary)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)

## Usage

You can import the component directly in your code:

```js
import MotoProductSummary from './components/MotoProductSummary/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<MotoProductSummary 
  productName="Motorola One Macro"
  description="<h2>Motorola one Macro description</h2>"
  linkText="https://www.motorola.co.uk/smartphones-motorola-one-macro/p"
  items={motorolaOneMacroSkus}
  specificationGroups={motorolaOneMacroSpecificationGroups}
/>
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="moto-product-summary" /> // This case the interface is called "moto-product-summary"
```

## Properties

| Prop name             | Type              | Description                                  | Default value |
| --------------------- | ----------------- | -------------------------------------------- | ------------- |
| `productName`         | `string`          | Name of the selected product                 | -             |
| `description`         | `string`          | Description of the selected product          | -             |
| `specificationGroups` | `string`          | Specification groups of the selected product | -             |
| `linkText`            | `string`          | Link of the selected product                 | -             |
| `items`               | `Array(Object())` | List of SKUs of the selected product         | -             |
