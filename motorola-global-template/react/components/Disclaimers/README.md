# Disclaimers

## Description

`Disclaimers` a component that shows some disclaimer text

- [Disclaimers](#disclaimers)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)


## Usage

You can import the component directly in your code:

```js
import Disclaimers from './components/Disclaimers/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<Disclaimers 
  disclaimerText="Some disclaimer text"
/>
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="disclaimers" /> // This case the interface is called "disclaimers"
```

## Properties

| Prop name        | Type     | Description     | Default value |
| ---------------- | -------- | --------------- | ------------- |
| `disclaimerText` | `string` | Disclaimer text | -             |
