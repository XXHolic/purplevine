import React from 'react';
import { Layout } from 'antd';

import Menu from './components/menu/index';

import styles from './App.module.css';

const { Sider } = Layout;

function App() {
  return (
    <Layout>
      <Sider>
        <Menu></Menu>
      </Sider>
      <Layout className={styles.layout}>
      dsa
      </Layout>
    </Layout>
  );
}

export default App;
