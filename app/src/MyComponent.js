import React, { Component } from "react";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  ContractData,
  ContractForm,
} from "./components";

import logo from "./logo.png";

class MyComponent extends Component {
  render() {
    return (
      <div className="App">
        <ToastContainer />
        <div>
          <img src={logo} alt="drizzle-logo" />
          <h1>Drizzle Event Example</h1>
          <p>Connect and react to Solidity Contract events by hooking into Drizzle Redux state</p>

          <strong>Connected as {this.props.accounts[0]}</strong>
        </div>
    
        <div className="section">
          <h2>SimpleStorage with event</h2>
          <p>
            <strong>Stored Value: </strong>
            <ContractData contract="SimpleStorage" method="storedData" />
          </p>
          <ContractForm contract="SimpleStorage" method="set" />
        </div>
    
        <div className="section">
          <h2>Patronage Collectibles</h2>
          <strong>My tokens: </strong>
          <ContractData contract="PatronageCollectibles" method="balanceOf" methodArgs={[this.props.accounts[0]]} />

          <br />

          <strong>Tokens I created: </strong>
          <ContractData contract="PatronageCollectibles" method="tokensOfCreator" methodArgs={[this.props.accounts[0]]} />

          <br />

          <strong>Tokens I own: </strong>
          <ContractData contract="PatronageCollectibles" method="tokensOfOwner" methodArgs={[this.props.accounts[0]]} />          

          <br />

          <strong>Mint new token: </strong>
          <ContractForm contract="PatronageCollectibles" method="mint" />
        </div>
      </div>
    );
  }
}

export default MyComponent;