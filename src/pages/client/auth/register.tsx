import { useNavigate, Link } from "react-router-dom";
import register from "assets/register/register.png";
import "./register.scss";
import { Input, Form, Divider, Button, App } from "antd";
import type { FormProps } from "antd";
import { useState } from "react";
import { registerAPI } from "services/api";

type FieldType = {
  fullname: string;
  phone: string;
  password: string;
};

export const RegisterPage = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const { notification } = App.useApp();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsSubmit(true);
    const { fullname, phone, password } = values;

    const res = await registerAPI(fullname, phone, password);

    if (res.data) {
      notification.success({
        message: res.message,
        placement: "bottomLeft",
      });
      navigate("/login");
    } else {
      notification.error({
        message: res.message,
        placement: "bottomLeft",
      });
    }
    setIsSubmit(false);
  };

  return (
    <div className="register-page">
      <div className="register-page__img">
        <img src={register} />
      </div>
      <div className="register-page__content">
        <div className="title">Tạo tài khoản</div>
        <div className="detail pt-1 pb-5">
          Tham gia cùng chúng tôi ngay hôm nay để có những trải nghiệm tốt nhất!
        </div>

        <Form name="form-register" onFinish={onFinish} autoComplete="off">
          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Họ Và Tên"
            name="fullname"
            rules={[{ required: true, message: "Họ tên không được để trống" }]}
          >
            <Input size="large" />
          </Form.Item>

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
            rules={[{ required: true, message: "Mật không được để trống" }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item<FieldType>>
            <Button type="primary" htmlType="submit" loading={isSubmit}>
              Đăng ký
            </Button>
          </Form.Item>
          <Divider style={{ borderColor: "#7cb305" }}>Or</Divider>
          <p className="text text-normal" style={{ textAlign: "center" }}>
            Đã có tài khoản ?
            <span>
              <Link to="/login"> Đăng Nhập </Link>
            </span>
          </p>
        </Form>
      </div>
    </div>
  );
};
