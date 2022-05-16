# Footer

## Description

`Footer` component is the footer of the theme.

- [Footer](#footer)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)

## Usage
You can import the component directly in your code:
```js
import Footer from './components/Footer/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<Footer 
  showSocialIcons={false}
/>
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="footer" /> // This case the interface is called "footer"
```

## Properties

| Prop name         | Type      | Description              | Default value |
| ----------------- | --------- | ------------------------ | ------------- |
| `showSocialIcons` | `boolean` | Show social icons or not | `true`        |
