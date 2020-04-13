import React from 'react';
import { Menu as AntMenu } from 'antd';
import {
  ProjectOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import styles from './index.module.css';

function Menu() {
  return (
    <>
      <div className={styles.logo}>User Tom</div>
      <AntMenu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
        <AntMenu.Item key="1">
          <ProjectOutlined />
          <span className="nav-text">Projects</span>
        </AntMenu.Item>
        <AntMenu.Item key="2">
          <ContainerOutlined />
          <span className="nav-text">Issues</span>
        </AntMenu.Item>
      </AntMenu>
    </>
  );
}

export default Menu;