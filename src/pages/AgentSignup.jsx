import React from 'react';
import { Redirect } from 'react-router-dom';
// import Select from 'react-select';
import abi from '../abis/mentat';

const MetaMaskExtensionUrl = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';
const contractAdress = '0x00EfBCc3A77F3Fb9fF36BE751452B5dFE59E19E2';

class AgentSignin extends React.Component {
  constructor(){
    super();
    this.state = {
      status: 'loading',
      accounts: null,
      primaryAccount: 0,
      online: false,
      email: '',
      name: '',
      network: null
    }
  }

  componentDidMount() {
    this.verifyMetamask();
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
          this.setState({ status: 'ready', accounts, primaryAccount: accounts[0] });
        }
      });
    } else {
      this.setState({ status: 'no_metamask' });
    }
  }

  signup(e, state) {
    if (e) {
      e.preventDefault();
    }
    const errors = [
      this.state.name.length === 0 && 'name',
      (this.state.email.length === 0 || !this.state.email.match(/.+@.+\..+/)) && 'email'
    ].filter(e => e);
    if (errors.length === 0) {
      this.setState({ status: 'done', errors: null })
    } else {
      this.setState({ errors });
    }
    // SC logic TBD
    // const contractInstance = this.props.web3.eth.contract(abi).at(contractAdress);
    // contractInstance.agentSignUp(this.state.name, this.state.email, (error, tx) => {
    //   if (!error) {
    //     console.log('agentSignUp SUCCESS', tx);
    //     this.setState({ status: 'done', error: null, error_tx: null });
    //   } else {
    //     console.log('agentSignUp error:', error);
    //     this.setState({ status: 'error', error, error_tx: tx });
    //   }
    // });
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
            We are glad to see you have MetaMask running. Now please create an account using the extension.
          </div>
        );
      case 'ready':
        return (
          <div className="Ready SplitScreen">
            <div className="FormArea Col40">
              <form onSubmit={ e => this.signup(e, this.state) }>
                { this.state.accounts &&
                  <div className="Field">
                    <label>Ethereum account</label>
                    <div className="AccountHash">
                      {this.state.primaryAccount}
                    </div>
                    {/* <Select
                      name="eth-account"
                      selectValue={ this.state.primaryAccount }
                      onChange={ account => this.setState({ primaryAccount: account.value }) }
                      options={ this.state.accounts.map(value => ({ value, label: value })) }
                    /> */}
                  </div>
                }
                <div className="Field">
                  <label>Name</label>
                  <input onChange={ e => this.setState({ name: e.target.value }) } value={ this.state.name } />
                  { this.state.errors && this.state.errors.includes('name') &&
                    <div className="Error">
                      Please enter your full name.
                    </div>
                  }
                </div>
                <div className="Field">
                  <label>Email</label>
                  <input onChange={ e => this.setState({ email: e.target.value }) } value={ this.state.email } />
                  { this.state.errors && this.state.errors.includes('email') &&
                    <div className="Error">
                      Please enter a valid email.
                    </div>
                  }
                </div>
                <div className="CenterText">
                  <button className="Button gradient" type="submit">Sign Up</button>
                </div>
              </form>
            </div>
            <div className="IllustrationArea Col60 BlueBgd">
              <h2>Work anytime, anywhere</h2>
              <p>Join 10,000 Mentats who earn crypto by completing high skill tasks.</p>
            </div>
          </div>
        );
      case 'fetching_accounts':
        return (
          <div className="Loading">Fetching your account details...</div>
        );
      case 'done':
        return <Redirect to="/agent" />;
      case 'loading':
      default:
        return (
          <div className="Loading">{status}...</div>
        );
    }
  }

  render(){
    return (
      <div className="AgentSignup">
        { this.renderStatus(this.state.status) }
      </div>
    );
  }
}

export default AgentSignin;
