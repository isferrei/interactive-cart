# FamilyShelf

## Description

`FamilyShelf` is used to render a block and a shelf totally customized. It's only used to display some text, images and specifications through the properties.

- [FamilyShelf](#familyshelf)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)

## Usage
You can import the component directly in your code:
```js
import FamilyShelf from './components/FamilyShelf/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<FamilyShelf 
  block={{
    blockTitle: "possibilities. performance. power.",
    blockDescription: "Get the features you need for the life you lead.",
    linkTitle: "Learn more",
    linkSrc: "https://www.motorola.com.uk"
  }}
  items={familyPageProps}
/>
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="family-shelf" /> // This case the interface is called "family-shelf"
```

## Properties

| Prop name | Type              | Description            | Default value |
| --------- | ----------------- | ---------------------- | ------------- |
| `block`   | `Object()`        | Show or not the banner | `{}`          |
| `items`   | `Array(Object())` | Banner image URL       | `[]`          |
