import { useEffect, useState } from "react";
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
import {
  getListServicesAPI,
  getUsersAPI,
  updateBookingAPI,
  updateUserAPI,
} from "@/services/api";
import dayjs from "dayjs";

interface IProps {
  openModalUpdate: boolean;
  setOpenModalUpdate: (v: boolean) => void;
  refreshTable: () => void;
  setDataUpdate: (v: IBooking | null) => void;
  dataUpdate: IBooking | null;
}

type FieldType = {
  fullname: string;
  date: string;
  time: string;
  service: string;
  doctor: string;
  remark: string;
  account: string;
  forAnother: boolean;
};

export const UpdateBooking = (props: IProps) => {
  const {
    openModalUpdate,
    setOpenModalUpdate,
    refreshTable,
    setDataUpdate,
    dataUpdate,
  } = props;
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [listServices, setListServices] = useState<IServices[]>([]);
  const [listDoctors, setListDoctors] = useState<IUser[]>([]);
  const { notification } = App.useApp();

  // https://ant.design/components/form#components-form-demo-control-hooks
  const [form] = Form.useForm();

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        account: dataUpdate.account,
        fullname: dataUpdate.fullname,
        date: dataUpdate.date
          ? dayjs(dataUpdate.date, "DD-MM-YYYY")
          : undefined,
        time: dataUpdate.time.substring(0, 5),
        service: dataUpdate.service,
        doctor: dataUpdate.doctor,
        remark: dataUpdate.remark,
        forAnother: dataUpdate.forAnother,
      });
    }
  }, [dataUpdate]);

  useEffect(() => {
    const getServices = async () => {
      const res = await getListServicesAPI();
      if (res?.data) {
        setListServices(res.data.result);
      }
    };
    getServices();
  }, []);

  // useEffect(() => {
  //   const getDoctors = async () => {
  //     const res = await getUsersAPI("page=1&role=DOCTOR");
  //     if (res?.data) {
  //       setListDoctors(res.data?.result);
  //     }
  //   };
  //   getDoctors();
  // }, []);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { fullname, date, time, service, doctor, remark } = values;
    const fdate = dayjs(date).format("DD-MM-YYYY");
    console.log({ fullname, fdate, time, service, doctor, remark });

    setIsSubmit(true);
    const res = await updateBookingAPI(
      fullname,
      dayjs(date).format("DD-MM-YYYY"),
      time,
      dataUpdate?.forAnother,
      remark,
      service,
      dataUpdate?.account,
      doctor,
      "Đang chờ"
    );
    if (res && res.data) {
      notification.success({
        message: "Cập nhập thành công",
        description: res.message,
      });
      form.resetFields();
      setOpenModalUpdate(false);
      setDataUpdate(null);
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
        title="Cập nhật lịch khám"
        open={openModalUpdate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setOpenModalUpdate(false);
          setDataUpdate(null);
          form.resetFields();
        }}
        okText={"Cập nhật"}
        cancelText={"Hủy"}
        confirmLoading={isSubmit}
        destroyOnClose={true}
      >
        <Divider />

        <Form
          form={form}
          name="form-update"
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

          <Form.Item>
            <Space.Compact>
              <Form.Item<FieldType>
                labelCol={{ span: 24 }}
                label="Ngày khám"
                name="date"
                rules={[{ required: true, message: "Vui lòng chọn!" }]}
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
                  // options={[
                  //   { value: "08:00", label: "8:00 AM" },
                  //   { value: "09:00", label: "9:00 AM" },
                  //   { value: "10:00", label: "10:00 AM" },
                  //   { value: "11:00", label: "11:00 AM" },
                  // ]}
                />
              </Form.Item>
              <Form.Item<FieldType>
                labelCol={{ span: 24 }}
                label="Bác sĩ"
                name="doctor"
                rules={[{ required: true, message: "Vui lòng chọn!" }]}
              >
                <Input />
              </Form.Item>
            </Space.Compact>
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
