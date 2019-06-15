import React, {Component} from "react";
import PaddedPaper from "../atoms/PaddedPaper/PaddedPaper";
import { Descriptions, Card, Typography } from 'antd';
import Display from '../assets/images/dp.png';
import { Grid } from '@material-ui/core';
import { Collectible } from '../components';

const { Title, Text, Paragraph } = Typography;
class Profile extends Component {
  state = {
    name: 'Kpop Cover Star',
    language: 'English',
    description: 'Kpop dancer gives personalized shout-outs and patron-only access to the previous episodes of their video series.'
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
                  <Text copyable>{this.props.accounts[0]}</Text>
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
              <Collectible tokenId={297330971536412540} />
            </Grid>
          </Grid>
        </PaddedPaper>
      </div>
    )
  }
}


export default Profile;