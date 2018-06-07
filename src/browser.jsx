import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app';
import contractSDK, { getAccounts } from './utils/smartContract';
import abi from './abis/mentat';
const contractAdress = '0xfb88de099e13c3ed21f80a7a1e49f8caecf10df6';

const renderApp = (contract, accounts, web3error=undefined) => {
  ReactDOM.render(
    <App
      router={ Router }
      contract={ contract }
      accounts={ accounts }
      web3error={ web3error }
    />,
    /*global document*/
    document.getElementById('root')
  );
};

window.addEventListener('load', async () => {
  const provider = window.web3 && window.web3.currentProvider;
  if (!provider) {
    return renderApp(null, null, 'no_web3');
  }

  const web3Instance = new Web3(provider);
  const contractInstance = web3Instance.eth.contract(abi).at(contractAdress);

  if (!contractInstance) {
    return renderApp(null, null, 'no_contract_instance');
  }
  const contract = contractInstance && contractSDK(web3Instance, contractInstance, abi);
  try {
    const accounts = await getAccounts(web3Instance);

    // Expose methods for development
    window.mentat = contract;
    window.ethAccounts = accounts;

    if (!accounts || accounts.length === 0) {
      return renderApp(null, null, 'no_account');
    }
    return renderApp(contract, accounts);
  } catch (error) {
    return renderApp(null, null, error);
  }
});
