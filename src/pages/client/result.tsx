import { Button, Result, Spin } from "antd";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      navigate("/"); // Chuyển hướng về trang chủ nếu không có state
    }
  }, [location, navigate]);

  if (!location.state) {
    return <Spin tip="Đang tải..." />;
  }

  return location.state.status === 1 ? (
    <Result
      status="success"
      title="Đặt lịch thành công !!!"
      subTitle="Lịch của bạn đã được đặt. Chúng tôi sẽ liên hệ bạn sớm nhất có thể! Cảm ơn đã tin dùng dịch vụ của ThreeGay."
      extra={[
        <Button type="primary" onClick={() => navigate("/")}>
          Về trang chủ
        </Button>,
      ]}
    />
  ) : (
    <Result
      status="error"
      title="Lỗi !!!"
      subTitle={location.state.message}
      extra={[
        <Button type="primary" onClick={() => navigate("/booking")}>
          Đăng ký lại
        </Button>,
      ]}
    />
  );
};
