import React, { useState, useEffect } from "react";
import { Card, Table } from "antd";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getToken } from "../../utils/tools";
import {
  getContestProblemList,
  getContestDetail,
} from "../../services/contestlist";
import "./contestInfo.scss";

const ContestInfo = () => {
  const state = useLocation(); //参数
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [contest, setContest] = useState({
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    contest_creator: "",
  });
  const token = getToken();
  const id = useParams();

  useEffect(() => {
    getProblemList();
    getDetail();
  }, []); //查询条件改变将影响结果

  const getDetail = async () => {
    const res = await getContestDetail({
      id: Number(id.id),
      contestPassword: state.state.contestPassword,
    });
    setContest(res.data);
  };

  const getProblemList = async () => {
    const res = await getContestProblemList({
      header: token,
      id: Number(id.id),
      page: 0,
      page_size: 0,
    });
    //console.log(res);
    setData(res.data);
  };

  const linkToProblem = (i: any) => {
    navigate(`/problem/${i}`);
  };

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
      render: (text: any, data: any) => (
        <a onClick={(e) => linkToProblem(data.ID)}>{text}</a>
      ),
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

  return (
    <>
      {contest.start_time ? (
        <>
          <Card style={{ width: 1100, marginTop: 20 }}>
            <div className="contestInfo">
              <p className="title">{contest.title}</p>
              <p className="description">{contest.description}</p>
              <div className="contestTime">
                <p className="creator">{contest.contest_creator}</p>
                <p>
                  {contest.start_time &&
                    contest.start_time.split("T")[0] +
                      "  " +
                      contest.start_time.split("T")[1].substring(0, 5)}
                </p>
                <p>
                  {contest.end_time &&
                    contest.end_time.split("T")[0] +
                      "  " +
                      contest.end_time.split("T")[1].substring(0, 5)}
                </p>
              </div>
            </div>
          </Card>
          <Card bordered={true} style={{ width: 1100, marginTop: 15 }}>
            <Table //渲染题目数据
              dataSource={data}
              rowKey="id"
              columns={columns}
            />
          </Card>
        </>
      ) : (
        <h1>Not Found</h1>
      )}
    </>
  );
};

export default ContestInfo;
