import React from "react";
import { Badge, Avatar, Typography } from 'antd';
import { Grid } from '@material-ui/core';
import Display from '../assets/images/dp.png';

const { Text } = Typography;

export const Logo = () => (
  <div>
    <Grid container justify="space-between" spacing={5}>
      <Grid item xs={10}>
        <a href='/'>
          <img src="https://robohash.org/123erf4?set=set4" alt="logo" style={{width: 60, height: 50, paddingRight: 10, display: 'inline'}}/>
          <h4 style={{fontWeight: 700, display: 'inline'}}>Patronage Collectibles</h4>
        </a>
      </Grid>
      <Grid item xs={2}>
        <Text level={4} strong>Hi Kpop Cover Star! </Text>
        {'      '}
        <Badge count={3} style={{paddingLeft: '5%'}}>
          <Avatar src={Display} style={{height: 50, width: 50}} />
        </Badge>
      </Grid>
    </Grid>
  </div>
);