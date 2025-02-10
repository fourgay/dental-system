import { AntDesignOutlined, UploadOutlined } from "@ant-design/icons";
import {
  App,
  Avatar,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { userCurrentApp } from "components/context/app.context";
import dayjs from "dayjs";

type FieldType = {
  fullname: string;
  phone: string;
  role: string;
  birthDay: string;
  address: string;
  isBooking: boolean;
  avatar: string;
};

const UserInfo = () => {
  const [form] = Form.useForm();
  const { user, setUser } = userCurrentApp();

  const [isSubmit, setIsSubmit] = useState(false);
  const urlAvatar = import.meta.env.VITE_URL_AVATAR + user?.avatar;

  useEffect(() => {
    console.log(user);
    if (user) {
      form.setFieldsValue({
        phone: user.phone,
        fullname: user.fullname,
        role: user.role,
        address: user.address,
        isBooking: user.isBooking,
        avatar: user.avatar,
      });
    }
  }, [user]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    // const { fullName, phone, _id } = values;
    // setIsSubmit(true);
    // const res = await updateUserInfoAPI(_id, userAvatar, fullName, phone);
    // if (res && res.data) {
    //   //update react context
    //   setUser({
    //     ...user!,
    //     avatar: userAvatar,
    //     fullName,
    //     phone,
    //   });
    //   message.success("Cập nhật thông tin user thành công");
    //   //force renew token
    //   localStorage.removeItem("access_token");
    // } else {
    //   notification.error({
    //     message: "Đã có lỗi xảy ra",
    //     description: res.message,
    //   });
    // }
    // setIsSubmit(false);
  };

  return (
    <div style={{ minHeight: 400 }}>
      <Row>
        <Col sm={24} md={12}>
          <Row justify="center" align="middle">
            <Col>
              <Avatar
                size={{ xs: 32, sm: 64, md: 80, lg: 128, xl: 160, xxl: 200 }}
                icon={<AntDesignOutlined />}
                src={urlAvatar}
                shape="circle"
              />
            </Col>
          </Row>
        </Col>
        <Col sm={24} md={12}>
          <Form
            onFinish={onFinish}
            form={form}
            name="user-info"
            autoComplete="off"
          >
            <Form.Item<FieldType>
              hidden
              labelCol={{ span: 24 }}
              label="SĐT"
              name="phone"
            >
              <Input disabled />
            </Form.Item>

            <Form.Item<FieldType>
              labelCol={{ span: 24 }}
              label="Họ và tên"
              name="fullname"
              rules={[{ required: true, message: "Không được để trống!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              labelCol={{ span: 24 }}
              label="Ngày sinh"
              name="birthDay"
            >
              <DatePicker
                defaultValue={dayjs(user?.birthDay, "DD-MM-YYYY")}
                format={"DD-MM-YYYY"}
              />
            </Form.Item>
            <Form.Item<FieldType>
              labelCol={{ span: 24 }}
              label="Địa chỉ"
              name="address"
            >
              <Input.TextArea />
            </Form.Item>
            <Button loading={isSubmit} onClick={() => form.submit()}>
              Cập nhật
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default UserInfo;
