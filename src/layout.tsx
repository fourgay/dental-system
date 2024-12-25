import { Outlet } from "react-router-dom";
import { AppHeader } from "components/layout/app.header";
import { Spin } from "antd";
import { userCurrentApp } from "components/context/app.context";

function Layout() {
  const { isAppLoading } = userCurrentApp();
  return (
    <div>
      <AppHeader />
      <Outlet />
      <Spin
        tip="Loading..."
        fullscreen
        spinning={isAppLoading}
        size="large"
      ></Spin>
    </div>
  );
}

export default Layout;
