# FAQ

## Description

`FAQ` component is used to render Frequently Asked Questions

- [FAQ](#faq)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)

## Usage
You can import the component directly in your code:
```js
import FAQ from './components/FAQ/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<FAQ 
  faq={faqProps}
/>
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="faq" /> // This case the interface is called "faq"
```

## Properties

| Prop name | Type              | Description                    | Default value |
| --------- | ----------------- | ------------------------------ | ------------- |
| `faq`     | `Array(Object())` | Frequently asked question list | `[]`          |
