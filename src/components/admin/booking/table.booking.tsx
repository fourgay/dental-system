import { useRef, useState } from "react";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { App, Button, Dropdown, Popconfirm, Tag } from "antd";
import {
  CheckOutlined,
  DeleteTwoTone,
  EditTwoTone,
  EllipsisOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  deleteBookingAPI,
  getBookingAPI,
  getDoctorBookingAPI,
} from "@/services/api";
import { CreateBooking } from "./create.booking";
import { DetailBooking } from "./detail.booking";
import { UpdateBooking } from "./update.booking";
import { DoneBooking } from "./done.booking";
import { useLocation } from "react-router-dom";

type TSearch = {
  service: string;
  account: string;
  fullname: string;
  doctor: string;
};

export const TableBooking = () => {
  const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);
  const [dataViewDetail, setDataViewDetail] = useState<IBooking | null>(null);

  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);

  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<IBooking | null>(null);

  const [openModalDone, setOpenModalDone] = useState<boolean>(false);
  const [dataDone, setDataDone] = useState<IBooking | null>(null);

  const [isDeleteBooking, setIsDeleteBooking] = useState<boolean>(false);
  const { notification } = App.useApp();

  const location = useLocation();

  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0,
  });
  const actionRef = useRef<ActionType>();

  const handleDeleteBooking = async (phone: string) => {
    setIsDeleteBooking(true);
    const res = await deleteBookingAPI(phone);

    if (res.message) {
      notification.success({
        message: "Xoá lịch khám thành công",
        description: res.message,
      });
      refreshTable();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsDeleteBooking(false);
  };

  const columns: ProColumns<IBooking>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "Tài khoản",
      dataIndex: "account",
      copyable: true,
      align: "center",
      render(dom, entity, index, action, schema) {
        return (
          <a
            onClick={() => {
              setOpenViewDetail(true);
              setDataViewDetail(entity);
            }}
            href="#"
          >
            {entity.account}
          </a>
        );
      },
    },
    {
      title: "Họ tên",
      dataIndex: "fullname",
      align: "center",
    },
    {
      title: "Ngày khám",
      dataIndex: "date",
      hideInSearch: true,
      align: "center",
    },
    {
      title: "Dịch vụ",
      dataIndex: "service",
      align: "center",
    },
    ...(location.pathname.startsWith("/admin/")
      ? [
          {
            title: "Bác sĩ",
            dataIndex: "doctor",
            align: "center",
          } as ProColumns<IBooking>,
        ]
      : []),
    {
      title: "Trạng thái",
      dataIndex: "status",
      hideInSearch: true,
      align: "center",
      render: (_, record) => <Tag color="gold">{record.status}</Tag>,
    },
    {
      title: "Action",
      hideInSearch: true,
      align: "center",
      render(dom, entity, index, action, schema) {
        return (
          <>
            <EyeOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpenViewDetail(true);
                setDataViewDetail(entity);
              }}
            />
            <EditTwoTone
              twoToneColor="#f57800"
              style={{ cursor: "pointer", margin: "0 20px" }}
              onClick={() => {
                setDataUpdate(entity);
                setOpenModalUpdate(true);
              }}
            />
            <Popconfirm
              placement="leftTop"
              title={"Xác nhận đã hoàn thành lịch khám"}
              description={"Bạn có chắc chắn hoàn thành lịch khám này ?"}
              onConfirm={() => {
                setDataDone(entity);
                setOpenModalDone(true);
              }}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <span style={{ cursor: "pointer", marginRight: "20px" }}>
                <CheckOutlined
                  twoToneColor="#ff4d4f"
                  style={{ cursor: "pointer" }}
                />
              </span>
            </Popconfirm>
            <Popconfirm
              placement="leftTop"
              title={"Xác nhận xóa lịch khám"}
              description={"Bạn có chắc chắn muốn xóa lịch khám này ?"}
              onConfirm={() => handleDeleteBooking(entity.account)}
              okText="Xác nhận"
              cancelText="Hủy"
              okButtonProps={{ loading: isDeleteBooking }}
            >
              <span style={{ cursor: "pointer" }}>
                <DeleteTwoTone
                  twoToneColor="#ff4d4f"
                  style={{ cursor: "pointer" }}
                />
              </span>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const refreshTable = () => {
    actionRef.current?.reload();
  };

  return (
    <>
      <ProTable<IBooking, TSearch>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        search={{
          searchText: "Tìm kiếm",
          resetText: "Làm mới",
          collapseRender: (collapsed) =>
            collapsed ? "Mở rộng +" : "Thu gọn -",
        }}
        request={async (params, sort, filter) => {
          let query = "";
          if (params) {
            query += `page=${params?.current ?? 1}`;
            if (params.service) {
              query += `&service=${params.service}`;
            }
            if (params.account) {
              query += `&account=${params.account}`;
            }
            if (params.fullname) {
              query += `&fullname=${params.fullname}`;
            }
            if (params.doctor) {
              query += `&doctor=${params.doctor}`;
            }
          }

          const res = location.pathname.startsWith("/admin/")
            ? await getBookingAPI(query)
            : await getDoctorBookingAPI(query);

          if (res.data) {
            setMeta(res.data.meta);
          }

          return {
            data: res.data?.result,
            page: 1,
            success: true,
            total: res.data?.meta.total,
          };
        }}
        rowKey="id"
        pagination={{
          current: meta.current,
          pageSize: meta.pageSize,
          showSizeChanger: true,
          total: meta.total,
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        headerTitle="Table user"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setOpenModalCreate(true);
            }}
          >
            Thêm
          </Button>,
          <Dropdown
            key="menu"
            menu={{
              items: [
                {
                  label: "1st item",
                  key: "1",
                },
                {
                  label: "2nd item",
                  key: "2",
                },
                {
                  label: "3rd item",
                  key: "3",
                },
              ],
            }}
          >
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
      <DetailBooking
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />
      <CreateBooking
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        refreshTable={refreshTable}
      />
      <UpdateBooking
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        refreshTable={refreshTable}
      />
      <DoneBooking
        openModalDone={openModalDone}
        setOpenModalDone={setOpenModalDone}
        dataDone={dataDone}
        setDataDone={setDataDone}
        refreshTable={refreshTable}
      />
    </>
  );
};
