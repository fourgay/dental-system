import { CheckSquareFilled, CloseSquareFilled } from "@ant-design/icons";
import { Avatar, Badge, DatePicker, Descriptions, Drawer, Tag } from "antd";
import dayjs from "dayjs";

interface IProps {
  openViewDetail: boolean;
  setOpenViewDetail: (v: boolean) => void;
  dataViewDetail: IResult | null;
  setDataViewDetail: (v: IResult | null) => void;
}

export const DetailResult = (props: IProps) => {
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
        <Descriptions title="Thông tin kết quả khám" bordered column={1}>
          <Descriptions.Item label="Tài khoản">
            {dataViewDetail?.account}
          </Descriptions.Item>

          <Descriptions.Item label="Họ và tên">
            {dataViewDetail?.fullname}
          </Descriptions.Item>

          <Descriptions.Item label="Ngày khám">
            <DatePicker
              defaultValue={dayjs(dataViewDetail?.date, "DD-MM-YYYY")}
              format={"DD-MM-YYYY"}
              disabled
            />
          </Descriptions.Item>

          <Descriptions.Item label="Thời gian khám">
            {dataViewDetail?.time}
          </Descriptions.Item>

          <Descriptions.Item label="Dịch vụ">
            {dataViewDetail?.service}
          </Descriptions.Item>

          <Descriptions.Item label="Bác sĩ">
            {dataViewDetail?.doctor}
          </Descriptions.Item>

          <Descriptions.Item label="Kết quả">
            {dataViewDetail?.title}
          </Descriptions.Item>

          <Descriptions.Item label="Mô tả">
            {dataViewDetail?.decriptions}
          </Descriptions.Item>

          <Descriptions.Item label="Tạo lúc">
            {dayjs(dataViewDetail?.createdAt).format("DD-MM-YYYY")}
          </Descriptions.Item>

          <Descriptions.Item label="Cập nhập lúc">
            {dayjs(dataViewDetail?.updatedAt).format("DD-MM-YYYY")}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};
