import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { DrizzleProvider } from "drizzle-react";
import { LoadingContainer } from "drizzle-react-components";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './styles/mui';
import Profile from './pages/Profile';
import CreatorAdmin from './pages/CreatorAdmin';

import "./App.css";

import drizzleOptions from "./drizzleOptions";
import MyContainer from "./MyContainer";
import store from './middleware'

class App extends Component {
  render() {
    return (
      <DrizzleProvider store={store} options={drizzleOptions}>
        <MuiThemeProvider theme={theme}>
          <LoadingContainer>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={MyContainer} />
                    <Route exact path="/creator-admin" component={MyContainer} />
                    <Route exact path="/creators" component={MyContainer} />
                    <Route exact path="/profile" component={MyContainer} />
                    <Route component={MyContainer} />
                </Switch>
            </BrowserRouter>
          </LoadingContainer>
        </MuiThemeProvider>
      </DrizzleProvider>
    );
  }
}

export default App;
