# CollectionShelf

## Description

`CollectionShelf` renders a list of shelves, with a title and the shelf that show the products according to the category or collection provided to it.

- [CollectionShelf](#collectionshelf)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)


## Usage
You can import the component directly in your code:
```js
import CollectionShelf from './components/CollectionShelf/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<CollectionShelf 
  shelfs={shelfList}
  ...componentProps
/>
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="collection-shelf" /> // This case the interface is called "collection-shelf"
```


## Properties

| Prop name | Type            | Description     | Default value |
| --------- | --------------- | --------------- | ------------- |
| `shelfs`  | `Array(object)` | List of banners | `[]`          |
