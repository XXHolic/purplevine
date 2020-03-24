import React from 'react';
import { Menu as AntMenu } from 'antd';
import {
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import styles from './index.module.css';

function Menu() {
  return (
    <>
      <div className={styles.logo} />
      <AntMenu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <AntMenu.Item key="1">
          <UserOutlined />
          <span className="nav-text">nav 1</span>
        </AntMenu.Item>
        <AntMenu.Item key="2">
          <VideoCameraOutlined />
          <span className="nav-text">nav 2</span>
        </AntMenu.Item>
        <AntMenu.Item key="3">
          <UploadOutlined />
          <span className="nav-text">nav 3</span>
        </AntMenu.Item>
      </AntMenu>
    </>
  );
}

export default Menu;