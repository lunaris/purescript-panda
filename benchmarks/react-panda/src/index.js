import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

fetch('http://localhost:5000/static/queens.json')
  .then(data => data.json())
  .then(queens => {
    ReactDOM.render(<App rows={queens} />, document.getElementById('root'));
    registerServiceWorker();
  });
