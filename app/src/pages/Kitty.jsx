import React, { Component } from "react";
import 'react-toastify/dist/ReactToastify.css'

import { Tabs, PageHeader, Typography, Divider, Button, Carousel } from 'antd';
import 'antd/dist/antd.css';
import { Logo } from '../components/Logo';
import CarouselOne from '../assets/images/bts3.png'
import CarouselTwo from '../assets/images/bts2.jpg'
import CarouselThree from '../assets/images/bts.jpg'
import Display from "../assets/images/dp.png";
import {Grid} from "@material-ui/core";

// import withStyles from "@material-ui/core/styles/withStyles";

const { TabPane } = Tabs;
const { Title, Paragraph, Text } = Typography;

class MyComponent extends Component {
  render() {
    //console.log(this.props);
    return (
      <div style={{padding: '10px', leftMargin: '50px', fontFamily: 'Helvetica'}}>
        <PageHeader>
          <Logo />
          <Divider />
          <div style={{backgroundColor: '#F0D3F7'}}>
            <div style={{height: 600}}>
              <Carousel autoplay>
                <div>
                  <img src={CarouselOne} alt="Product 1" style={{height: 600, width: '90%', marginLeft: '5%'}}/>
                </div>
                <div>
                  <img src={CarouselTwo} alt="Product 1" style={{height: 600, width: '90%', marginLeft: '5%'}}/>
                </div>
                <div>'
                  <img src={CarouselThree} alt="Product 1" style={{height: 600, width: '90%', marginLeft: '5%'}}/>
                </div>
              </Carousel>
            </div>
            <Grid container spacing={2} alignContent="center" justify="center" style={{padding: '20px'}}>
              <Grid item xs={12} style={{marginLeft: '45%'}}>
                <img src={Display} alt="Display Pic" style={{borderRadius: 30, height: 150, width: 150, display:'inline'}}/>
                <Text strong>Kpop Cover Star</Text>
              </Grid>

              <Grid item xs={3}>

              </Grid>
            </Grid>
          </div>
        </PageHeader>
      </div>
    )
  }
}

export default MyComponent;