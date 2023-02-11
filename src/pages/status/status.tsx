import React from "react";
import { Card, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

//数据定义
interface DataType {
  key: string;
  id: number;
  date: string;
  status: string;
  problem: string;
  useTime: string;
  memory: string;
  language: string;
  user: string;
}

//表头设定
const columns: ColumnsType<DataType> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "时间",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: (text) => {
      let color;
      if (text === "Accepted") {
        color = "#87d068";
      } else if (text === "Wrong Answer") {
        color = "#FF5500";
      }
      return <Tag color={color}>{text}</Tag>;
    },
  },
  {
    title: "问题",
    dataIndex: "problem",
    key: "problem",
  },
  {
    title: "运行时间",
    dataIndex: "useTime",
    key: "useTime",
  },
  {
    title: "内存消耗",
    dataIndex: "memory",
    key: "memory",
  },
  {
    title: "用户",
    dataIndex: "user",
    key: "user",
  },
];

//数据
const data: DataType[] = [
  {
    key: "1",
    id: 1,
    date: "2022-12-22 16:02",
    status: "Accepted",
    problem: "1",
    useTime: "1000ms",
    memory: "405KB",
    language: "C++",
    user: "cc",
  },
  {
    key: "2",
    id: 2,
    date: "2022-12-22 16:02",
    status: "Wrong Answer",
    problem: "1",
    useTime: "1000ms",
    memory: "405KB",
    language: "C++",
    user: "cc",
  },
];

function status() {
  return (
    <>
      <Card style={{ width: 1000 }} className="title">
        <p>Status</p>
      </Card>
      <Card bordered={true} style={{ width: 1000 }}>
        <Table columns={columns} dataSource={data} />
      </Card>
    </>
  );
}

export default status;
