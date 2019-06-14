import React from "react";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  ContractData,
  ContractForm,
} from "drizzle-react-components";

import logo from "./logo.png";
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import CreatorAdmin from './pages/CreatorAdmin';
import Profile from './pages/Profile';
// import withStyles from "@material-ui/core/styles/withStyles";

const { TabPane } = Tabs;

const styles = theme => ({
    wrapper: {
        backgroundColor: '#0667d0',
        width: '100%',
        padding: theme.spacing.unit,
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing.unit * 2,
        },
    },
});

function callback(key) {
    console.log(key);
}

const Logo = () => {
  return (
    <div>
      <img src={logo} alt="drizzle-logo" />
    </div>
  )
};

const MyComponent =  () => (
    <div style={{ padding: '10px', leftMargin: '50px', fontFamily: 'Helvetica'}}>
        <Tabs defaultActiveKey="1" onChange={callback} tabPosition="top" tabBarGutter tabBarExtraContent={Logo}>
            <TabPane tab="My Profile" key="1">
              <Profile />
            </TabPane>
            <TabPane tab="Creator Admin" key="2">
                <CreatorAdmin />
            </TabPane>
            <TabPane tab="Creator Dashboard" key="3">
                Content of Tab Pane 2
            </TabPane>
        </Tabs>
    </div>
);

export default MyComponent;