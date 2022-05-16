# MotoProductBlock

## Description

`MotoProductBlock` renders the a block with some details of the product that is in the prop.

- [MotoProductBlock](#motoproductblock)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)

## Usage

You can import the component directly in your code:

```js
import MotoProductBlock from './components/MotoProductBlock/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<MotoProductBlock 
  productName="Motorola One Macro"
  linkText="https://www.motorola.co.uk/smartphones-motorola-one-macro/p"
  items={motorolaOneMacroSkus}
/>
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="moto-product-block" /> // This case the interface is called "moto-product-block"
```

## Properties

| Prop name     | Type              | Description                          | Default value |
| ------------- | ----------------- | ------------------------------------ | ------------- |
| `productName` | `string`          | Name of the selected product         | -             |
| `linkText`    | `string`          | Link of the selected product         | -             |
| `items`       | `Array(Object())` | List of SKUs of the selected product | -             |
