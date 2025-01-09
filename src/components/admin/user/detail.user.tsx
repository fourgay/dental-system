import { ProForm, ProFormDatePicker } from "@ant-design/pro-components";
import { Avatar, Badge, DatePicker, Descriptions, Drawer } from "antd";
import dayjs from "dayjs";

interface IProps {
  openViewDetail: boolean;
  setOpenViewDetail: (v: boolean) => void;
  dataViewDetail: IUser | null;
  setDataViewDetail: (v: IUser | null) => void;
}

export const DetailUser = (props: IProps) => {
  const {
    openViewDetail,
    setOpenViewDetail,
    dataViewDetail,
    setDataViewDetail,
  } = props;

  const avatarURL = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
    dataViewDetail?.avatar
  }`;
  return (
    <>
      <Drawer
        title="Chức năng xem chi tiết"
        width={"50vw"}
        onClose={() => {
          setOpenViewDetail(false);
          setDataViewDetail(null);
        }}
        open={openViewDetail}
      >
        <Descriptions title="Thông tin user" bordered column={1}>
          <Descriptions.Item label="Số điện thoại">
            {dataViewDetail?.phone}
          </Descriptions.Item>

          <Descriptions.Item label="Tên hiển thị">
            {dataViewDetail?.fullname}
          </Descriptions.Item>

          <Descriptions.Item label="Ngày sinh">
            <DatePicker
              defaultValue={dayjs("02-01-2005", "DD-MM-YYYY")}
              format={"DD-MM-YYYY"}
              disabled
            />
          </Descriptions.Item>

          <Descriptions.Item label="Đặt lịch">
            {dataViewDetail?.isBooking}
          </Descriptions.Item>

          <Descriptions.Item label="Địa chỉ">
            {dataViewDetail?.address}
          </Descriptions.Item>

          <Descriptions.Item label="Role">
            <Badge status="processing" text={dataViewDetail?.role} />
          </Descriptions.Item>

          <Descriptions.Item label="Avatar">
            <Avatar size={40} src={avatarURL}></Avatar>
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};
