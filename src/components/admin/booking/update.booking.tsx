import { useEffect, useState } from "react";
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
import { updateBookingAPI } from "@/services/api";
import dayjs from "dayjs";

interface IProps {
  openModalUpdate: boolean;
  setOpenModalUpdate: (v: boolean) => void;
  refreshTable: () => void;
  setDataUpdate: (v: IBooking | null) => void;
  dataUpdate: IBooking | null;
  listServices: IServices[];
  listDoctors: IDoctor[];
  listTime: ITime[];
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
  status: string;
};

export const UpdateBooking = (props: IProps) => {
  const {
    openModalUpdate,
    setOpenModalUpdate,
    refreshTable,
    setDataUpdate,
    dataUpdate,
    listServices,
    listDoctors,
    listTime,
  } = props;
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
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
        status: dataUpdate.status,
      });
    }
  }, [dataUpdate]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { fullname, date, time, service, doctor, remark, status } = values;
    let dataDoctor;

    try {
      dataDoctor = JSON.parse(doctor);
    } catch (error) {
      dataDoctor = {
        fullname: dataUpdate?.doctor,
        phone: dataUpdate?.Doctor_phone,
      };
    }

    setIsSubmit(true);
    const res = await updateBookingAPI(
      fullname,
      dayjs(date).format("DD-MM-YYYY"),
      time,
      dataUpdate?.forAnother,
      remark,
      service,
      dataUpdate?.account,
      dataDoctor.fullname,
      dataDoctor.phone,
      status
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
              style={{ width: 200 }}
              placeholder="Chọn"
              options={[
                { value: "Chờ xác nhận", label: "Chờ xác nhận" },
                { value: "Đã xác nhận", label: "Đã xác nhận" },
              ]}
            />
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
