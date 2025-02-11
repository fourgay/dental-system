import { useNavigate, Link } from "react-router-dom";
import login from "assets/login/login.png";
import "./login.scss";
import { Input, Form, Divider, Button, App } from "antd";
import type { FormProps } from "antd";
import { useState } from "react";
import { userCurrentApp } from "@/components/context/app.context";
import { loginAPI } from "@/services/api";

type FieldType = {
  phone: string;
  password: string;
};

export const LoginPage = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const { notification } = App.useApp();
  const { setIsAuthenticated, setIsAppLoading, setUser } = userCurrentApp();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsSubmit(true);
    setIsAppLoading(true);
    localStorage.removeItem("access_token");
    const { phone, password } = values;
    const res = await loginAPI(phone, password);

    if (res?.data) {
      setIsAuthenticated(true);
      setUser(res.data.user);
      localStorage.setItem("access_token", res.data.access_token);
      notification.success({
        message: res.message,
        placement: "bottomLeft",
      });
      navigate("/");
    } else {
      notification.error({
        message: res.message,
        placement: "bottomLeft",
      });
    }

    setIsAppLoading(false);
    setIsSubmit(false);
  };
  return (
    <div className="login-page">
      <div className="login-page__img">
        <img src={login} />
      </div>
      <div className="login-page__content">
        <div className="title">Chào mừng trở lại</div>
        <div className="detail pt-1 pb-5">
          Well Well Well, xem ai quay lại kìa
        </div>

        <Form name="login-register" onFinish={onFinish} autoComplete="off">
          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: "Số điện thoại không được để trống",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Mật Khẩu"
            name="password"
            rules={[
              { required: true, message: "Password không được để trống" },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item<FieldType>>
            <Button type="primary" htmlType="submit" loading={isSubmit}>
              Đăng nhập
            </Button>
          </Form.Item>
          <Divider style={{ borderColor: "#7cb305" }}>Or</Divider>
          <p className="text text-normal" style={{ textAlign: "center" }}>
            Chưa có tài khoản ?
            <span>
              <Link to="/register"> Đăng ký </Link>
            </span>
          </p>
        </Form>
      </div>
    </div>
  );
};
