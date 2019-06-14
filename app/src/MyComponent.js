import React, { Component } from "react";
import 'react-toastify/dist/ReactToastify.css'

import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import CreatorAdmin from './pages/CreatorAdmin';
import Patron from './pages/Patron';
import Profile from './pages/Profile';
import PublicCreators from './pages/PublicCreators';

// import withStyles from "@material-ui/core/styles/withStyles";

const { TabPane } = Tabs;
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

function callback(key) {
    console.log(key);
}

class MyComponent extends Component {
  render() {
    //console.log(this.props);
      return (
          <div style={{padding: '10px', leftMargin: '50px', fontFamily: 'Helvetica'}}>
              <Tabs defaultActiveKey="1" onChange={callback} tabPosition="top" tabBarGutter>
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
          </div>
      )
  }
}

export default MyComponent;