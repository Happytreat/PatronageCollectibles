import { drizzleConnect } from 'drizzle-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag, Table, Typography } from 'antd';
import { Grid } from "@material-ui/core";

const { Text } = Typography;

const columns = [
  {
    title: 'Token ID',
    dataIndex: 'tokenId',
    key: 'tokenId',
    render: text => <a href="javascript:;">{text}</a>,
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
  address: '0x081d78c21EB0c4f6A051d3c0Da3DA6C240ba3b64',
  amount: 'Ξ200'
  },
  {
    tokenId: '#690182961454529800',
    address: '0x081d78c21EB0c4f6A051d3c0Da3DA6C240ba3b64',
    amount: 'Ξ300'
  },
  {
    tokenId: '#720025927993815000',
    address: '0x081d78c21EB0c4f6A051d3c0Da3DA6C240ba3b64',
    amount: 'Ξ1200'
  }
];

class DemoTransactionHistory extends Component {
  render() {
    return (
      <div className="TransactionHistory">
        <Grid container spacing={5} alignItems="center" justify="center" style={{padding: '20px'}} >
          <Text strong>Current balance: Ξ</Text>
          <Text underline>1700</Text>
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
