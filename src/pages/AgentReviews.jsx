import React from 'react';
import PropTypes from 'prop-types';
import LeftMenu from '../elements/LeftMenu';
import UserMenu from '../elements/UserMenu';

class AgentReviews extends React.Component {
  constructor(){
    super();
    this.state = {
      status: 'loading'
    }
  }

  async componentDidMount() {
    try {
      const review = await this.props.contract.agentGetReview();
      this.setState({ status: 'ready', review });
    } catch (error) {
      this.setState({ status: 'error', error });
    }
  }

  render(){
    return (
      <div className="AgentHome SplitScreen">
        <LeftMenu {...this.props} />
        <main className="Reviews">
          <UserMenu title="Reviews" />
          { this.state.status === 'error' &&
            <div className="Error">
              { String(this.state.error) }
            </div>
          }
          <div className="Inner">
            { this.state.status === 'ready' && this.state.review &&
              <div className="Review">
              </div>
            }
          </div>
        </main>
      </div>
    );
  }
}

AgentReviews.propTypes = {
  location: PropTypes.shape({
    key: PropTypes.string.isRequired
  }),
  contract: PropTypes.shape({
    agentGetReview: PropTypes.func.isRequired,
    agentSignIn: PropTypes.func.isRequired,
  }),
  accounts: PropTypes.array
};

export default AgentReviews;
