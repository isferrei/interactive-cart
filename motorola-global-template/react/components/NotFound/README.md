# NotFound

## Description

`NotFound` is used to show a not found page instead of the requested component

- [NotFound](#notfound)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)

## Usage

You can import the component directly in your code:

```js
import NotFound from './components/NotFound/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<NotFound 
  type="search"
/>
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="not-found" /> // This case the interface is called "not-found"
```

## Properties

| Prop name | Type     | Description                                      | Default value |
| --------- | -------- | ------------------------------------------------ | ------------- |
| `type`    | `string` | The type of not found page that will be rendered | -             |
