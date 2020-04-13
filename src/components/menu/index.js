import React from 'react';
import { Link } from 'react-router-dom';
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
          <Link to="/project">
            <ProjectOutlined />Projects
          </Link>
        </AntMenu.Item>
        <AntMenu.Item key="2">
          <Link to="/">
            <ContainerOutlined />Issues
          </Link>
        </AntMenu.Item>
      </AntMenu>
    </>
  );
}

export default Menu;