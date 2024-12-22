import { useNavigate, Link } from "react-router-dom";
import register from "../../../assets/register/register.png";
import "./register.scss";
import { Input, Form, Divider, Button } from "antd";
import { useState } from "react";

type FieldType = {
  fullName: string;
  phone: string;
  password: string;
};

export const RegisterPage = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
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

        <Form name="form-register" autoComplete="off">
          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Họ Và Tên"
            name="fullName"
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
