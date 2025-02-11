import { useEffect, useState } from "react";
import { App, Divider, Form, Input, Modal } from "antd";
import type { FormProps } from "antd";
import { updateTimeAPI } from "@/services/api";

interface IProps {
  openModalUpdate: boolean;
  setOpenModalUpdate: (v: boolean) => void;
  refreshTable: () => void;
  setDataUpdate: (v: ITime | null) => void;
  dataUpdate: ITime | null;
}

type FieldType = {
  title: string;
  value: string;
};

export const UpdateTime = (props: IProps) => {
  const {
    openModalUpdate,
    setOpenModalUpdate,
    refreshTable,
    setDataUpdate,
    dataUpdate,
  } = props;
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const { notification } = App.useApp();

  // https://ant.design/components/form#components-form-demo-control-hooks
  const [form] = Form.useForm();

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        title: dataUpdate.title,
        value: dataUpdate.value,
      });
    }
  }, [dataUpdate]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { title, value } = values;
    setIsSubmit(true);
    const res = await updateTimeAPI(dataUpdate?.id, title, value);
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
        title="Cập nhập thời gian làm việc"
        open={openModalUpdate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setOpenModalUpdate(false);
          setDataUpdate(null);
          form.resetFields();
        }}
        okText={"Cập nhập"}
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
            label="Tên"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Giá trị"
            name="value"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
