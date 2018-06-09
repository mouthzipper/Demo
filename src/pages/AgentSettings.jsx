import React from 'react';
import PropTypes from 'prop-types';
import LeftMenu from '../elements/LeftMenu';
import UserMenu from '../elements/UserMenu';

class AgentSettings extends React.Component {
  constructor(){
    super();
    this.state = {
      status: 'loading'
    }
  }

  // async componentDidMount() {
  //   try {
  //     const settings = await this.props.contract.agentGetSettings();
  //     this.setState({ status: 'ready', settings });
  //   } catch (error) {
  //     this.setState({ status: 'error', error });
  //   }
  // }

  render(){
    return (
      <div className="AgentHome SplitScreen">
        <LeftMenu {...this.props} />
        <main className="Settings">
          <UserMenu title="Settings" />
          { this.state.status === 'error' &&
            <div className="Error">
              { String(this.state.error) }
            </div>
          }
          <div className="Inner">
            { this.state.status === 'ready' && this.state.settings &&
              <div>
              </div>
            }
          </div>
        </main>
      </div>
    );
  }
}

AgentSettings.propTypes = {
  location: PropTypes.shape({
    key: PropTypes.string.isRequired
  }),
  contract: PropTypes.shape({
    // agentGetSettings: PropTypes.func.isRequired,
    agentSignIn: PropTypes.func.isRequired,
  }),
  accounts: PropTypes.array
};

export default AgentSettings;
