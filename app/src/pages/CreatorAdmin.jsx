import React from "react";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import logo from "../logo.png";
import { PageHeader } from 'antd';
import PaddedPaper from "../atoms/PaddedPaper/PaddedPaper";
import {ContractData, ContractForm} from "drizzle-react-components";

export default () => (
    <div>
        <PageHeader onBack={() => null} title="Manage your creator settings" style={{ padding: '10px', leftMargin: '50px', color: '#0667d0' }} />
        <div className="App" style={{backgroundColor: '#0667d0', width: '95%'}}>
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
    </div>
);
