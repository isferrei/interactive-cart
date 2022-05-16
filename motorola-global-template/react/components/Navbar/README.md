# Navbar

## Description

`Navbar` renders a list of dropdown with menu links inside each of them. Each of those dropdowns can also have a promotion block.

- [Navbar](#navbar)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)


## Usage

You can import the component directly in your code:

```js
import Navbar from './components/Navbar/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<Navbar 
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
<ExtensionPoint id="navbar" /> // This case the interface is called "navbar"
```


## Properties

| Prop name | Type            | Description       | Default value |
| --------- | --------------- | ----------------- | ------------- |
| `items`   | `Array(object)` | List of dropdowns | `[]`          |
