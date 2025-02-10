import {
  createBookingAPI,
  getAllDoctorAPI,
  getListServicesAPI,
} from "@/services/api";
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
import { useEffect, useState } from "react";

interface IProps {
  openModalCreate: boolean;
  setOpenModalCreate: (v: boolean) => void;
  refreshTable: () => void;
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
};

export const CreateBooking = (props: IProps) => {
  const { openModalCreate, setOpenModalCreate, refreshTable } = props;
  const [listServices, setListServices] = useState<IServices[]>([]);
  const [listDoctors, setListDoctors] = useState<IDoctor[]>([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const { notification } = App.useApp();

  const [form] = Form.useForm();

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
    } = values;

    setIsSubmit(true);
    const res = await createBookingAPI(
      fullname,
      dayjs(date).format("DD-MM-YYYY"),
      time,
      forAnother,
      remark,
      service,
      account,
      doctor
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

  useEffect(() => {
    const getServices = async () => {
      const res = await getListServicesAPI();
      if (res?.data) {
        setListServices(res.data.result);
      }
    };
    getServices();
  }, []);

  useEffect(() => {
    const getDoctors = async () => {
      const res = await getAllDoctorAPI();
      if (res && res?.data) {
        setListDoctors(res?.data);
      }
    };
    getDoctors();
  }, []);

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
                  options={[
                    { value: "08:00", label: "8:00 AM" },
                    { value: "09:00", label: "9:00 AM" },
                    { value: "10:00", label: "10:00 AM" },
                    { value: "11:00", label: "11:00 AM" },
                  ]}
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
                    return { value: item.fullname, label: item.fullname };
                  })}
                />
              </Form.Item>
            </Space.Compact>
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
