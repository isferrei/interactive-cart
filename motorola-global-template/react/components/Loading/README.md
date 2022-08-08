# Loading

## Description

`Loading` creates loading layer in the place where the option should render. For example, if you place it in the search page, you can use the `type` *search*, passing it as a prop in the component and then before the desired component renders, a list of miniatures of product will appear.

- [Loading](#loading)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)

## Usage

You can import the component directly in your code:

```js
import Loading from './components/Loading/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<Loading 
  type="search"
/>
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="loading" /> // This case the interface is called "loading"
```

## Properties

| Prop name | Type     | Description                               | Default value |
| --------- | -------- | ----------------------------------------- | ------------- |
| `type`    | `string` | The type of loading blocks to be rendered | -             |
