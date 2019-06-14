import React from "react";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Mint from '../assets/images/mintcoins.svg';
import { PageHeader, Typography, Divider, Tabs } from 'antd';
import PaddedPaper from "../atoms/PaddedPaper/PaddedPaper";
import { ContractData, ContractForm } from "drizzle-react-components";
import {Collectible} from "../components";
import { contract } from '../const/contract';
import CollectiblesTable from "../components/CollectiblesTable";
import MintForm from "../components/MintForm";
import Profile from "./Profile";

const { Title, Paragraph, Text, Tag } = Typography;
const { TabPane } = Tabs;

export default ({ accounts }) => (
    <div>
        <PageHeader onBack={() => null} title="Manage your creator settings" style={{ padding: '10px', leftMargin: '50px', color: '#0667d0' }} />
        <div className="App" style={{backgroundColor: '#0667d0', width: '95%'}}>
            <ToastContainer />
            <PaddedPaper>
              <img src={Mint} alt="Minting coins" style={{ height: '400px', width: '400px' }}/>
              <Typography>
                <Title>Creator Dashboard</Title>
                <Paragraph>Mint and sell unique collectibles here.</Paragraph>
              </Typography>

              <Divider />
              <Tabs defaultActiveKey="1" tabPosition="top" tabBarGutter>
                <TabPane tab="Collectibles I minted" key="1" align="center">
                  <CollectiblesTable account={accounts[0]}/>
                </TabPane>
                <TabPane tab="Mint Collectibles" key="2" align="center">
                  <strong>Mint a new collectible: </strong>

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
