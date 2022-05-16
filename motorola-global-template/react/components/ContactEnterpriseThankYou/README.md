# ContactEnterpriseThankYou

## Description

`ContactEnterpriseThankYou` renders the *Thank you* page for the Contact Enterprise page.

- [ContactEnterpriseThankYou](#contactenterprisethankyou)
  - [Description](#description)
  - [Usage](#usage)

## Usage
You can import the component directly in your code:
```js
import ContactEnterpriseThankYou from './components/ContactEnterpriseThankYou/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<ContactEnterpriseThankYou />
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="contact-enterprise-thank-you" /> // This case the interface is called "contact-enterprise-thank-you"
```