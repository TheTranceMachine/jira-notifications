import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import history from './history';
import Login from './features/login/Login';
import Profile from './features/profile/Profile';
import Issues from './features/issues/Issues';
import { jiraApi } from './features/api/apiSlice';

class App extends Component {
  constructor(props) {
    super(props);

    this.store = configureStore({
      reducer: {
        // Add the generated reducer as a specific top-level slice
        [jiraApi.reducerPath]: jiraApi.reducer,
      },
      // Adding the api middleware enables caching, invalidation, polling,
      // and other useful features of `rtk-query`.
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(jiraApi.middleware),
    })
  }
  render() {
    return (
      <Provider store={this.store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/issues" component={ Issues } />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
