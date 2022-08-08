# Header

## Description

`Header` renders the header of the website

- [Header](#header)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)


## Usage

You can import the component directly in your code:

```js
import Header from './components/Header/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<Header 
  showLogin={true}
  showCart={true}
  showSocialIcons={true}
/>
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="header" /> // This case the interface is called "header"
```

## Properties

| Prop name         | Type      | Description       | Default value |
| ----------------- | --------- | ----------------- | ------------- |
| `showLogin`       | `boolean` | Show login        | `true`        |
| `showCart`        | `boolean` | Show cart         | `true`        |
| `showSocialIcons` | `boolean` | Show social icons | `true`        |
