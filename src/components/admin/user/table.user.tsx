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
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { deleteUserAPI, getUsersAPI } from "@/services/api";
import { DetailUser } from "./detail.user";
import { CreateUser } from "./create.user";
import { UpdateUser } from "./update.user";

type TSearch = {
  phone: string;
  fullname: string;
  role: string;
};

export const TableUser = () => {
  const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);
  const [dataViewDetail, setDataViewDetail] = useState<IUser | null>(null);

  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);

  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<IUser | null>(null);

  const [isDeleteUser, setIsDeleteUser] = useState<boolean>(false);
  const { notification } = App.useApp();

  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0,
  });
  const actionRef = useRef<ActionType>();

  const handleDeleteUser = async (phone: string) => {
    setIsDeleteUser(true);
    const res = await deleteUserAPI(phone);
    if (res.message) {
      notification.success({
        message: "Xoá user thành công",
        description: res.message,
      });
      refreshTable();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsDeleteUser(false);
  };

  const columns: ProColumns<IUser>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
      align: "center",
    },
    {
      title: "Tài khoản",
      dataIndex: "phone",
      copyable: true,
      align: "center",
    },
    {
      title: "Họ tên",
      dataIndex: "fullname",
      align: "center",
    },
    {
      title: "Phân quyền",
      dataIndex: "role",
      valueType: "select",
      valueEnum: {
        ADMIN: { text: "Admin" },
        USER: { text: "User" },
        DOCTOR: { text: "Doctor" },
      },
      hideInTable: true,
      align: "center",
    },
    {
      title: "Đặt lịch",
      dataIndex: "isBooking",
      hideInSearch: true,
      align: "center",
      render: (_, record) =>
        record.isBooking ? (
          <CheckSquareFilled style={{ color: "green", fontSize: 20 }} />
        ) : (
          <CloseSquareFilled style={{ color: "red", fontSize: 20 }} />
        ),
    },
    {
      title: "Phân quyền",
      dataIndex: "role",
      hideInSearch: true,
      align: "center",
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
              style={{ cursor: "pointer", margin: "0 35px" }}
              onClick={() => {
                setDataUpdate(entity);
                setOpenModalUpdate(true);
              }}
            />
            <Popconfirm
              placement="leftTop"
              title={"Xác nhận xóa user"}
              description={"Bạn có chắc chắn muốn xóa user này ?"}
              onConfirm={() => handleDeleteUser(entity.phone)}
              okText="Xác nhận"
              cancelText="Hủy"
              okButtonProps={{ loading: isDeleteUser }}
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
      <ProTable<IUser, TSearch>
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

          const res = await getUsersAPI(query);
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
      <DetailUser
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />
      <CreateUser
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        refreshTable={refreshTable}
      />
      <UpdateUser
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        refreshTable={refreshTable}
      />
    </>
  );
};
