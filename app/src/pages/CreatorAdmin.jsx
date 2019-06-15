import React from "react";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Mint from '../assets/images/mintcoins.svg';
import { PageHeader, Typography, Divider, Tabs } from 'antd';
import { contract } from '../const/contract';
import CollectiblesTable from "../components/CollectiblesTable";
import MintForm from "../components/MintForm";
import DemoTransactionHistory from "../components/Demo/DemoTransactionHistory";

const { Title, Paragraph, Text, Tag } = Typography;
const { TabPane } = Tabs;

export default ({ accounts }) => (
    <div>
        <div className="App">
            <ToastContainer />
              <img src={Mint} alt="Minting coins" style={{ height: '400px', width: '400px' }}/>
              <Typography>
                <Title>Creator Dashboard</Title>
                <Paragraph>Mint and sell unique collectibles here.</Paragraph>
              </Typography>

              <Tabs defaultActiveKey="1" tabPosition="top" tabBarGutter>
                <TabPane tab="Collectibles I minted" key="1" align="center">
                  <CollectiblesTable account={accounts[0]}/>
                </TabPane>
                <TabPane tab="Create New Collectible" key="2" align="center">
                  <strong>Create New Collectible: </strong>

                  <br />
                  <br />
                  <div style={{width: '600px', margin: 'auto', paddingTop: '5px'}}>
                    <MintForm contract={contract} method="mint" />
                  </div>
                </TabPane>
                <TabPane tab="Transaction History" key="3" align="center">
                  <strong>View the transaction history of collectibles you have minted: </strong>

                  <br />
                  <br />
                  <div style={{width: '800px', margin: 'auto', paddingTop: '5px'}}>
                    <DemoTransactionHistory />
                  </div>
                </TabPane>
              </Tabs>
        </div>
    </div>
);
