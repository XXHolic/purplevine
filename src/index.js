import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import * as HawkEye from 'util/hawkEye';
import * as Sentry from "@sentry/react";
import * as serviceWorker from './serviceWorker';
    // HawkEye.init({})
    // HawkEye.captureMessage({message:'error data'})
    Sentry.init({ dsn: "https://1ea46c0309124094908fa0eb69e21afb@o366923.ingest.sentry.io/5169726",debug:true })

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// fetch("http://localhost:9001/index")
//   .then(response => response.json())
//   .then(res => {
//     console.info("res", res);
//   })
//   .catch(error => {
//     console.log("Request Error", error);
//   });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
