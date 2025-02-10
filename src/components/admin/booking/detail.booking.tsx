import { CheckSquareFilled, CloseSquareFilled } from "@ant-design/icons";
import { Avatar, Badge, DatePicker, Descriptions, Drawer, Tag } from "antd";
import dayjs from "dayjs";

interface IProps {
  openViewDetail: boolean;
  setOpenViewDetail: (v: boolean) => void;
  dataViewDetail: IBooking | null;
  setDataViewDetail: (v: IBooking | null) => void;
}

export const DetailBooking = (props: IProps) => {
  const {
    openViewDetail,
    setOpenViewDetail,
    dataViewDetail,
    setDataViewDetail,
  } = props;

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
        destroyOnClose={true}
      >
        <Descriptions title="Thông tin lịch khám" bordered column={1}>
          <Descriptions.Item label="Tài khoản">
            {dataViewDetail?.account}
          </Descriptions.Item>

          <Descriptions.Item label="Họ và tên đăng ký">
            {dataViewDetail?.fullname}
          </Descriptions.Item>

          <Descriptions.Item label="Ngày khám">
            <DatePicker
              defaultValue={dayjs(dataViewDetail?.date, "DD-MM-YYYY")}
              format={"DD-MM-YYYY"}
              disabled
            />
          </Descriptions.Item>

          <Descriptions.Item label="Thời gian">
            {dataViewDetail?.time}
          </Descriptions.Item>

          <Descriptions.Item label="Dịch vụ">
            {dataViewDetail?.service}
          </Descriptions.Item>

          <Descriptions.Item label="Bác sĩ">
            {dataViewDetail?.doctor}
          </Descriptions.Item>

          <Descriptions.Item label="Cho người thân">
            {dataViewDetail?.forAnother ? (
              <CheckSquareFilled style={{ color: "green", fontSize: 30 }} />
            ) : (
              <CloseSquareFilled style={{ color: "red", fontSize: 30 }} />
            )}
          </Descriptions.Item>

          <Descriptions.Item label="Trạng thái">
            <Tag color="gold">{dataViewDetail?.status}</Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Ghi chú">
            {dataViewDetail?.remark}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};
