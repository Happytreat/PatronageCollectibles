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
