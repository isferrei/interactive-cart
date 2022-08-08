# Carhousel

## Description

`Carousel` is a full width component that renders a list of banners that contains a background image, mobile or desktop, a heading, subheading and also a floating image, over the background.

- [Carhousel](#carhousel)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)


## Usage
You can import the component directly in your code:
```js
import Carousel from './components/Carousel/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<Carousel 
  banners={bannerList}
  ...componentProps
/>
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="carousel" /> // This case the interface is called "carousel"
```


## Properties

| Prop name | Type            | Description     | Default value |
| --------- | --------------- | --------------- | ------------- |
| `banners` | `Array(object)` | List of banners | `[]`          |
