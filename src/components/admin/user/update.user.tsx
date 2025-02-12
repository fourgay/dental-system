import { useEffect, useState } from "react";
import { App, DatePicker, Divider, Form, Input, Modal, Select } from "antd";
import type { FormProps } from "antd";
import { updateUserAPI } from "@/services/api";
import dayjs from "dayjs";

interface IProps {
  openModalUpdate: boolean;
  setOpenModalUpdate: (v: boolean) => void;
  refreshTable: () => void;
  setDataUpdate: (v: IUser | null) => void;
  dataUpdate: IUser | null;
}

type FieldType = {
  phone: string;
  fullname: string;
  birthDay: string;
  address: string;
  role: string;
};

export const UpdateUser = (props: IProps) => {
  const {
    openModalUpdate,
    setOpenModalUpdate,
    refreshTable,
    setDataUpdate,
    dataUpdate,
  } = props;
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const { message, notification } = App.useApp();

  // https://ant.design/components/form#components-form-demo-control-hooks
  const [form] = Form.useForm();

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        phone: dataUpdate.phone,
        fullname: dataUpdate.fullname,
        birthDay: dataUpdate.birthDay
          ? dayjs(dataUpdate.birthDay, "DD-MM-YYYY")
          : undefined,
        address: dataUpdate.address,
        role: dataUpdate.role,
      });
    }
  }, [dataUpdate]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { phone, fullname, birthDay, address, role } = values;

    setIsSubmit(true);
    const res = await updateUserAPI(
      phone,
      fullname,
      dayjs(birthDay).format("DD-MM-YYYY"),
      address,
      role
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
        title="Cập nhật người dùng"
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
            hidden
            labelCol={{ span: 24 }}
            label="phone"
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập _id!" }]}
          >
            <Input disabled />
          </Form.Item>

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
            label="Ngày sinh"
            name="birthDay"
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
