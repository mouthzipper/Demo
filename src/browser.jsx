import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app';

window.addEventListener('load', function () {
  if (typeof web3 !== 'undefined') {
    window.web3 = new Web3(window.web3.currentProvider)
  } else {
    // No web 3 provider
  }

  ReactDOM.render(
    <App router={Router} web3={ window.web3 } />,
    /*global document*/
    document.getElementById('root'),
  );
});
