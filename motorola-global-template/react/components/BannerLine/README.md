# BannerLine

## Description

`BannerLine` is a full width component that renders an image, mobile or desktop, with a heading, subheading and a link.

- [BannerLine](#bannerline)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)


## Usage
You can import the component directly in your code:
```js
import BannerLine from './components/BannerLine/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<BannerLine 
  heading="Moto G6"
  subhead="This is the phone that you need"
  ...componentProps
/>
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="banner-line" /> // This case the interface is called "banner-line"
```


## Properties

| Prop name          | Type      | Description                                | Default value |
| ------------------ | --------- | ------------------------------------------ | ------------- |
| `showBanner`       | `boolean` | Show or not the banner                     | `true`        |
| `imageUrl`         | `string`  | Banner image URL                           | -             |
| `mobileImageUrl`   | `string`  | Mobile banner image URL                    | -             |
| `heading`          | `string`  | Title of the banner line                   | -             |
| `subhead`          | `string`  | Description of the banner line             | -             |
| `subheadSize`      | `string`  | Size of the description of the banner line | big           |
| `callToActionLink` | `string`  | Call to action link                        | -             |
| `callToActionText` | `string`  | Call to action text                        | -             |
