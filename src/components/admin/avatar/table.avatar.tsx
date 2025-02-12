import { useRef, useState } from "react";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { App, Avatar, Button, Popconfirm } from "antd";
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import { deleteAvatarAPI, getAvatarAPI } from "@/services/api";
import dayjs from "dayjs";
import { CreateAvatar } from "./create.avatar";
import { UpdateAvatar } from "./update.avatar";

type TSearch = {
  name: string;
};

export const TableAvatar = () => {
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);

  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<IAvatar | null>(null);

  const [isDeleteAvatar, setIsDeleteAvatar] = useState<boolean>(false);
  const { notification } = App.useApp();

  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0,
  });
  const actionRef = useRef<ActionType>();

  const handleDeleteAvatar = async (id: number) => {
    setIsDeleteAvatar(true);
    const res = await deleteAvatarAPI(id);

    if (res.message) {
      notification.success({
        message: "Xoá avatar thành công",
        description: res.message,
      });
      refreshTable();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsDeleteAvatar(false);
  };

  const columns: ProColumns<IAvatar>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "Tên",
      dataIndex: "name",
      align: "center",
      hideInSearch: true,
    },
    {
      title: "Link",
      dataIndex: "Link",
      align: "center",
      hideInSearch: true,
    },
    {
      title: "Avatar",
      align: "center",
      hideInSearch: true,
      render: (_, record) => (
        <Avatar src={import.meta.env.VITE_URL_AVATAR + record.Link} />
      ),
    },
    {
      title: "Tạo",
      dataIndex: "createdAt",
      hideInSearch: true,
      align: "center",
      render: (createdAt) => {
        if (typeof createdAt === "string" || typeof createdAt === "number") {
          return dayjs(createdAt).format("DD-MM-YYYY");
        }
        return "--";
      },
    },
    {
      title: "Cập nhập",
      dataIndex: "updatedAt",
      hideInSearch: true,
      align: "center",
      render: (updatedAt) => {
        if (typeof updatedAt === "string" || typeof updatedAt === "number") {
          return dayjs(updatedAt).format("DD-MM-YYYY");
        }
        return "--";
      },
    },
    {
      title: "Action",
      hideInSearch: true,
      align: "center",
      render(dom, entity, index, action, schema) {
        return (
          <>
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
              title={"Xác nhận xóa"}
              description={"Bạn có chắc chắn muốn xóa avatar này?"}
              onConfirm={() => handleDeleteAvatar(entity.id)}
              okText="Xác nhận"
              cancelText="Hủy"
              okButtonProps={{ loading: isDeleteAvatar }}
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
      <ProTable<IAvatar, TSearch>
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
          const res = await getAvatarAPI();

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
        ]}
      />
      <CreateAvatar
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        refreshTable={refreshTable}
      />
      <UpdateAvatar
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        refreshTable={refreshTable}
      />
    </>
  );
};
