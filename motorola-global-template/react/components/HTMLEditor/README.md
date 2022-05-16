# HTMLEditor

## Description

`HTMLEditor` component is used to render just a plain HTML that is defined in props in the place of where this component is located.

- [HTMLEditor](#htmleditor)
  - [Description](#description)
  - [Usage](#usage)
  - [Properties](#properties)

## Usage

You can import the component directly in your code:

```js
import HTMLEditor from './components/HTMLEditor/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<HTMLEditor 
  htmlContent="<div><h1>Some HTML content</h1></div>"
/>
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="html-editor" /> // This case the interface is called "html-editor"
```

## Properties

| Prop name     | Type     | Description                                       | Default value |
| ------------- | -------- | ------------------------------------------------- | ------------- |
| `htmlContent` | `string` | HTML content to be rendered in the selected place | -             |
