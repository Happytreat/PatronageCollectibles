import { drizzleConnect } from 'drizzle-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag, Card, Typography } from 'antd';
import {Grid} from "@material-ui/core";
import SetPriceForm from '../components/SetPriceForm';
import BuyForm from '../components/BuyForm';
import { Button } from 'antd';

const { Text, Paragraph } = Typography;

class Collectible extends Component {
  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;
    this.dataKey = this.contracts.PatronageCollectibles.methods.tokenURI.cacheCall(this.props.tokenId);
    this.infoKey = this.contracts.PatronageCollectibles.methods.info.cacheCall(this.props.tokenId);
  }

  render() {
    const contract = this.props.contracts.PatronageCollectibles;
    if (!contract.initialized) {
      return (
        <em>"Initializing..."</em>
      );
    } else if (!(this.dataKey in contract.tokenURI) || !(this.infoKey in contract.info)) {
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

    const ownerInfo = (
      <Paragraph style={{'word-wrap': 'break-word'}}>
        Owner: {owner}
      </Paragraph>
    );

    const actionForm = (this.props.accounts[0] === owner ? 
      (
        <SetPriceForm contract="PatronageCollectibles" method="setPrice" labels={['tokenId', 'New Price']} tokenId={this.props.tokenId}/>
      ) 
      : 
      (
        <BuyForm contract="PatronageCollectibles" method="buy" labels={['tokenId', 'NewPrice']} tokenId={this.props.tokenId} sendArgs={{ value: price }}/>
      )
    )

    const collectButton = (
      <Button
        key="submit"
        type="primary"
        onClick={this.handleSubmit}
      >
        Collect Taxes
      </Button>
    )

    return (
      <Grid item xs={2}>
        <Card hoverable cover={<img alt='' src={`https://robohash.org/${this.props.tokenId}?set=set4`} />} style={{ width: 200 }}>
          <Typography>
            <Paragraph>
              <Text strong>
                #{this.props.tokenId}
              </Text>
            </Paragraph>
            <Paragraph>
              by <a href="/creators/kpopcoverstar">Kpop CoverStar</a>
            </Paragraph>
            {this.props.hideOwner ? null : ownerInfo}
            <Paragraph>
              <Tag color="gold">
                {uri}
              </Tag>
            </Paragraph>  
            <Paragraph>
              <h4>Price: Ξ{price} {pendingSpinner}</h4>
            </Paragraph>
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
};
Collectible.defaultProps = {
  tokenId: null,
  hideActions: false,
  hideCollect: true,
  hideOwner: false
};

const mapStateToProps = state => ({
  accounts: state.accounts,
  contracts: state.contracts,
});
export default drizzleConnect(Collectible, mapStateToProps);
