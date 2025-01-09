import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  TeamOutlined,
  UserOutlined,
  SnippetsOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

export const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const location = useLocation();

  const items: MenuItem[] = [
    {
      label: <Link to="/admin">Trang chủ</Link>,
      key: "/admin",
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link to="/admin/user">Quản lý user</Link>,
      key: "/admin/user",
      icon: <UserOutlined />,
    },
    {
      label: <Link to="/admin/booking">Quản lý lịch đăng ký</Link>,
      key: "/admin/booking",
      icon: <SnippetsOutlined />,
    },
  ];

  useEffect(() => {
    const active: any =
      items.find((item) => location.pathname === (item!.key as any)) ??
      "/admin";
    setActiveMenu(active.key);
  }, [location]);

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value: any) => setCollapsed(value)}
        >
          <div style={{ height: 32, margin: 16, textAlign: "center" }}>
            Admin
          </div>
          <Menu
            // defaultSelectedKeys={[activeMenu]}
            selectedKeys={[activeMenu]}
            mode="inline"
            items={items}
            onClick={(e) => setActiveMenu(e.key)}
          />
        </Sider>
        <Layout>
          <Content style={{ padding: "15px" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
