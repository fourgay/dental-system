import { createUserAPI } from "@/services/api";
import {
  App,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Space,
} from "antd";
import type { FormProps } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

interface IProps {
  openModalCreate: boolean;
  setOpenModalCreate: (v: boolean) => void;
  refreshTable: () => void;
}

type FieldType = {
  phone: string;
  fullname: string;
  password: string;
  birthDay: string;
  address: string;
  role: string;
};

export const CreateUser = (props: IProps) => {
  const { openModalCreate, setOpenModalCreate, refreshTable } = props;
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const { notification } = App.useApp();

  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { phone, fullname, password, birthDay, address, role } = values;

    setIsSubmit(true);
    const res = await createUserAPI(
      phone,
      fullname,
      password,
      dayjs(birthDay).format("DD-MM-YYYY"),
      address,
      role
    );
    console.log(res.data);

    if (res && res.data) {
      notification.success({
        message: res.message,
        placement: "bottomLeft",
      });
      form.resetFields();
      setOpenModalCreate(false);
      refreshTable();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };
  return (
    <>
      <Modal
        title="Thêm mới người dùng"
        open={openModalCreate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setOpenModalCreate(false);
          form.resetFields();
        }}
        okText={"Tạo mới"}
        cancelText={"Hủy"}
        confirmLoading={isSubmit}
      >
        <Divider />

        <Form
          form={form}
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Tên hiển thị"
            name="fullname"
            rules={[{ required: true, message: "Vui lòng nhập tên hiển thị!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Password"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Space.Compact>
              <Form.Item<FieldType>
                labelCol={{ span: 24 }}
                label="Ngày sinh"
                name="birthDay"
                rules={[
                  { required: true, message: "Vui lòng nhập ngày sinh!" },
                ]}
              >
                <DatePicker format={"DD-MM-YYYY"} />
              </Form.Item>
              <Form.Item<FieldType>
                labelCol={{ span: 24 }}
                label="Phân quyền"
                name="role"
                rules={[{ required: true, message: "Vui lòng chọn!" }]}
              >
                <Select
                  style={{ width: 120 }}
                  placeholder="Chọn"
                  options={[
                    { value: "USER", label: <span>USER</span> },
                    { value: "DOCTOR", label: <span>DOCTOR</span> },
                    { value: "ADMIN", label: <span>ADMIN</span> },
                  ]}
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Địa chỉ"
            name="address"
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
