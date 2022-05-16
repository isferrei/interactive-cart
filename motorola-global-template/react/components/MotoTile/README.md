# MotoTile

## Description

`MotoTile` is a component that renders a tile with an icon, a title and a link. You have also the possibility of changing the background color of the tile.

- [MotoTile](#mototile)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)

## Usage

You can import the component directly in your code:

```js
import MotoTile from './components/MotoTile/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<MotoTile 
  title="Moto tile"
  externalLink={false}
  ...componentProps
/>
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="moto-tile" /> // This case the interface is called "moto-tile"
```

## Properties

| Prop name          | Type      | Description                        | Default value |
| ------------------ | --------- | ---------------------------------- | ------------- |
| `imageUrl`         | `string`  | Icon that will appear in the tile  | -             |
| `title`            | `string`  | Title that will appear in the tile | -             |
| `backgroundColor`  | `string`  | Background color of the tile       | -             |
| `callToActionLink` | `string`  | Call to action link                | -             |
| `callToActionText` | `string`  | Call to action text                | -             |
| `externalLink`     | `boolean` | External link                      | false         |
