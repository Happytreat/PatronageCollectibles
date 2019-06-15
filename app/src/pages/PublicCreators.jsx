import React from "react";
import 'react-toastify/dist/ReactToastify.css'
import { PageHeader, Typography, Divider, Tabs, Card } from 'antd';
import { Grid } from '@material-ui/core';
import PaddedPaper from "../atoms/PaddedPaper/PaddedPaper";
import Kpop from '../assets/images/kpop.jpeg';
import Patron from "../assets/images/patron.svg";
import Pikachu from "../assets/images/Pikachu.png";
import Salad from "../assets/images/salad.png";
import Blockstack from "../assets/images/vitalik.jpeg";

const { Title, Paragraph, Text, Tag } = Typography;
const { TabPane } = Tabs;

const styles = {
  display: {
    height: '50px',
    width: '50px',
    borderRadius: '30px',
  }
};

export default () => (
  <div>
    <div className="App">
        <Typography>
          <img src={Patron} alt="Explore creators" style={{ height: '400px', width: '400px' }}/>
          <Title>Creator Marketplace</Title>
          <Paragraph>Learn more and support your favourite content creators here.</Paragraph>
        </Typography>

        <Divider />
        <Grid container spacing={5} justify="space-between" alignItems="center" style={{padding: '20px'}}>
          <Grid item xs={3}>
            <Card title="Kpop Cover Star" extra={<img src={Kpop} alt="Kpop"style={styles.display}/>} style={{ width: 300 }}>
              <p>Kpop dancer gives personalized shout-outs and patron-only access to the previous episodes of their video series.</p>
              <p><a href="#">See a sneak peek of patron-only content</a></p>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card title="Decentralised Poke Go" extra={<img src={Pikachu} alt="Pikachu"style={styles.display}/>} style={{ width: 300 }}>
              <p>Patron-only access to the beta version of the decentralised Pokemon Go!</p>
              <p><a href="#">See a sneak peek of patron-only content</a></p>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card title="Organic Low-Carb Life" extra={<img src={Salad} alt="Salad"style={styles.display}/>} style={{ width: 300 }}>
              <p>Certified nutritionist provides a detaield plan of low-carb high nutrient meals for your personalised needs.</p>
              <p><a href="#">See a sneak peek of patron-only content</a></p>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card title="Open Source Blockstack" extra={<img src={Blockstack} alt="Blockstack"style={styles.display}/>} style={{ width: 300 }}>
              <p>Open source developer gives personalized credit and beta patron-only access to the new Blockstack.</p>
              <p><a href="#">See a sneak peek of patron-only content</a></p>
            </Card>
          </Grid>
          <br />
          <br />
          <Grid item xs={3}>
            <Card title="Kpop Cover Star" extra={<img src={Kpop} alt="Kpop"style={styles.display}/>} style={{ width: 300 }}>
              <p>Kpop dancer gives personalized shout-outs and patron-only access to the previous episodes of their video series.</p>
              <p><a href="#">See a sneak peek of patron-only content</a></p>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card title="Kpop Cover Star" extra={<img src={Kpop} alt="Kpop"style={styles.display}/>} style={{ width: 300 }}>
              <p>Kpop dancer gives personalized shout-outs and patron-only access to the previous episodes of their video series.</p>
              <p><a href="#">See a sneak peek of patron-only content</a></p>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card title="Kpop Cover Star" extra={<img src={Kpop} alt="Kpop"style={styles.display}/>} style={{ width: 300 }}>
              <p>Kpop dancer gives personalized shout-outs and patron-only access to the previous episodes of their video series.</p>
              <p><a href="#">See a sneak peek of patron-only content</a></p>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card title="Kpop Cover Star" extra={<img src={Kpop} alt="Kpop"style={styles.display}/>} style={{ width: 300 }}>
              <p>Kpop dancer gives personalized shout-outs and patron-only access to the previous episodes of their video series.</p>
              <p><a href="#">See a sneak peek of patron-only content</a></p>
            </Card>
          </Grid>
        </Grid>
    </div>
  </div>
);
