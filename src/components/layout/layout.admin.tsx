import { Button, Dropdown, Layout, Menu, Space } from "antd";
import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  TeamOutlined,
  UserOutlined,
  SnippetsOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { userCurrentApp } from "../context/app.context";
const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

export const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const location = useLocation();

  const { user } = userCurrentApp();

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

  const itemsDropdown = [
    {
      label: (
        <label
          style={{ cursor: "pointer" }}
          onClick={() => alert("chưa phát triển")}
        >
          Quản lý tài khoản
        </label>
      ),
      key: "account",
    },
    {
      label: <Link to={"/"}>Trang chủ</Link>,
      key: "home",
    },
    {
      label: <label style={{ cursor: "pointer" }}>Đăng xuất</label>,
      key: "logout",
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
          <div
            className="admin-header"
            style={{
              height: "50px",
              borderBottom: "1px solid #ebebeb",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 15px",
            }}
          >
            <span>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: () => setCollapsed(!collapsed),
                }
              )}
            </span>
            <Dropdown menu={{ items: itemsDropdown }} trigger={["click"]}>
              <Space style={{ cursor: "pointer" }}>
                {/* <Avatar src={urlAvatar} />
                {user?.fullName} */}
                <Button type="primary" size="large">
                  {user?.fullname}
                </Button>
              </Space>
            </Dropdown>
          </div>
          <Content style={{ padding: "15px" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
