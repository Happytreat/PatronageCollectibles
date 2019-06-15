import React, { Component } from "react";
import 'react-toastify/dist/ReactToastify.css'

import { Tabs, PageHeader, Typography, Divider } from 'antd';
import 'antd/dist/antd.css';
import CreatorAdmin from './pages/CreatorAdmin';
import Patron from './pages/Patron';
import Profile from './pages/Profile';
import PublicCreators from './pages/PublicCreators';

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

const Logo = () => (
  <div>
    <img src="https://robohash.org/123erf4?set=set4" alt="logo" style={{width: 60, height: 50, paddingRight: 10, display: 'inline'}}/>
    <h4 style={{fontWeight: 700, display: 'inline'}}>Patronage Collectibles</h4>
  </div>
);

class MyComponent extends Component {
  render() {
    //console.log(this.props);
      return (
          <div style={{padding: '10px', leftMargin: '50px', fontFamily: 'Helvetica'}}>
            <PageHeader>
              <Logo />
              <Divider />
              <Tabs ttdefaultActiveKey="3" tabPosition="left" tabBarGutter >
                  <TabPane tab="My Profile" key="1">
                      <Profile/>
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