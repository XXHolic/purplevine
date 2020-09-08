import React,{useEffect} from 'react';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Router from 'components/router';


function App() {

  useEffect(() => {

  },[])

  return (
    <ConfigProvider locale={zhCN}>
      <Router></Router>
    </ConfigProvider>
  );
}

export default App;
