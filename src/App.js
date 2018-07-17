// @flow

import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import * as Theme from './Theme'
import * as Pages from './pages'

class App extends Component<*> {
  render() {
    return (
      <ThemeProvider theme={Theme.main}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Pages.Home} />
            <Route exact path="/n/:id" component={Pages.ReadNote} />
            <Route exact path="/patterns" component={Pages.Patterns} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;
