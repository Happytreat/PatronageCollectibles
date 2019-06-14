import { drizzleConnect } from 'drizzle-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Claim extends Component {
  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;
    this.dataKey = this.contracts.PatronageCollectibles.methods.tokenURI.cacheCall(this.props.tokenID);
  }

  render() {
    const contract = this.props.contracts.PatronageCollectibles;
    if (!contract.initialized) {
      return (
        <em>"Initializing..."</em>
      );
    } else if (!(this.dataKey in contract.tokenURI)) {
      return (
        <em>"Fetching..."</em>
      );
    }

    // Show a loading spinner for future updates.
    const pendingSpinner = contract.synced ? '' : ' 🔄';

    // TODO: have Solidity struct with more data
    const uri = contract.tokenURI[this.dataKey].value;
    console.log(uri);

    return (
      <div class="collectible">
        Collectible component URI: {uri} {pendingSpinner}
      </div>
    );
  }
}

Claim.contextTypes = {
  drizzle: PropTypes.object,
};
Claim.propTypes = {
  tokenID: PropTypes.integer,
  contracts: PropTypes.object, // eslint-disable-line
};
Claim.defaultProps = {
  tokenID: null,
};

const mapStateToProps = state => ({
  contracts: state.contracts,
});
export default drizzleConnect(Claim, mapStateToProps);
