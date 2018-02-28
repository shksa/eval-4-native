import React from 'react';
// import ReactDOM from 'react-dom';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';


function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent('frontendNative', () => Root);

