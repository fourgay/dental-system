import { Button, Dropdown, Layout, Menu, Space } from "antd";
import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  SnippetsOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { userCurrentApp } from "../context/app.context";
import ManageAccount from "../account";
const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

export const LayoutDoctor = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const [openManageAccount, setOpenManageAccount] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { user, setUser, setIsAuthenticated } = userCurrentApp();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("access_token");
  };

  const items: MenuItem[] = [
    {
      label: <Link to="/doctor">Trang chủ</Link>,
      key: "/doctor",
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link to="/doctor/booking">Quản lý lịch đăng ký</Link>,
      key: "/doctor/booking",
      icon: <SnippetsOutlined />,
    },
    {
      label: <Link to="/doctor/result">Quản lý kết quả</Link>,
      key: "/doctor/result",
      icon: <SnippetsOutlined />,
    },
  ];

  const itemsDropdown = [
    {
      label: (
        <label
          style={{ cursor: "pointer" }}
          onClick={() => {
            setOpenManageAccount(true);
          }}
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
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
          Đăng xuất
        </label>
      ),
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
            Doctor
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
      <ManageAccount
        isModalOpen={openManageAccount}
        setIsModalOpen={setOpenManageAccount}
      />
    </>
  );
};
