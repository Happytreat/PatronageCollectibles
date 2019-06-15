import React, { Component } from "react";
import 'react-toastify/dist/ReactToastify.css'

import { Tabs, PageHeader, Typography, Divider, Button } from 'antd';
import 'antd/dist/antd.css';
import CreatorAdmin from './pages/CreatorAdmin';
import Patron from './pages/Patron';
import Profile from './pages/Profile';
import PublicCreators from './pages/PublicCreators';
import { Logo } from './components/Logo';

// import withStyles from "@material-ui/core/styles/withStyles";

const { TabPane } = Tabs;
const { Text } = Typography;
//
// const styles = theme => ({
//     wrapper: {section
//         backgroundColor: '#0667d0',
//         width: '100%',
//         padding: theme.spacing.unit,
//         [theme.breakpoints.up('md')]: {
//             padding: theme.spacing.unit * 2,
//         },
//     },
// });

class MyComponent extends Component {
  render() {
    //console.log(this.props);
      return (
          <div style={{padding: '10px', leftMargin: '50px', fontFamily: 'Helvetica'}}>
            <PageHeader>
              <Logo />
              <Divider />
              <Tabs defaultActiveKey="1" tabPosition="left" tabBarGutter >
                  <TabPane tab="My Profile" key="1">
                      <Profile accounts={this.props.accounts}/>
                  </TabPane>
                  <TabPane tab="Creator Dashboard" key="2">
                      <CreatorAdmin accounts={this.props.accounts}/>
                  </TabPane>
                  <TabPane tab="My Collectibles" key="3">
                    <Patron accounts={this.props.accounts}/>
                  </TabPane>
                  <TabPane tab="Explore Creators" key="4">
                      <PublicCreators />
                  </TabPane>
              </Tabs>
            </PageHeader>
          </div>
      )
  }
}

export default MyComponent;