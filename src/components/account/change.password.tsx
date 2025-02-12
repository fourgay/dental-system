import { App, Button, Form, Input } from "antd";
import { useState } from "react";
import type { FormProps } from "antd";
import { changePasswordAPI } from "@/services/api";

type FieldType = {
  old_pass: string;
  new_pass: string;
};

const ChangePassword = () => {
  const [form] = Form.useForm();

  const [isSubmit, setIsSubmit] = useState(false);
  const { notification } = App.useApp();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { old_pass, new_pass } = values;

    setIsSubmit(true);
    const res = await changePasswordAPI(old_pass, new_pass);
    if (res && res.data) {
      localStorage.removeItem("access_token");
      localStorage.setItem("access_token", res.data.access_token);

      notification.success({
        message: res.message,
        placement: "topRight",
      });
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
        placement: "topRight",
      });
    }
    setIsSubmit(false);
  };

  return (
    <div style={{ minHeight: 400 }}>
      <Form
        form={form}
        name="form-update"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          labelCol={{ span: 24 }}
          label="Mật khẩu cũ"
          name="old_pass"
          rules={[{ required: true, message: "Vui lòng nhập!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          labelCol={{ span: 24 }}
          label="Mật khẩu mới"
          name="new_pass"
          rules={[{ required: true, message: "Vui lòng nhập!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" loading={isSubmit} onClick={() => form.submit()}>
          Cập nhật
        </Button>
      </Form>
    </div>
  );
};

export default ChangePassword;
