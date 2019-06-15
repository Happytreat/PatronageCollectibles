import React from "react";
import {Link} from "react-router-dom";
import { Button } from 'antd';

export const Logo = () => (
  <div>
    <a href='/'>
      <img src="https://robohash.org/123erf4?set=set4" alt="logo" style={{width: 60, height: 50, paddingRight: 10, display: 'inline'}}/>
      <h4 style={{fontWeight: 700, display: 'inline'}}>Patronage Collectibles</h4>
    </a>
    <Button style={{paddingTop: '-5%', marginLeft:'80%'}} icon='search'>
      <Link to="/"/>
      Explore
    </Button>
  </div>
);