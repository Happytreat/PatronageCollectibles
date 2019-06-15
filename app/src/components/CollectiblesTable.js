import { drizzleConnect } from 'drizzle-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import { Grid } from "@material-ui/core";
import { Collectible } from '../components';

const columns = [
  {
    title: 'Token ID',
    dataIndex: 'id',
    key: 'id',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: 'Sold',
    dataIndex: 'sold',
    key: 'sold',
  },
  {
    title: 'Tiers',
    key: 'tiers',
    dataIndex: 'tiers',
    render: (tier) => (
      <Tag color="magenta">
        {tier}
      </Tag>
    )
  },
];


class CollectiblesTable extends Component {
  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;
    this.tokensOfCreator = this.contracts.PatronageCollectibles.methods.tokensOfCreator.cacheCall(this.props.account);
    this.tokensOfOwner = this.contracts.PatronageCollectibles.methods.tokensOfOwner.cacheCall(this.props.account);
  }

  render() {
    const contract = this.props.contracts.PatronageCollectibles;
    if (!contract.initialized) {
      return (
        <em>"Initializing..."</em>
      );
    } else if (!(this.tokensOfOwner in contract.tokensOfOwner) || !(this.tokensOfCreator in contract.tokensOfCreator)) {
      return (
        <em>"Fetching..."</em>
      );
    }

    const tokensOfOwner = contract.tokensOfOwner[this.tokensOfOwner].value;
    const tokensOfCreator = contract.tokensOfCreator[this.tokensOfCreator].value;

    const collectibles = tokensOfCreator.map(tokenId => (
      <Collectible tokenId={tokenId} hideActions={true} />
    ))

    return (
      <div className="collectible">
        <Grid container spacing={5} alignItems="center" style={{padding: '20px'}} >
          {collectibles}
        </Grid>
      </div>
    );
  }
}

CollectiblesTable.contextTypes = {
  drizzle: PropTypes.object,
};
CollectiblesTable.propTypes = {
  account: PropTypes.string,
  contracts: PropTypes.object, // eslint-disable-line
};
CollectiblesTable.defaultProps = {
  tokenID: null,
  account: null,
};

const mapStateToProps = state => ({
  contracts: state.contracts,
});
export default drizzleConnect(CollectiblesTable, mapStateToProps);
