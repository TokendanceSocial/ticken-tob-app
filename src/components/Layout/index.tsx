import { Layout } from 'antd';
import React from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';

const { Content } = Layout;

const TickenLayout: React.FC<{ children: any }> = ({ children }) => {
  return (
    <Layout>
      <Header />
      <Layout className='ticken-content'>
        <Sidebar />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default TickenLayout;
