import { drizzleConnect } from 'drizzle-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag, Card, Typography } from 'antd';
import {Grid} from "@material-ui/core";
import SetPriceForm from '../components/SetPriceForm';
import DepositTaxForm from '../components/DepositTaxForm';
import BuyForm from '../components/BuyForm';
import CollectTaxForm from '../components/CollectTaxForm';
import { Button } from 'antd';

const { Text, Paragraph } = Typography;

class Collectible extends Component {
  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;
    this.dataKey = this.contracts.PatronageCollectibles.methods.tokenURI.cacheCall(this.props.tokenId);
    this.taxOwedKey = this.contracts.PatronageCollectibles.methods.taxOwed.cacheCall(this.props.tokenId);
    this.infoKey = this.contracts.PatronageCollectibles.methods.info.cacheCall(this.props.tokenId);
  }

  render() {
    const contract = this.props.contracts.PatronageCollectibles;
    if (!contract.initialized) {
      return (
        <em>"Initializing..."</em>
      );
    } else if (!(this.dataKey in contract.tokenURI) || !(this.infoKey in contract.info) || !(this.taxOwedKey in contract.taxOwed)) {
      return (
        <em>"Fetching..."</em>
      );
    }

    // Show a loading spinner for future updates.
    const pendingSpinner = contract.synced ? '' : ' 🔄';
    const uri = contract.tokenURI[this.dataKey].value;

    const { 
      0: creator,
      1: owner,
      2: taxBalance,
      3: price,
      4: canReclaim
    } = contract.info[this.dataKey].value;

    const isOwner = this.props.accounts[0] === owner;
    const taxOwed = contract.taxOwed[this.taxOwedKey].value;

    const ownerInfo = (
      <Paragraph style={{'word-wrap': 'break-word'}}>
        Owner: {isOwner ? <strong>You!</strong> : owner}
      </Paragraph>
    );

    const actionForm = (isOwner ? 
      (
        <div>
          <hr></hr>
          <br />
          <SetPriceForm contract="PatronageCollectibles" method="setPrice" labels={['tokenId', 'New Price']} tokenId={this.props.tokenId}/>  
          <hr></hr>
          <br />
          <DepositTaxForm contract="PatronageCollectibles" method="deposit" labels={['tokenId']} tokenId={this.props.tokenId}/>  
        </div>
      ) 
      : 
      (
        <BuyForm contract="PatronageCollectibles" method="buy" labels={['tokenId', 'NewPrice']} tokenId={this.props.tokenId} sendArgs={{ value: price }}/>
      )
    )

    const collectButton = (
      <CollectTaxForm contract="PatronageCollectibles" method="collect" labels={['tokenId']} tokenId={this.props.tokenId}/>  
    )

    // const height = this.props.changeHeight ? 500 : 900;
    return (
      <Grid item xs={2}>
        <Card hoverable cover={<img alt='' src={`https://robohash.org/${this.props.tokenId}?set=set4`} />} style={{ height: 900, width: 200 }}>
          <Typography>
            <Paragraph>
              <Tag style={{ fontSize: '1.2em' }} color="gold">
                {uri}
              </Tag>
            </Paragraph>
            <Paragraph>
              by <a href="/creators/kpopcoverstar">Kpop CoverStar</a>
            </Paragraph>
            <Paragraph>
              <Text strong>
                #{this.props.tokenId}
              </Text>
            </Paragraph>
            {this.props.hideOwner ? null : ownerInfo}
            <Paragraph>
              <h3>Price: Ξ{price} {pendingSpinner}</h3>
            </Paragraph>
            {this.props.hideTax ? null : (
              <div>
                <Paragraph>
                  <h4>Tax Balance: Ξ{taxBalance} {pendingSpinner}</h4>
                </Paragraph>
                <Paragraph>
                  <h4>Tax Owed: Ξ{taxOwed} {pendingSpinner}</h4>
                </Paragraph>
              </div>
              )}
            {this.props.hideActions ? null : actionForm}
            {this.props.hideCollect ? null : collectButton}
          </Typography>
        </Card>
      </Grid>
    );
  }
}

Collectible.contextTypes = {
  drizzle: PropTypes.object,
};
Collectible.propTypes = {
  tokenId: PropTypes.number,
  hideActions: PropTypes.bool,
  hideCollect: PropTypes.bool,
  contracts: PropTypes.object, // eslint-disable-line
  hideTax: PropTypes.bool,
  changeHeight: PropTypes.bool,
};
Collectible.defaultProps = {
  tokenId: null,
  hideActions: false,
  hideCollect: true,
  hideOwner: false,
  hideTax: false,
  changeHeight: false,
};

const mapStateToProps = state => ({
  accounts: state.accounts,
  contracts: state.contracts,
});
export default drizzleConnect(Collectible, mapStateToProps);
