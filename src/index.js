import React  from 'react';
import { BrowserRouter} from 'react-router-dom';

import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.js';
//import $ from 'jquery';
//import Popper from 'popper.js';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import routes from './routes';





ReactDOM.render((
<BrowserRouter>
   <App />
</BrowserRouter>), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
