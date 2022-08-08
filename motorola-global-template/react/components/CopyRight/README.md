# CopyRight

## Description

`CopyRight` is a component located in footer that show texts divided in two columns

- [CopyRight](#copyright)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)


## Usage
You can import the component directly in your code:
```js
import CopyRight from './components/CopyRight/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<CopyRight 
  copyRightText="MOTOROLA, the Stylized M Logo, MOTO and the MOTO family of marks are trademarks of Motorola Trademark Holdings, LLC. LENOVO is a trademark of Lenovo. All other trademarks are the property of their respective owners. © 2017 Motorola Mobility LLC."
  copyRightViews="† All battery life claims are approximate and based on a mixed use profile (which includes both usage and standby time) under optimal network conditions. Actual battery performance will vary and depends on many factors including signal strength, network configuration, age of battery, operating temperature, features selected, device settings, and voice, data, and other application usage patterns."
/>
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="copy-right" /> // This case the interface is called "copy-right"
```

## Properties

| Prop name        | Type     | Description             | Default value |
| ---------------- | -------- | ----------------------- | ------------- |
| `copyRightText`  | `string` | A CopyRight text        | -             |
| `copyRightViews` | `string` | Another copy right text | -             |
