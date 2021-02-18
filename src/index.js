import React from 'react';
import {render} from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import { SocialProvider } from './context/socialContext';

render(

  <SocialProvider>
    <App/>
  </SocialProvider>
  

  , document.getElementById("root")
)
