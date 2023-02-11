import React from "react";
import { Card, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Charts from "../../components/Charts";

//数据定义
interface DataType {
  key: string;
  id: number;
  user: string;
  content: string;
  ac: number;
  total: number;
  rating: string;
}

//表头设定
const columns: ColumnsType<DataType> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "User",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "Content",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "Ac",
    dataIndex: "ac",
    key: "ac",
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
  },
];

//数据
const data: DataType[] = [
  {
    key: "1",
    id: 1,
    user: "cc",
    content: "abcdefg",
    ac: 20,
    total: 100,
    rating: "20%",
  },
  {
    key: "2",
    id: 2,
    user: "cc",
    content: "abcdefg",
    ac: 20,
    total: 100,
    rating: "20%",
  },
];

const rank = () => {
  return (
    <>
      <Card bordered={true} style={{ width: 1000 }}>
        <Charts />
      </Card>

      <Card bordered={true} style={{ width: 1000, marginTop: 15 }}>
        <Table columns={columns} dataSource={data} />
      </Card>
    </>
  );
};

export default rank;
