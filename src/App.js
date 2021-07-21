import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './containers/Layout';
import './styles/App.scss';

function App() {
  return (
    <React.StrictMode>
      <Router>
        <Layout />
      </Router>
    </React.StrictMode>
  );
}

export default App;
