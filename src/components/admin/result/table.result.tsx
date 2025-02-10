import { useRef, useState } from "react";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { App, Button, Dropdown, Popconfirm, Tag } from "antd";
import {
  CheckSquareFilled,
  CloseSquareFilled,
  DeleteTwoTone,
  EditTwoTone,
  EllipsisOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  deleteResultAPI,
  getDoctorResultAPI,
  getResultAPI,
} from "@/services/api";
import dayjs from "dayjs";
import { DetailResult } from "./detail.result";
import { UpdateResult } from "./update.result";
// import { deleteBookingAPI, getBookingAPI } from "@/services/api";
// import { CreateBooking } from "./create.r";
// import { DetailBooking } from "./detail.booking";
// import { UpdateBooking } from "./update.booking";

type TSearch = {
  service: string;
  account: string;
  fullname: string;
  doctor: string;
};

export const TableResult = () => {
  const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);
  const [dataViewDetail, setDataViewDetail] = useState<IResult | null>(null);

  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);

  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<IResult | null>(null);

  const [isDeleteResult, setIsDeleteResult] = useState<boolean>(false);
  const { notification } = App.useApp();

  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0,
  });
  const actionRef = useRef<ActionType>();

  const handleDeleteResult = async (id: number, account: string) => {
    setIsDeleteResult(true);
    const res = await deleteResultAPI(id, account);

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
    setIsDeleteResult(false);
  };

  const columns: ProColumns<IResult>[] = [
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
      title: "Kết quả",
      dataIndex: "title",
      align: "center",
      hideInSearch: true,
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
          } as ProColumns<IResult>,
        ]
      : []),
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
              title={"Xác nhận xóa kết quả khám"}
              description={"Bạn có chắc chắn muốn xóa kết quả khám này ?"}
              onConfirm={() => handleDeleteResult(entity.id, entity.account)}
              okText="Xác nhận"
              cancelText="Hủy"
              okButtonProps={{ loading: isDeleteResult }}
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
      <ProTable<IResult, TSearch>
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
            ? await getResultAPI(query)
            : await getDoctorResultAPI(query);

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
      <DetailResult
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />
      <UpdateResult
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        refreshTable={refreshTable}
      />
    </>
  );
};
