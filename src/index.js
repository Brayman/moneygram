import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const accountData = {
  balance: 299,
  spend: 15
}
const transactions = [
  {
      cost: 5.4,
      tag: "shop"
  },
  {
      cost: 6.01,
      tag: "shop"
  },
  {
      cost: 3.33+0.54,
      tag: "taxi"
  }
]

ReactDOM.render(
  <React.StrictMode>
    <App props={{accountData, transactions}}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
