import { AntDesignOutlined } from "@ant-design/icons";
import {
  App,
  Avatar,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { userCurrentApp } from "components/context/app.context";
import dayjs from "dayjs";
import { getUserAvatarAPI, updateAPI } from "@/services/api";

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

  const [listAvatar, setListAvatar] = useState<IAvatar[]>([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [avatarUser, setAvatarUser] = useState<string>(user?.avatar ?? "");
  const urlAvatar = import.meta.env.VITE_URL_AVATAR + avatarUser;
  const { notification } = App.useApp();

  useEffect(() => {
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

  useEffect(() => {
    const getAvatar = async () => {
      const res = await getUserAvatarAPI();
      if (res && res?.data) {
        setListAvatar(res?.data);
      }
    };
    getAvatar();
  }, []);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { fullname, birthDay, address } = values;

    setIsSubmit(true);
    const res = await updateAPI(
      fullname,
      user?.phone ?? "",
      dayjs(birthDay).format("DD-MM-YYYY"),
      address,
      avatarUser
    );
    if (res && res.data) {
      localStorage.removeItem("access_token");

      setUser(res.data.user);
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
      <Row>
        <Col sm={24} md={12}>
          <Row justify="center" align="middle">
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar
                size={{ xs: 32, sm: 64, md: 80, lg: 128, xl: 160, xxl: 200 }}
                icon={<AntDesignOutlined />}
                src={urlAvatar}
                shape="circle"
              />
              <Select
                style={{ width: 120 }}
                placeholder="Chọn"
                options={listAvatar?.map((item) => {
                  return { value: item.Link, label: item.name };
                })}
                onChange={(value) => {
                  setAvatarUser(value);
                }}
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
            <Button
              type="primary"
              loading={isSubmit}
              onClick={() => form.submit()}
            >
              Cập nhật
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default UserInfo;
