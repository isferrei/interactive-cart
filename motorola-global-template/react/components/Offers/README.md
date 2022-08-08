# Offers

## Description

`Offers` renders of Offer Cards based in the information provided by React props.

- [Offers](#offers)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)

## Usage

You can import the component directly in your code:

```js
import Offers from './components/Offers/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<Offers offers={listOfOffers} />
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="offers" /> // This case the interface is called "offers"
```

## Properties

| Prop name    | Type              | Description    | Default value |
| ------------ | ----------------- | -------------- | ------------- |
| `offerCards` | `Array(Object())` | List of offers | `[]`          |

