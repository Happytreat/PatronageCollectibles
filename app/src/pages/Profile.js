import React, {Component} from "react";
import PaddedPaper from "../atoms/PaddedPaper/PaddedPaper";
import { Descriptions, Card, Typography } from 'antd';
import Display from '../assets/images/dp.png';
import { Grid } from '@material-ui/core';

const { Title, Text, Paragraph } = Typography;
class Profile extends Component {
  state = {
    name: 'Ms Kitty',
    language: 'English',
    description: 'I am a designer of unique Hello Kitty! Fund me for personalised designs of Hello Kitty!'
  };

  onChange = (type) => (text) => {
    this.setState({ [type]: text});
  };

  render() {
    return (
      <div>
        <PaddedPaper>
          <Grid container spacing={2} style={{padding: '20px'}}>
            <Grid item xs={3}>
              <Card cover={<img src={Display} alt="Display Pic" style={{borderRadius: 30, height: 300, width: 300}}/>}
                    style={{height: 300, width: 300}}/>
            </Grid>
            <Grid item xs={8}>
              <Descriptions title="My Profile" bordered column={1}>
                <Descriptions.Item label="My Wallet Address:">
                  <Text copyable>1223ghjynv23hjjnvt239hnds9asc</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Public Display Name">
                  <Text editable={{onChange: this.onChange('name')}}>{this.state.name}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Language">
                  <Text editable={{onChange: this.onChange('language')}}>{this.state.language}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Description">
                  <Paragraph editable={{onChange: this.onChange('description')}}>{this.state.description}</Paragraph>
                </Descriptions.Item>
              </Descriptions>
            </Grid>
          </Grid>
        </PaddedPaper>
      </div>
    )
  }
}


export default Profile;