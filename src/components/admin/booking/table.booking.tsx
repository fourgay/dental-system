import { useRef, useState } from "react";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { App, Button, Dropdown, Popconfirm } from "antd";
import {
  CheckSquareFilled,
  CloseSquareFilled,
  DeleteTwoTone,
  EditTwoTone,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { getBookingAPI } from "@/services/api";

type TSearch = {
  phone: string;
  fullname: string;
  role: string;
};

export const TableBooking = () => {
  const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);
  const [dataViewDetail, setDataViewDetail] = useState<IBooking | null>(null);

  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);

  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<IBooking | null>(null);

  const [isDeleteUser, setIsDeleteUser] = useState<boolean>(false);
  const { notification } = App.useApp();

  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0,
  });
  const actionRef = useRef<ActionType>();

  // const handleDeleteUser = async (phone: string) => {
  //   setIsDeleteUser(true);
  //   const res = await deleteUserAPI(phone);
  //   if (res.message) {
  //     notification.success({
  //       message: "Xoá user thành công",
  //       description: res.message,
  //     });
  //     refreshTable();
  //   } else {
  //     notification.error({
  //       message: "Đã có lỗi xảy ra",
  //       description: res.message,
  //     });
  //   }
  //   setIsDeleteUser(false);
  // };

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
    },
    {
      title: "Ngày khám",
      dataIndex: "date",
      hideInSearch: true,
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      hideInSearch: true,
    },
    {
      title: "Dịch vụ",
      dataIndex: "service",
      hideInSearch: true,
    },
    {
      title: "Bác sĩ",
      dataIndex: "doctor",
      hideInSearch: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      hideInSearch: true,
    },
    {
      title: "Cho người khác",
      dataIndex: "forAnother",
      hideInSearch: true,
      align: "center",
      render: (_, record) =>
        record.forAnother ? (
          <CheckSquareFilled style={{ color: "green", fontSize: 20 }} />
        ) : (
          <CloseSquareFilled style={{ color: "red", fontSize: 20 }} />
        ),
    },
    {
      title: "Action",
      hideInSearch: true,
      render(dom, entity, index, action, schema) {
        return (
          <>
            <EditTwoTone
              twoToneColor="#f57800"
              style={{ cursor: "pointer", marginRight: 15 }}
              onClick={() => {
                setDataUpdate(entity);
                console.log(dataUpdate);

                setOpenModalUpdate(true);
              }}
            />
            <Popconfirm
              placement="leftTop"
              title={"Xác nhận xóa user"}
              description={"Bạn có chắc chắn muốn xóa user này ?"}
              // onConfirm={() => handleDeleteUser(entity.phone)}
              okText="Xác nhận"
              cancelText="Hủy"
              okButtonProps={{ loading: isDeleteUser }}
            >
              <span style={{ cursor: "pointer", marginLeft: 20 }}>
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
          console.log(params, sort, filter);

          let query = "";
          if (params) {
            query += `page=${params?.current ?? 1}`;
            if (params.phone) {
              query += `&phone=${params.phone}`;
            }
            if (params.fullname) {
              query += `&fullname=${params.fullname}`;
            }
            if (params.role) {
              query += `&role=${params.role}`;
            }
          }

          const res = await getBookingAPI(query);
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
    </>
  );
};
