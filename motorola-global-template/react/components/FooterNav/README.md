# FooterNav

## Description

`FooterNav` renders lists of items with menu links inside each of them.

- [FooterNav](#footernav)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)


## Usage

You can import the component directly in your code:

```js
import FooterNav from './components/FooterNav/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<FooterNav 
  lists={dropdownList}
  ...componentProps
/>
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="footer-nav" /> // This case the interface is called "footer-nav"
```


## Properties

| Prop name | Type            | Description   | Default value |
| --------- | --------------- | ------------- | ------------- |
| `lists`   | `Array(object)` | List of items | `[]`          |
