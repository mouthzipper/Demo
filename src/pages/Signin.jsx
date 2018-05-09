import React from 'react';

const MetaMaskExtensionUrl = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';

class Signin extends React.Component {
  constructor(){
    super();
    this.state = {
      state: 'loading'
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
      <div>
        { this.state.accounts.map(account => (
          <div className="Account" key={ account }>{ account }</div>
        )) }
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
