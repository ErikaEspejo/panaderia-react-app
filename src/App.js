import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ProtectedRoute from './containers/ProtectedRoute';
import Layout from './containers/Layout';

import Login from './pages/Login';
import Sales from './containers/Sales';
import './styles/App.scss';

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <ProtectedRoute path="/sales">
            <Sales />
          </ProtectedRoute>
          <ProtectedRoute path="/">
            <Layout />
          </ProtectedRoute>
        </Switch>
      </Router>
    </React.StrictMode>
  );
}

export default App;
