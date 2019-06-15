import { drizzleConnect } from 'drizzle-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from "@material-ui/core";
import { Collectible } from '../components';

class CollectiblesWallet extends Component {
  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;
    this.tokensOfOwner = this.contracts.PatronageCollectibles.methods.tokensOfOwner.cacheCall(this.props.account);
  }

  render() {
    const contract = this.props.contracts.PatronageCollectibles;
    if (!contract.initialized) {
      return (
        <em>"Initializing..."</em>
      );
    } else if (!(this.tokensOfOwner in contract.tokensOfOwner)) {
      return (
        <em>"Fetching..."</em>
      );
    }

    const tokensOfOwner = contract.tokensOfOwner[this.tokensOfOwner].value;
    const collectibles = tokensOfOwner.map(tokenId => {
      return (
        <Collectible tokenId={tokenId} hideOwner={true} />
      )
    });

    return (
      <div className="collectible">
        <Grid container spacing={5} alignItems="center" style={{padding: '20px'}} >
          {collectibles}
        </Grid>
      </div>
    );
  }
}

CollectiblesWallet.contextTypes = {
  drizzle: PropTypes.object,
};
CollectiblesWallet.propTypes = {
  account: PropTypes.string,
  contracts: PropTypes.object, // eslint-disable-line
};
CollectiblesWallet.defaultProps = {
  tokenID: null,
  account: null,
};

const mapStateToProps = state => ({
  contracts: state.contracts,
});
export default drizzleConnect(CollectiblesWallet, mapStateToProps);
