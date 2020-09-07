import React,{useEffect} from 'react';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Router from 'components/router';
import * as HawkEye from 'util/hawkEye';

function App() {

  useEffect(() => {
    HawkEye.init()
    // HawkEye.captureMessage({message:'error data'})
  },[])

  return (
    <ConfigProvider locale={zhCN}>
      <Router></Router>
    </ConfigProvider>
  );
}

export default App;
