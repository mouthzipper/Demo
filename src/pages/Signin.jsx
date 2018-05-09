import React from 'react';

const MetaMaskExtensionUrl = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';
const netMap = {
  1: 'Main Net',
  2: 'Morden - deprecated',
  3: 'Ropsen Test Net',
  4: 'Rinkeby Test Net',
  42: 'Kovan Test Net'

};

class Signin extends React.Component {
  constructor(){
    super();
    this.state = {
      state: 'loading',
      network: null
    }
  }

  componentDidMount() {
    if (!this.props.web3) {
      this.setState({ status: 'no_web3' });
    } else if (this.props.web3.currentProvider.isMetaMask === true) {
      this.setState({ status: 'fetching_accounts' });
      this.props.web3.eth.getAccounts((error, accounts) => {
        if (accounts.length == 0) {
          this.setState({ status: 'no_account' });
        }
        else {
          this.setState({ status: 'ready', accounts });
        }
      });
      this.props.web3.version.getNetwork((err, netId) => {
        if (!err) {
          this.setState({ network: { netId, name: netMap[netId] || 'unknown network' } });
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
          <div className="Ready">
            Please install <a href={ MetaMaskExtensionUrl } target="_blank" rel="noopener noreferrer">MetaMask</a>.
          </div>
        );
      case 'no_metamask':
        return (
          <div className="Ready">
            You have another Web3 provider. Mentat currently only supports <a href={ MetaMaskExtensionUrl } target="_blank" rel="noopener noreferrer">MetaMask</a>.
          </div>
        );
      case 'no_account':
        return (
          <div className="Ready">
            Welcome to Mentat. Enter you name and email to get started:
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
    console.log(this.state.accounts);
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
      <div className="Signin">
        { this.renderStatus(this.state.status) }
      </div>
    );
  }
}

export default Signin;
