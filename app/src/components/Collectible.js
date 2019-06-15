import { drizzleConnect } from 'drizzle-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag, Card, Typography } from 'antd';
import {Grid} from "@material-ui/core";

const { Text, Paragraph } = Typography;

class Collectible extends Component {
  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;
    this.dataKey = this.contracts.PatronageCollectibles.methods.tokenURI.cacheCall(this.props.tokenId);
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
      <Grid item xs={2}>
        <Card hoverable cover={<img alt='' src={`https://robohash.org/${this.props.tokenId}?set=set4`} />} style={{ width: 200 }}>
          <Typography>
            <Paragraph>
              <Text strong>
                Collectible Id: {this.props.tokenId}
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
                {uri}
              </Tag>
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
