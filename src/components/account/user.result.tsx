import { useRef, useState } from "react";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";

import { getUserResultAPI } from "@/services/api";
import dayjs from "dayjs";
import { userCurrentApp } from "../context/app.context";
import { Tooltip } from "antd";

type TSearch = {
  service: string;
  account: string;
  fullname: string;
  doctor: string;
};

export const UserResult = () => {
  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0,
  });
  const actionRef = useRef<ActionType>();
  const { user } = userCurrentApp();

  const columns: ProColumns<IResult>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
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
      title: "Mô tả",
      dataIndex: "decriptions",
      align: "center",
      hideInSearch: true,
      ellipsis: true,
      render: (decriptions) => (
        <Tooltip title={decriptions} color="orange">
          <span>{decriptions}</span>
        </Tooltip>
      ),
    },
    {
      title: "Dịch vụ",
      dataIndex: "service",
      align: "center",
    },
    {
      title: "Bác sĩ",
      dataIndex: "doctor",
      align: "center",
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
  ];

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
          const res = await getUserResultAPI(user?.phone ?? "");

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
        toolBarRender={() => []}
      />
    </>
  );
};
