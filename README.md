semantic-react-redux
====

Just a collection of components for projects using semantic-ui, redux, and react.

loaderReducer
===
LoaderReducer maintains an array of named transactions awaiting fulfillment.

Usage
---

Add it to your createStore call. For example:

```js
import {createStore} from 'redux';
import {loaderReducer} from 'semantic-react-redux';
import * as reducers from './reducers'  //your object of reducers

const app = combineReducers({loaderReducer, ...reducers});
const store = createStore(app);

```

Loader
===

Loader provides a semantic loader, that listens to a given name on loadingReducer.
If the name is present, then the [semantic-ui loader](http://semantic-ui.com/elements/loader.html)
will be active.

Usage
---

```jsx
<Loader name={Actions.FETCH_ACTION}>
  <div className="ui stackable two column grid">
    {...data}
  </div>
</Loader>
```

LoaderTransactor
===

LoaderTransactor provides an easy way to combine an ajax transaction
with a loading message, which Loader can listen to.

actions.js

```js
const receiver = ({result}) => ({
  type: RECEIVE_DATA,
  ...result,
});

const actionCreator = () =>
  loadingTransact(
    route,
    receiver,
    FETCH_ACTION      // same name that <Loader /> listens to.
  );

```

DimensionProvider
===

The child of `DimensionProvider` will receive its `width` and `height` as props.
`DimensionProvider` encapsulates a `window` resize listener, which recalculates the dimensions
of the contents when the user stops resizing the window.
