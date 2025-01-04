import {
  CheckCard,
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from "@ant-design/pro-components";
import { Button, Input, message, Result } from "antd";
import { useEffect, useState } from "react";
import "styles/booking.scss";
import { getListServicesAPI } from "@/services/api";
import { userCurrentApp } from "@/components/context/app.context";
import { useNavigate } from "react-router-dom";

export const Booking = () => {
  const [loading, setLoading] = useState(false);
  const [listServices, setListServices] = useState<IServices[]>([]);
  const [OTP, setOTP] = useState<number>();

  const [chooseService, setChooseService] = useState<IServices>();

  const { user } = userCurrentApp();
  const navigate = useNavigate();
  useEffect(() => {
    const getServices = async () => {
      const res = await getListServicesAPI();
      if (res?.data) {
        setListServices(res.data);
      }
    };
    getServices();
  }, []);

  return (
    <ProCard>
      <StepsForm
        onFinish={async (values) => {
          const { fullname, date, dateTime, checkbox, remark } = values;
          const item = {
            fullname: fullname,
            date: date,
            time: dateTime,
            forAnother: !!checkbox,
            remark: remark,
            service: chooseService,
          };
          console.log(item);
        }}
        submitter={{
          render: ({ form, onSubmit, step, onPre }) => {
            return [
              step > 0 && step < 3 && (
                <Button
                  key="pre"
                  onClick={() => {
                    onPre?.();
                  }}
                >
                  Quay lại
                </Button>
              ),
              step < 3 && (
                <Button
                  key="next"
                  loading={loading}
                  type="primary"
                  onClick={() => {
                    onSubmit?.();
                  }}
                >
                  Tiếp tục
                </Button>
              ),
              step == 3 && (
                <Button
                  key="next"
                  loading={loading}
                  type="primary"
                  onClick={() => {
                    onSubmit?.();
                  }}
                >
                  Xác nhận
                </Button>
              ),
            ];
          },
        }}
        formProps={{
          validateMessages: {
            required: "Không được bỏ trống",
          },
        }}
      >
        <StepsForm.StepForm
          name="base"
          title="Chọn dịch vụ"
          onFinish={async () => {
            setLoading(true);
            setLoading(false);
            return true;
          }}
        >
          <ProForm.Item
            name="service"
            rules={[{ required: true, message: "Vui lòng chọn một dịch vụ!" }]}
          >
            <CheckCard.Group
              onChange={(value: any) => {
                setChooseService(value);
              }}
              className="choose-services"
            >
              {listServices.map((item, index) => (
                <CheckCard
                  key={index}
                  avatar={item.img}
                  title={item.title}
                  description={item.detail}
                  value={item}
                  style={{ margin: "unset" }}
                  size="large"
                />
              ))}
            </CheckCard.Group>
          </ProForm.Item>
        </StepsForm.StepForm>
        <StepsForm.StepForm title="Điền thông tin">
          <ProFormText
            name="fullname"
            label="Họ và tên"
            width="lg"
            tooltip="Vui lòng điền họ và tên đầy đủ"
            rules={[{ required: true }]}
            placeholder=""
            initialValue={user?.fullname}
          />

          <ProForm.Group>
            <ProFormDatePicker
              fieldProps={{
                format: "DD-MM",
              }}
              width="sm"
              name="date"
              label="Ngày / Tháng"
              placeholder="Chọn"
              rules={[{ required: true }]}
            />
            <ProFormSelect
              name="dateTime"
              label="Thời gian"
              options={[
                { value: "8", label: "8:00 AM" },
                { value: "9", label: "9:00 AM" },
                { value: "10", label: "10:00 AM" },
                { value: "11", label: "11:00 AM" },
              ]}
              width="sm"
              placeholder="Chọn"
              rules={[{ required: true }]}
              //   onChange={(value) => {
              //     alert(value);
              //   }}
            />
          </ProForm.Group>
          <div style={{ marginBottom: "8px" }}>Dịch vụ</div>
          <CheckCard
            avatar={chooseService?.img}
            title={chooseService?.title}
            description={chooseService?.detail}
            value={chooseService}
            size="large"
            defaultChecked
          />

          <ProFormTextArea
            name="remark"
            label="Ghi chú"
            width="lg"
            placeholder="Điền nhưng lưu ý cần đưa đến bác sĩ"
          />
          <ProFormCheckbox.Group
            name="checkbox"
            options={[
              { label: "Đăng ký cho người thân", value: "for-another" },
            ]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="time" title="Xác nhận">
          <ProForm.Item label="Xin vui lòng điền mã OTP đã gửi về điện thoại của bạn">
            <Input.OTP
              variant="filled"
              length={6}
              formatter={(str) => str.toUpperCase()}
              size="large"
              onChange={(value: any) => {
                setOTP(value);
              }}
            />
          </ProForm.Item>
        </StepsForm.StepForm>
        <StepsForm.StepForm title="Trạng thái">
          {OTP == 111111 ? (
            <Result
              status="success"
              title="Đặt lịch thành công !!!"
              subTitle="Lịch của bạn đã được đặt. Chúng tôi sẽ liên hệ bạn sớm nhất có thể ! Cảm ơn đã tin dùng dịch vụ của ThreeGay"
              extra={[
                <Button type="primary" onClick={() => navigate("/")}>
                  Về trang chủ
                </Button>,
              ]}
            />
          ) : (
            <Result
              status="error"
              title="Lỗi !!!"
              subTitle="Mã OTP của bạn không chính xác, xin hãy quay lại"
              extra={[
                <Button type="primary" onClick={() => navigate("/")}>
                  Về trang chủ
                </Button>,
              ]}
            />
          )}
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
};
