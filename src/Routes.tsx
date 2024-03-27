import React from 'react';
import App from './App';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StockDetails from './components/StockDetail';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/stock-details" component={StockDetails} />
      </Switch>
    </Router>
  );
};

export default Routes;
