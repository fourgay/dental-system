import { userCurrentApp } from "@/components/context/app.context";
import { createBookingAPI } from "@/services/api";
import {
  App,
  Checkbox,
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
import { useLocation } from "react-router-dom";

interface IProps {
  openModalCreate: boolean;
  setOpenModalCreate: (v: boolean) => void;
  refreshTable: () => void;
  listServices: IServices[];
  listDoctors: IDoctor[];
  listTime: ITime[];
}

type FieldType = {
  account: string;
  fullname: string;
  date: string;
  time: string;
  forAnother: boolean;
  remark: string;
  service: string;
  doctor: string;
  status: string;
};

export const CreateBooking = (props: IProps) => {
  const {
    openModalCreate,
    setOpenModalCreate,
    refreshTable,
    listServices,
    listDoctors,
    listTime,
  } = props;
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const { notification } = App.useApp();

  const [form] = Form.useForm();
  const location = useLocation();
  const { user } = userCurrentApp();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const {
      account,
      fullname,
      date,
      time,
      forAnother,
      remark,
      service,
      doctor,
      status,
    } = values;

    let dataDoctor;
    if (location.pathname.startsWith("/admin")) {
      dataDoctor = JSON.parse(doctor);
    }

    console.log(
      fullname,
      dayjs(date).format("DD-MM-YYYY"),
      time,
      forAnother,
      remark,
      service,
      account,
      location.pathname.startsWith("/admin/")
        ? dataDoctor.fullname
        : user?.fullname,
      location.pathname.startsWith("/admin/") ? dataDoctor.phone : user?.phone,
      status
    );

    setIsSubmit(true);
    const res = await createBookingAPI(
      fullname,
      dayjs(date).format("DD-MM-YYYY"),
      time,
      forAnother,
      remark,
      service,
      account,
      location.pathname.startsWith("/admin/")
        ? dataDoctor.fullname
        : user?.fullname,
      location.pathname.startsWith("/admin/") ? dataDoctor.phone : user?.phone,
      status
    );

    if (res && res.data) {
      notification.success({
        message: res.message,
      });
      form.resetFields();
      setOpenModalCreate(false);
      refreshTable();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.error,
      });
    }

    setIsSubmit(false);
  };

  return (
    <>
      <Modal
        title="Thêm mới lịch khám"
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
          initialValues={{
            forAnother: false,
          }}
        >
          <Form.Item>
            <Space.Compact>
              <Form.Item<FieldType>
                labelCol={{ span: 24 }}
                label="Tài khoản"
                name="account"
                rules={[
                  { required: true, message: "Vui lòng nhập số tài khoản!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                labelCol={{ span: 24 }}
                label="Họ và tên"
                name="fullname"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập họ và tên người khám!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Space.Compact>
          </Form.Item>

          <Form.Item>
            <Space.Compact>
              <Form.Item<FieldType>
                labelCol={{ span: 24 }}
                label="Ngày khám"
                name="date"
                rules={[
                  { required: true, message: "Vui lòng nhập ngày khám!" },
                ]}
              >
                <DatePicker format={"DD-MM-YYYY"} />
              </Form.Item>
              <Form.Item<FieldType>
                labelCol={{ span: 24 }}
                label="Thời gian khám"
                name="time"
                rules={[{ required: true, message: "Vui lòng chọn!" }]}
              >
                <Select
                  style={{ width: 120 }}
                  placeholder="Chọn"
                  options={listTime?.map((item) => {
                    return { value: item.value, label: item.title };
                  })}
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>

          <Form.Item>
            <Space.Compact>
              <Form.Item<FieldType>
                labelCol={{ span: 24 }}
                label="Dịch vụ"
                name="service"
                rules={[{ required: true, message: "Vui lòng nhập!" }]}
              >
                <Select
                  style={{ width: 200 }}
                  placeholder="Chọn"
                  options={listServices?.map((item) => {
                    return { value: item.title, label: item.title };
                  })}
                />
              </Form.Item>
              {location.pathname.startsWith("/admin/") && (
                <Form.Item<FieldType>
                  labelCol={{ span: 24 }}
                  label="Bác sĩ"
                  name="doctor"
                  rules={[{ required: true, message: "Vui lòng chọn!" }]}
                >
                  <Select
                    style={{ width: 200 }}
                    placeholder="Chọn"
                    options={listDoctors?.map((item) => {
                      return {
                        value: JSON.stringify({
                          phone: item.phone,
                          fullname: item.fullname,
                        }),
                        label: item.fullname,
                      };
                    })}
                  />
                </Form.Item>
              )}
            </Space.Compact>
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Trạng thái"
            name="status"
            rules={[{ required: true, message: "Vui lòng chọn!" }]}
          >
            <Select
              style={{ width: 120 }}
              placeholder="Chọn"
              options={[
                { value: "Chờ xác nhận", label: "Chờ xác nhận" },
                { value: "Đã xác nhận", label: "Đã xác nhận" },
              ]}
            />
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            name="forAnother"
            valuePropName="checked"
          >
            <Checkbox>Đăng ký cho người thân</Checkbox>
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Ghi chú"
            name="remark"
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
