import { Outlet } from "react-router-dom";
import { AppHeader } from "components/layout/app.header";
import { App, FloatButton } from "antd";
import {
  AppstoreOutlined,
  BellOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { deleteUserBookingAPI, getUserBookingAPI } from "./services/api";

function Layout() {
  const [userBooking, setUserBooking] = useState<IBooking | null>(null);
  const { notification } = App.useApp();
  const deteleBooking = async () => {
    const res = await deleteUserBookingAPI();

    if (res.message) {
      notification.success({
        message: "Xoá thành công",
        description: res.message,
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
  };
  useEffect(() => {
    const getUserBooking = async () => {
      const res = await getUserBookingAPI();
      if (res?.data) {
        setUserBooking(res.data);
      }
    };
    getUserBooking();
  }, []);
  return (
    <div>
      <AppHeader />
      <Outlet />

      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ insetInlineEnd: 94 }}
        icon={<AppstoreOutlined />}
        {...(userBooking && { badge: { count: 1, color: "blue" } })}
      >
        {userBooking && (
          <>
            <FloatButton
              icon={<BellOutlined />}
              tooltip={
                <div>
                  Bạn đang có 1 lịch hẹn lúc {userBooking.time} vào ngày{" "}
                  {userBooking.date} với bác sĩ {userBooking.doctor}
                </div>
              }
            />
            <FloatButton
              onClick={() => {
                deteleBooking();
              }}
              icon={<DeleteOutlined />}
              tooltip={<div>Xoá lịch đăng ký hiện tại</div>}
            />
          </>
        )}
        <FloatButton.BackTop />
      </FloatButton.Group>
    </div>
  );
}

export default Layout;
