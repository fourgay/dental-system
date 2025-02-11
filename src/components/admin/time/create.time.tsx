import { useState } from "react";
import { App, Divider, Form, Input, Modal } from "antd";
import type { FormProps } from "antd";
import { createTimeAPI } from "@/services/api";

interface IProps {
  openModalCreate: boolean;
  setOpenModalCreate: (v: boolean) => void;
  refreshTable: () => void;
}

type FieldType = {
  title: string;
  value: string;
};

export const CreateTime = (props: IProps) => {
  const { openModalCreate, setOpenModalCreate, refreshTable } = props;
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const { notification } = App.useApp();

  // https://ant.design/components/form#components-form-demo-control-hooks
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { title, value } = values;
    setIsSubmit(true);
    const res = await createTimeAPI(title, value);

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
        title="Cập nhập thời gian làm việc"
        open={openModalCreate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setOpenModalCreate(false);
          form.resetFields();
        }}
        okText={"Tạo"}
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
