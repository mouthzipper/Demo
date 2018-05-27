import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app';
//
// const Eth = require('ethjs');
// const eth = new Eth(new Eth.HttpProvider('http://127.0.0.1:7545'));

const provider = window.web3 && window.web3.currentProvider;

window.addEventListener('load', function () {
  ReactDOM.render(
    <App router={Router} web3={ typeof web3 !== 'undefined' && new Web3(provider) } />, // eth={ eth }
    /*global document*/
    document.getElementById('root'),
  );
});
