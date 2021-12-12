import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import CoinPage from './Routes/CoinPage';
import Home from './Routes/Home';

function App() {
  return (
    <div className="App">
     <Router>
       <Switch>
         <Route exact path="/" component={Home}/>
         <Route path="/CoinPage/:id" component={CoinPage} />
       </Switch>
     </Router>
    </div>
  );
}

export default App;
