/* global __DEVTOOLS__ */
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from '../middleware/logger';
import persistenceStore from '../persistence/store';
import reducers from '../reducers';

// Use hash location for Github Pages
// but switch to HTML5 history locally.

let combinedCreateStore;
const storeEnhancers = [
  persistenceStore,
];

if (__DEVTOOLS__) {
  storeEnhancers.push(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
}

combinedCreateStore = compose(...storeEnhancers)(createStore);
const finalCreateStore = applyMiddleware(thunk, logger)(combinedCreateStore);
const combinedReducer = combineReducers(Object.assign({}, reducers));

export default function configureStore(initialState) {
  const store = finalCreateStore(combinedReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
