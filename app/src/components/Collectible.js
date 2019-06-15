import { drizzleConnect } from 'drizzle-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag, Card, Typography } from 'antd';
import {Grid} from "@material-ui/core";
import SetPriceForm from '../components/SetPriceForm';
import DepositTaxForm from '../components/DepositTaxForm';

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

    // TODO: have Solidity struct with more data
    const uri = contract.tokenURI[this.dataKey].value;
    console.log(uri);

    const { 
      0: creator,
      1: owner,
      2: taxBalance,
      3: price,
      4: canReclaim
    } = contract.info[this.dataKey].value;

    return (
      <Grid item xs={2}>
        <Card hoverable cover={<img alt='' src={`https://robohash.org/${this.props.tokenId}?set=set4`} />} style={{ width: 200 }}>
          <Typography>
            <Paragraph>
              <Text strong>
                Collectible Id: {this.props.tokenId}
              </Text>
            </Paragraph>
            <Paragraph>
              <Text>Creator: {creator} </Text>
            </Paragraph>
            <Paragraph>
              <Text>Owner: {owner} </Text>
            </Paragraph>
            <Paragraph>
              <a href="#">Kpop CoverStar</a>
            </Paragraph>
            <Paragraph>
              <Tag color="gold">
                {uri}
              </Tag>
            </Paragraph>
            <Paragraph>
              <Text>Current Price: {price} </Text>
              <SetPriceForm contract="PatronageCollectibles" method="setPrice" labels={['tokenId', 'New Price']} tokenId={[this.props.tokenId]}/>
            </Paragraph>
            <hr></hr>
            <Paragraph>
              <Text>Tax Balance: {taxBalance} </Text>
              <Text>Underpaid: {canReclaim ? 'yes' : 'no ' } </Text>
              <DepositTaxForm contract="PatronageCollectibles" method="deposit" labels={['tokenId']} tokenId={[this.props.tokenId]}/>
            </Paragraph>
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
  contracts: PropTypes.object, // eslint-disable-line
};
Collectible.defaultProps = {
  tokenId: null,
};

const mapStateToProps = state => ({
  contracts: state.contracts,
});
export default drizzleConnect(Collectible, mapStateToProps);
