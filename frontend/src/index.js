import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import reducers from './reducers';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import { RenderAfterNavermapsLoaded } from 'react-naver-maps';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <RenderAfterNavermapsLoaded ncpClientId="4nr363jm3d"
    error={<p>Maps Load Error</p>}
    loading={<p>Maps Loading...</p>}
  >
    <Provider store={createStore(reducers)}>
      <App />
    </Provider>
  </RenderAfterNavermapsLoaded>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
