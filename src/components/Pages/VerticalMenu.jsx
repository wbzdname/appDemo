import React  from 'react';
import { Menu } from 'antd';
import { HomeOutlined, ExperimentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const VerticalMenu = () => {

  return (
    <Menu mode="vertical" style={{height: "100%"}}>
      <Menu.Item key="home" icon={<HomeOutlined />} >
        <Link to="/">首页</Link>
      </Menu.Item>
      <Menu.Item key="toBaidu" icon={<ExperimentOutlined />}>
        <Link to="/baidu">点我试试</Link>
      </Menu.Item>
    </Menu>
  );
};


export default VerticalMenu;