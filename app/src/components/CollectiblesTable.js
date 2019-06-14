import { drizzleConnect } from 'drizzle-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag, Table } from 'antd';

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
    // this.dataKey = this.contracts.PatronageCollectibles.methods.tokenURI.cacheCall(this.props.tokenID);
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

    // Show a loading spinner for future updates.
    const pendingSpinner = contract.synced ? '' : ' 🔄';

    // TODO: have Solidity struct with more data
    // const uri = contract.tokenURI[this.dataKey].value;
    const tokensOfOwner = contract.tokensOfOwner[this.tokensOfOwner].value;
    const tokensOfCreator = contract.tokensOfCreator[this.tokensOfCreator].value;
    // const ownerOfTokensKeys = tokensOfCreator.map(tokenId => {
    //   return {
    //     key: this.contracts.PatronageCollectibles.methods.ownerOf.cacheCall(tokenId),
    //     id: tokenId,
    //   };
    // });
    // console.log("ownerOfTokensKeys", ownerOfTokensKeys);
    // console.log("Contract", contract);
    // const ownerOfTokens = ownerOfTokensKeys.map(o => {
    //   return {
    //     owner: contract.ownerOf[o.key].value,
    //     id: o.id,
    //   };
    // });
    // console.log("ownerOfTokens", ownerOfTokens);

    const data = tokensOfCreator.map(token => {
      return {
        id: token,
        sold: tokensOfOwner.includes(token) ? 'Not sold' : 'Sold',
        tiers: 'super',
      }
    });

    return (
      <div className="collectible">
        <Table columns={columns} dataSource={data} style={{width: '1200px', marginLeft: '15%'}}/>
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
