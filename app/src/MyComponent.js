import React from "react";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  ContractData,
  ContractForm,
} from "drizzle-react-components";

import logo from "./logo.png";
import PaddedPaper from "./atoms/PaddedPaper/PaddedPaper";
import withStyles from "@material-ui/core/styles/withStyles";

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

const MyComponent =  () => (
  <div className="App" style={{backgroundColor: '#0667d0'}}>
    <ToastContainer />
    <div>
      <PaddedPaper>
          <img src={logo} alt="drizzle-logo" />
          <h1>Drizzle Event Example</h1>
          <p>Connect and react to Solidity Contract events by hooking into Drizzle Redux state</p>
      </PaddedPaper>
    </div>

    <div className="section">
      <h2>SimpleStorage with event</h2>
      <p>Change the value to invoke a contract event</p>
      <p>
        <strong>Stored Value: </strong>
        <ContractData contract="SimpleStorage" method="storedData" />
      </p>
      <ContractForm contract="SimpleStorage" method="set" />
    </div>
  </div>
);

export default MyComponent;