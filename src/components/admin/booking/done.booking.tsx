import { useState } from "react";
import { App, Divider, Form, Input, Modal } from "antd";
import type { FormProps } from "antd";
import { createResultAPI, deleteBookingAPI } from "@/services/api";

interface IProps {
  openModalDone: boolean;
  setOpenModalDone: (v: boolean) => void;
  refreshTable: () => void;
  setDataDone: (v: IBooking | null) => void;
  dataDone: IBooking | null;
}

type FieldType = {
  title: string;
  decriptions: string;
};

export const DoneBooking = (props: IProps) => {
  const {
    openModalDone,
    setOpenModalDone,
    refreshTable,
    setDataDone,
    dataDone,
  } = props;
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const { notification } = App.useApp();

  // https://ant.design/components/form#components-form-demo-control-hooks
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { title, decriptions } = values;
    setIsSubmit(true);
    const res = await createResultAPI(
      dataDone?.account,
      dataDone?.date,
      dataDone?.time,
      title,
      decriptions,
      dataDone?.service,
      dataDone?.fullname,
      dataDone?.doctor
    );
    if (res && res.data) {
      notification.success({
        message: "Hoàn tất",
        description: res.message,
      });
      form.resetFields();
      setOpenModalDone(false);
      setDataDone(null);
      await deleteBookingAPI(dataDone?.account);
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
        title="Kết quả"
        open={openModalDone}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setOpenModalDone(false);
          setDataDone(null);
          form.resetFields();
        }}
        okText={"Hoàn thành"}
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
            label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            labelCol={{ span: 24 }}
            label="Mô tả"
            name="decriptions"
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
