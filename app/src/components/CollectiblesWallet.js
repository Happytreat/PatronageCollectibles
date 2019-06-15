import { drizzleConnect } from 'drizzle-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag, Card, Typography } from 'antd';
import {Grid} from "@material-ui/core";

const { Text, Paragraph } = Typography;

class CollectiblesWallet extends Component {
  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;
    this.tokensOfOwner = this.contracts.PatronageCollectibles.methods.tokensOfOwner.cacheCall(this.props.account);
    // this.dataKey = this.contracts.PatronageCollectibles.methods.tokenURI.cacheCall(this.props.tokenID);
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

    // Show a loading spinner for future updates.
    const pendingSpinner = contract.synced ? '' : ' 🔄';

    // TODO: have Solidity struct with more data
    // const uri = contract.tokenURI[this.dataKey].value;
    const tokensOfOwner = contract.tokensOfOwner[this.tokensOfOwner].value;

    const collectibles = tokensOfOwner.map(tokenId => {
      return (
        <Grid item xs={2}>
          <Card hoverable cover={<img alt='' src={`https://robohash.org/${tokenId}?set=set4`} />} style={{ width: 200 }}>
            <Typography>
              <Paragraph>
                <Text strong>
                  Collectible Id: {tokenId}
                </Text>
              </Paragraph>
              <Paragraph>
                <Text>Creator:</Text>
              </Paragraph>
              <Paragraph>
                <a href="#">Kpop CoverStar</a>
              </Paragraph>
              <Paragraph>
                <Tag color="gold">
                  gold
                </Tag>
              </Paragraph>
            </Typography>
          </Card>
        </Grid>
      )
    });

    return (
      <div className="collectible">
        <Grid container spacing={5} justify="space-between" alignItems="center" style={{padding: '20px'}} >
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
