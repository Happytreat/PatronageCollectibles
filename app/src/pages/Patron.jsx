import React from "react";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import myCollectibles from '../assets/images/patronyellow.svg';
import { PageHeader, Typography, Divider, Tabs } from 'antd';
import PaddedPaper from "../atoms/PaddedPaper/PaddedPaper";
import { contract } from '../const/contract';
import CollectiblesWallet from "../components/CollectiblesWallet";
import MintForm from "../components/MintForm";

const { Title, Paragraph, Text, Tag } = Typography;
const { TabPane } = Tabs;

export default ({ accounts }) => (
  <div>
    <div className="App" style={{backgroundColor: '#0667d0', width: '95%'}}>
      <ToastContainer />
      <PaddedPaper>
        <img src={myCollectibles} alt="My Collectibles" style={{ height: '400px', width: '400px' }}/>
        <Typography>
          <Title>My Collectible Wallet</Title>
          <Paragraph>View and configure the unique collectibles you own.</Paragraph>
        </Typography>

        <Divider />
        <Tabs defaultActiveKey="1" tabPosition="top" tabBarGutter>
          <TabPane tab="Collectibles I own" key="1" align="center">
            <CollectiblesWallet account={accounts[0]}/>
          </TabPane>
          <TabPane tab="Set collectible selling price" key="2" align="center">
            <strong>The corresponding taxes you have to pay is: </strong>

            <br />
            <br />
            <div style={{width: '600px', margin: 'auto', paddingTop: '5px'}}>
              <MintForm contract={contract} method="mint" />
            </div>
          </TabPane>
        </Tabs>
      </PaddedPaper>
    </div>
  </div>
);
