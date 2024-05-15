import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { DashboardOutlined, ProductOutlined, UserOutlined, OrderedListOutlined, AppstoreAddOutlined, AppstoreOutlined } from '@ant-design/icons'

import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AiOutlineMenuFold } from "react-icons/ai";
import { Button, Layout, Menu, theme } from 'antd';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {  
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" > 
           <h2 className='fs-7 text-center py-3 mb-0'> 
                <span className='lg-logo'>Bucky <span className='text-white'>Tank</span> </span>
                <span className='sm-logo 50px'>B<span className='text-white'>T</span></span>
           </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
           onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}  
          items={[
            {
              key: '',
              icon: <DashboardOutlined />,
              label: 'dashboard'
            },
            {
              label: 'Products',
              icon: <ProductOutlined/>,
              children: [
                {
                  label: 'View all products',
                  icon: <AppstoreOutlined />,
                  key: 'products'
                },
                {
                  label: 'Add product',
                  icon: <AppstoreAddOutlined />,
                  key: 'add-product'
                },
              ]
            },
            {
              label: 'Users',
              icon: <UserOutlined/>,
              key: 'users'
            },
            {
              label: 'Orders',
              icon: <OrderedListOutlined/>,
              key: 'orders'
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          
          <div className='d-flex gap-3 align-items-center'>
            <div>
              
            </div>
            <div theme="light" className='d-flex gap-3 align-items-center'>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  fontSize: '30px',
                  width: 64,
                  height: 64,
                }}
              >
                  
                    <UserOutlined/>
                  
              </div>
              
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <Link
                    className="dropdown-item"
                    style={{height: "auto", lineHeight: "15px" }}
                    to="/"
                  >
                    Signout
                  </Link>
              </div>
            </div>
          </div> 
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;

