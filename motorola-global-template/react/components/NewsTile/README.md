# NewsTile

## Description

`NewsTile` renders a tile containing some news. The information of this tile comes from the props.

- [NewsTile](#newstile)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)

## Usage

You can import the component directly in your code:

```js
import NewsTile from './components/NewsTile/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<NewsTile ...newsTileProps />
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="news-tile" /> // This case the interface is called "news-tile"
```

## Properties

| Prop name          | Type      | Description         | Default value |
| ------------------ | --------- | ------------------- | ------------- |
| `title`            | `string`  | Title               | -             |
| `subTitle`         | `string`  | Sub title           | -             |
| `date`             | `string`  | Date                | -             |
| `callToActionLink` | `string`  | Call to action link | -             |
| `backgroundColor`  | `string`  | Background color    | -             |
| `externalLink`     | `boolean` | External link       | -             |
| `callToActionText` | `string`  | Call to action text | `false`       |
| `imageUrl`         | `string`  | News Image          | -             |

