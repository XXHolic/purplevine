import React from 'react';
import { Layout } from 'antd';
import Menu from 'components/menu'
import styles from './index.module.css';

const { Sider } = Layout;

function Container(props) {
  const { children } = props;

  return (
    <Layout>
      <Sider>
        <Menu></Menu>
      </Sider>
      <Layout className={styles.layout}>
        {children}
      </Layout>
    </Layout>
  );
}

export default Container;