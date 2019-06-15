import React from "react";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import myCollectibles from '../assets/images/patronyellow.svg';
import { Typography, Divider, Tabs } from 'antd';
import CollectiblesWallet from "../components/CollectiblesWallet";

const { Title, Paragraph, Text, Tag } = Typography;
const { TabPane } = Tabs;

export default ({ accounts }) => (
  <div>
    <div className="App">
      <ToastContainer />
      <img src={myCollectibles} alt="My Collectibles" style={{ height: '400px', width: '400px' }}/>
      <Typography>
        <Title>My Collectible Wallet</Title>
        <Paragraph>View and configure the unique collectibles you own.</Paragraph>
      </Typography>

      <Divider />
      <CollectiblesWallet account={accounts[0]}/>
    </div>
  </div>
);
