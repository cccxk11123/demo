import { Card, Input, Form, Button, Tag, Divider, Table, message } from "antd";
import React, { useState, useEffect } from "react";
import { getProblemList, getAllLabels } from "../../services/issue";
import { Link } from "react-router-dom";

const { CheckableTag } = Tag;

//标签数据 TODO
const Problem = () => {
  const [tagsData, setTagsData] = useState([]);
  //const tagsData = ["模拟", "递归", "分治", "贪心"];
  const [data, setData] = useState([]); //查询结果
  const [query, setQuery] = useState({ key: "", page: 0, pageSize: 10 }); //查询条件
  const [total, setTotal] = useState(0); //查询结果的条数

  useEffect(() => {
    const getList = async () => {
      const res = await getProblemList(query);
      //console.log(res.data.List);
      setData(res.data.List);
      setTotal(res.data.total + 100);
    };
    const getLabel = async () => {
      const res = await getAllLabels();
      //setTagsData(res);
      var b = [];
      for (var i = 0; i < res.data.length; i++) {
        b.push(res.data[i].label_name);
      }
      setTagsData(b as any);
    };
    getList();
    getLabel();
  }, [query]); //查询条件改变将影响结果

  //标签颜色
  const colors = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple",
  ];
  //表头设定
  const columns = [
    {
      width: 100,
      title: "Id",
      key: "id",
      render(data: any) {
        return <>{data.ID}</>;
      },
    },
    {
      width: 200,
      title: "题目",
      dataIndex: "Title",
      key: "title",
      render: (text: any, data: any) => <Link to={`${data.ID}`}>{text}</Link>,
    },
    {
      width: 300,
      title: "标签",
      dataIndex: "Label",
      key: "label",
      render(v: any) {
        return (
          <>
            {v &&
              v.map((item: any) => {
                let num = Math.round(Math.random() * 11);
                return <Tag color={colors[num]}>{item}</Tag>;
              })}
          </>
        );
      },
    },
    {
      width: 100,
      title: "难度",
      dataIndex: "Level",
      key: "level",
      render: (text: string) => {
        let color;
        if (text === "Hard") {
          color = "#f50";
        } else if (text === "Mid") {
          color = "#2db7f5";
        } else {
          color = "#87d068";
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      width: 100,
      title: "通过数",
      dataIndex: "AcceptNumber",
      key: "accept",
    },
    {
      width: 100,
      title: "总提交数",
      dataIndex: "SubmissionNumber",
      key: "total",
    },
  ];

  //数组存放选中的标签
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    //console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
    setQuery({ ...query, key: nextSelectedTags[0] });
  };

  return (
    <div>
      <Card bordered={true} style={{ width: 1000 }}>
        <Form //处理搜索和标签筛选
          layout="inline"
          onFinish={(v: any) => {
            message.success("查询成功");
            setQuery({ ...query, key: v.key });
          }}
        >
          <Form.Item label="查找题目" name="key">
            <Input placeholder="请输入关键词" style={{ width: 300 }} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">搜索</Button>
          </Form.Item>
        </Form>
        <Divider />
        <span style={{ marginRight: 8 }}>标签:</span>
        {tagsData.map((tag) => (
          <CheckableTag //标签筛选
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={(checked) => handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </Card>
      <Card bordered={true} style={{ width: 1000, marginTop: 15 }}>
        <Table //渲染题目数据
          dataSource={data}
          rowKey="id"
          columns={columns}
          pagination={{
            total, //总数量,页码改变时执行
            onChange(page: number, pageSize: number) {
              setQuery({ ...query, page, pageSize }); //把原始数据取出 只改变page
            },
          }}
        />
      </Card>
    </div>
  );
};

export default Problem;
