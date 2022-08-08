# SocialIcons

## Description

`SocialIcons` renders the list of the social networks that was set through the props.

- [SocialIcons](#socialicons)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)

## Usage

You can import the component directly in your code:

```js
import SocialIcons from './components/SocialIcons/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<SocialIcons />
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="social-icons" /> // This case the interface is called "social-icons"
```

## Properties

| Prop name             | Type              | Description                                                                                                                                | Default value |
| --------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `showSocialIcons`     | `boolean`         | Show or not the social icons                                                                                                               | `true`        |
| `socialIcons`         | `Array(Object())` | List of the social icons to be rendered                                                                                                    | `[]`          |
| `socialIconsLocation` | `string`          | If it's **dropdown**, the format of the component will be applied to be rendered in the dropdown, if not, the format will be to the footer | dropdown      |

