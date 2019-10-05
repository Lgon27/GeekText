import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';
import App from './App';
import * as serviceWorker from './serviceWorker';

//var mongo = require('mongodb').MongoClient;
//var assert = require('assert');

//var url = "mongodb+srv://al:C0C0MaN910910@test-izw4a.mongodb.net/admin?retryWrites=true&w=majority/site";

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
