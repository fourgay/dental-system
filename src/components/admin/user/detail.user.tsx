import { CheckSquareFilled, CloseSquareFilled } from "@ant-design/icons";
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

  const urlAvatar = import.meta.env.VITE_URL_AVATAR + dataViewDetail?.avatar;

  return (
    <>
      <Drawer
        title="Chức năng xem chi tiết"
        width={"50vw"}
        onClose={() => {
          setOpenViewDetail(false);
          setDataViewDetail(null);
        }}
        destroyOnClose={true}
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
              defaultValue={dayjs(dataViewDetail?.birthDay, "DD-MM-YYYY")}
              format={"DD-MM-YYYY"}
              disabled
            />
          </Descriptions.Item>

          <Descriptions.Item label="Đặt lịch">
            {dataViewDetail?.isBooking ? (
              <CheckSquareFilled style={{ color: "green", fontSize: 30 }} />
            ) : (
              <CloseSquareFilled style={{ color: "red", fontSize: 30 }} />
            )}
          </Descriptions.Item>

          <Descriptions.Item label="Địa chỉ">
            {dataViewDetail?.address}
          </Descriptions.Item>

          <Descriptions.Item label="Role">
            <Badge status="processing" text={dataViewDetail?.role} />
          </Descriptions.Item>

          <Descriptions.Item label="Avatar">
            <Avatar size={40} src={urlAvatar}></Avatar>
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};
