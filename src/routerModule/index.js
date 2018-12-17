import React from 'react';
import { HashRouter } from "react-router-dom";
import Routes from './Routes';
import Handler from './handler';

const Router = () =>
  (<HashRouter>
    <React.Fragment>
      <Routes />
      <Handler />
    </React.Fragment>
  </HashRouter>);
  
export default Router;