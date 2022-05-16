# CurrentLocation

## Description

`CurrentLocation` a component that show the current location (country) where the use is located in

- [CurrentLocation](#currentlocation)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)


## Usage

You can import the component directly in your code:

```js
import CurrentLocation from './components/CurrentLocation/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<CurrentLocation 
  countryName="USA"
  changeLocationLink="https://www.motorola.com/country-selector"
  changeLocationText="Change Location"
  backgroundPosition="0 -225px"
/>
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="current-location" /> // This case the interface is called "current-location"
```

## Properties

| Prop name            | Type     | Description                                   | Default value                             |
| -------------------- | -------- | --------------------------------------------- | ----------------------------------------- |
| `countryName`        | `string` | Country text                                  | -                                         |
| `changeLocationLink` | `string` | Change location link                          | https://www.motorola.com/country-selector |
| `changeLocationText` | `string` | Text that will appear in the side of the flag | Change location                           |
| `backgroundPosition` | `string` | Background Position CSS value                 | 0 -225px                                  |
