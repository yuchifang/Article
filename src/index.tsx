import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux"
import store from "./store/store"
import { createGlobalStyle } from "styled-components"
import { MediaQueries } from "./styles/media"

const GlobalStyle = createGlobalStyle`
    *{
        margin:0px;
        padding:0px;
        list-style: none;
    }
    
    html{
      width: 100vw;
      font-size:16px;
      ${MediaQueries.MobileSCSS`
        font-size:12px
      `}
    }
`

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
