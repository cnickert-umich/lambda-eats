import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from 'history';

let history = createBrowserHistory();
let root = document.getElementById('root');

if (root) {
  // 1. Set up the browser history with the updated location
  // (minus the # sign)
  const path = (/#!(\/.*)$/.exec(window.location.hash) || [])[1];
  if (path) {
    history.replace(path);
  }
}

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
