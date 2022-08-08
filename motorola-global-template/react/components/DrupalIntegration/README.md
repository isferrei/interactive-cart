# DrupalIntegration

## Description

`DrupalIntegration` a component that renders some HTML and do a request from any provided URL. It was developed to work along with Drupal.

- [DrupalIntegration](#drupalintegration)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)

## Usage

You can import the component directly in your code:

```js
import DrupalIntegration from './components/DrupalIntegration/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<DrupalIntegration 
  url="https://www.motorola.com/products/moto-g6"
/>
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="drupal-integration" /> // This case the interface is called "drupal-integration"
```

## Properties

| Prop name | Type     | Description                         | Default value |
| --------- | -------- | ----------------------------------- | ------------- |
| `url`     | `string` | URL with the content to be rendered | -             |
