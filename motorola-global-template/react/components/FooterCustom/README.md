# FooterCustom

## Description

`FooterCustom` component is used to render just a plain HTML that is defined in props in the place of the footer.

- [FooterCustom](#footercustom)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)

## Usage
You can import the component directly in your code:
```js
import FooterCustom from './components/FooterCustom/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<FooterCustom 
  htmlContent="<div><h1>Some HTML content</h1></div>"
/>
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="footer-custom" /> // This case the interface is called "footer-custom"
```

## Properties

| Prop name     | Type     | Description                                            | Default value |
| ------------- | -------- | ------------------------------------------------------ | ------------- |
| `htmlContent` | `string` | HTML content to be rendered in the place of the footer | -             |
