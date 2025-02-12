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
import { App, Button, Result, Spin } from "antd";
import { useEffect, useState } from "react";
import "styles/booking.scss";
import {
  createBookingAPI,
  getListServicesAPI,
  getRandomDoctorAPI,
  getUserTimeAPI,
} from "@/services/api";
import { userCurrentApp } from "@/components/context/app.context";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export const Booking = () => {
  const { notification } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [servicesLoading, setServicesLoading] = useState<boolean>(false);
  const [listServices, setListServices] = useState<IServices[]>([]);
  const [listDoctors, setListDoctors] = useState<IDoctor[]>([]);
  const [listTime, setListTime] = useState<ITime[]>([]);

  const [chooseService, setChooseService] = useState<IServices>();

  const { user } = userCurrentApp();
  const navigate = useNavigate();

  useEffect(() => {
    const getServices = async () => {
      setServicesLoading(true);
      const res = await getListServicesAPI();
      if (res?.data) {
        setListServices(res.data.result);
      }
      setServicesLoading(false);
    };
    getServices();
  }, []);

  useEffect(() => {
    const getTime = async () => {
      const res = await getUserTimeAPI();
      if (res && res?.data) {
        setListTime(res?.data);
      }
    };
    getTime();
  }, []);

  return (
    <Spin spinning={servicesLoading}>
      <ProCard>
        <StepsForm
          onFinish={async (values) => {
            const { fullname, date, dateTime, checkbox, remark } = values;

            const resDoctor = await getRandomDoctorAPI(
              chooseService?.title ?? "Tư vấn"
            );
            if (resDoctor && resDoctor?.data) {
              setListDoctors(resDoctor?.data);
            }

            const randomDoctor: IDoctor =
              listDoctors[Math.floor(Math.random() * listDoctors.length)];
            setServicesLoading(true);
            const res = await createBookingAPI(
              fullname,
              date,
              dateTime,
              !!checkbox,
              remark,
              chooseService?.title,
              user?.phone,
              randomDoctor.fullname,
              randomDoctor.phone
            );
            setServicesLoading(false);
            if (res && res.data) {
              navigate("/ketqua", {
                state: { status: 1, message: res.message },
              });
            } else {
              navigate("/ketqua", {
                state: { status: 0, message: res.error },
              });
            }
          }}
          submitter={{
            render: ({ form, onSubmit, step, onPre }) => {
              return [
                step > 0 && step < 4 && (
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
              rules={[
                { required: true, message: "Vui lòng chọn một dịch vụ!" },
              ]}
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
                  format: "DD-MM-YYYY",
                }}
                width="sm"
                name="date"
                label="ngày / tháng khám"
                placeholder="Chọn"
                rules={[{ required: true }]}
              />
              <ProFormSelect
                name="dateTime"
                label="Thời gian"
                options={listTime?.map((item) => {
                  return { value: item.value, label: item.title };
                })}
                width="sm"
                placeholder="Chọn"
                rules={[{ required: true }]}
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
          <StepsForm.StepForm title="Xác nhận thông tin">
            <Result
              status="info"
              title="Xác nhận"
              subTitle={
                <>
                  <div>
                    Bạn xác nhận đăng ký lịch khám với dịch vụ{" "}
                    <strong>{chooseService?.title}</strong> ?
                  </div>
                  <div>
                    Để kiểm tra hoặc thay đổi thông tin, vui lòng nhấn nút{" "}
                    <strong>Quay lại</strong>
                  </div>
                </>
              }
            />
          </StepsForm.StepForm>
        </StepsForm>
      </ProCard>
    </Spin>
  );
};
