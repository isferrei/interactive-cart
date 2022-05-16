# SearchResult

## Description

`SearchResult` renders a list of products based on the query that is currently in the URL

- [SearchResult](#searchresult)
  - [Description](#description)
  - [Usage](#usage)

## Usage

You can import the component directly in your code:

```js
import SearchResult from './components/SearchResult/index'
```

And call it in anywhere you want passing the needed props:

```jsx
<SearchResult />
```

Or you can define it's `interface` in the `interfaces.json`, passing the needed props in the `blocks.json`  and then include it as an `ExtensionPoint`:
```js
import { ExtensionPoint } from 'vtex.render-runtime';
```

And then call it using the following format:

```jsx
<ExtensionPoint id="search-result" /> // This case the interface is called "search-result"
```
