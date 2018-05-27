import React from 'react';
// import Chat from '../elements/Chat';
import abi from '../abis/mentat';

const MetaMaskExtensionUrl = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';
const netMap = {
  1: 'Main Net',
  2: 'Morden - deprecated',
  3: 'Ropsen Test Net',
  4: 'Rinkeby Test Net',
  42: 'Kovan Test Net',
  5777: 'Ganache Test Net'
};
const contractAdress = '0x00EfBCc3A77F3Fb9fF36BE751452B5dFE59E19E2';

class AgentSignin extends React.Component {
  constructor(){
    super();
    this.state = {
      state: 'loading',
      accounts: null,
      primaryAccount: 0,
      online: false,
      network: null
    }
  }

  componentDidMount() {
    this.verifyMetamask();
  }

  async init() {
    const { eth } = this.props;
    try {
      const accounts = await eth.accounts();
      this.setState({ accounts });
      const Mentat = eth.contract(abi).at(accounts[this.state.primaryAccount]);
      const user = await Mentat.agentSignIn();
      this.setState({ user });
    } catch (error) {
      console.log('error', error);
      this.setState({ error });
    }
  }

  verifyMetamask() {
    if (!this.props.web3) {
      this.setState({ status: 'no_web3' });
    } else if (this.props.web3.currentProvider.isMetaMask === true) {
      this.setState({ status: 'fetching_accounts' });
      this.props.web3.eth.getAccounts((error, accounts) => {
        if (accounts.length === 0) {
          this.setState({ status: 'no_account' });
        }
        else {
          this.setState({ status: 'ready', accounts });
        }
      });
    } else {
      this.setState({ status: 'no_metamask' });
    }
  }

  renderStatus(status) {
    switch (status) {
      case 'no_web3':
        return (
          <div className="NoMetamask CenterContent">
            <h3>Before you can start, you have to unlock MetaMask.</h3>
            <div>
              <a href={ MetaMaskExtensionUrl } className="Button gradient" target="_blank" rel="noopener noreferrer">Install MetaMask</a>
            </div>
          </div>
        );
      case 'no_metamask':
        return (
          <div className="NoMetamask CenterContent">
            <h3>Mentat currently only supports MetaMask as a web3 provider.</h3>
            <div>
              <a href={ MetaMaskExtensionUrl } className="Button gradient" target="_blank" rel="noopener noreferrer">Install MetaMask</a>
            </div>
          </div>
        );
      case 'no_account':
        return (
          <div className="Ready">
            Welcome to Mentat. Enter you name and email to get started:
          </div>
        );
      case 'connect_sc':
        return (
          <div className="Ready SplitScreen">
            Account loaded, fetch contract...
          </div>
        );
      case 'fetching_accounts':
        return (
          <div className="Loading">Fetching your account details...</div>
        );
      case 'ready':
        return this.renderAgentHome();
      case 'loading':
      default:
        return (
          <div className="Loading">{status}...</div>
        );
    }
  }

  renderAgentHome() {
    return (
      <div className="AgentHome">
        <div className="Accounts">
          <h2>Your Accounts{ this.state.network && ` (${this.state.network.name})`}:</h2>
          <div className="AccountsList">
            { this.state.accounts.map(account => (
              <div className="Account" key={ account }>{ account }</div>
            )) }
          </div>
        </div>
      </div>
    );
  }

  render(){
    return (
      <div className="AgentSignin">
        { this.renderStatus(this.state.status) }
        {/* <Chat /> */}
      </div>
    );
  }
}

export default AgentSignin;
