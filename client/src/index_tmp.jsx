// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
// import React from 'react';
// import ReactDOM from 'react-dom';

// ReactDOM.render(<App />, document.getElementById('react-root'));


import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
// import todoApp from './reducers'
// import App from './components/App'
import App from './App.jsx';

let store = createStore(() => {})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root')
)