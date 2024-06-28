import {Outlet, useNavigate} from "react-router-dom";
import React, {Suspense, useState} from "react";
import {routes} from "@/router/routes.tsx";
import {Breadcrumb, Layout, Menu} from 'antd'


const MyLayout = () => {
  const [collapsed, setCollapsed] = useState(true)
  const navigate = useNavigate();
  const navs: any[] = []
  routes.flatMap(route => route.children).forEach((item, index) => {
    if (item) {
      navs.push({
        key: index + 1.,
        title: item.path,
        label: item.path,
        onClick: () => {
          navigate(`/${item.path}`);
        }
      })
    }
  })

  return <>
    <Layout className={'layout h-screen'}>
      <Layout.Sider width={'150px'} theme={'light'} collapsible collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}>
        <div>LOGO</div>
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={navs} onSelect={console.log}/>
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{padding: 0, background: '#fff'}}>Header</Layout.Header>
        <Layout.Content style={{margin: '0 16px'}}>
          <Breadcrumb style={{margin: '16px 0'}}>
            Breadcrumb
          </Breadcrumb>

          <Suspense fallback={<div>Loading...</div>}>
            <Outlet/>
          </Suspense>

        </Layout.Content>
        <Layout.Footer style={{textAlign: 'center'}}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Layout.Footer>
      </Layout>
    </Layout>
  </>
}

export default MyLayout
