import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from './Styles/globalStyles'
import App from './app'


ReactDOM.render(
  <React.StrictMode>
    <App/>
    <GlobalStyles/>
  </React.StrictMode>,
  document.getElementById('root')
);
