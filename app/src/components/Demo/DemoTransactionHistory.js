import { drizzleConnect } from 'drizzle-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag, Table, Typography } from 'antd';
import { Grid } from "@material-ui/core";

const { Text } = Typography;

const columns = [
  {
    title: 'Collectible ID',
    dataIndex: 'tokenId',
    key: 'tokenId',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: 'Tier',
    dataIndex: 'tier',
    key: 'tier',
    render: (text) => {
      return (
        <Tag color="gold">{text}</Tag>
      )
    }
  },  
  {
    title: 'Sent by',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Amount',
    key: 'amount',
    dataIndex: 'amount',
  },
];

const data = [{
  tokenId: '#440723636211504800',
  tier: 'Gold',
  address: 'mel.patronage.eth',
  amount: 'Ξ200'
  },
  {
    tokenId: '#690182961454529800',
    tier: 'Bronze',
    address: 'yos.patronage.eth',
    amount: 'Ξ300'
  },
  {
    tokenId: '#720025927993815000',
    tier: 'Gold',
    address: 'yos.patronage.eth',
    amount: 'Ξ1200'
  }
];

class DemoTransactionHistory extends Component {
  render() {
    return (
      <div className="TransactionHistory">
        <Grid container spacing={5} alignItems="center" justify="center" style={{padding: '20px'}} >
          <h2>Total earnings: Ξ1700</h2>
          <Table dataSource={data} columns={columns} style={{width: 800, paddingTop: '10px'}}/>
        </Grid>
      </div>
    );
  }
}

DemoTransactionHistory.contextTypes = {
  drizzle: PropTypes.object,
};
DemoTransactionHistory.propTypes = {
  account: PropTypes.string,
  contracts: PropTypes.object, // eslint-disable-line
};
DemoTransactionHistory.defaultProps = {
  tokenID: null,
  account: null,
};

const mapStateToProps = state => ({
  contracts: state.contracts,
});
export default drizzleConnect(DemoTransactionHistory, mapStateToProps);
