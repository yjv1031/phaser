import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useObserver } from 'mobx-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RouteArr, { RootChildren } from './routes';

import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import 'antd/dist/antd.min.css';
import { Link } from 'react-router-dom';
const { Header, Content, Sider } = Layout;

const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2 = RouteArr.map((row, idx) => {
  return {
    key: `first${idx}`,
    icon: React.createElement(row.icon),
    label: `${row.label}`,
    children: row.children.map((row2, j) => {
      return {
        key: `${idx}second${j}`,
        label: `${row2.label}`,
        path: `${row2.path}`,
      };
    }),
  };
});

const routeList: Array<RootChildren> = (new Array<RootChildren>).concat(...(RouteArr.map(item => item.children)));

const App = () => useObserver(() => (
  <BrowserRouter>
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            //onClick={(info: any) => {Link}}
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0
            }}
            //items={items2}
          >
            {
              items2.map((row) => {
                return(
                  <>
                    <Menu.SubMenu
                      key={row.key}
                      icon={row.icon}
                      title={row.label}
                    >
                    {
                      row.children.map((row2) => {
                        return (
                          <>
                            <Menu.Item key={row2.key}>
                              <Link to={row2.path}>{`${row2.label}`}</Link >
                            </Menu.Item>
                          </>
                        )
                      })
                    }  
                    </Menu.SubMenu>
                  </>
                )
              })
            }

          </Menu>
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Routes>
              {
                routeList.map(item => {
                  return (<Route path={item.path} element={item.element} key={item.path}/>);
                })
              }
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </BrowserRouter>
));

export default App;
