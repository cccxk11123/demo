import { Card } from "antd";
import { Input } from "antd";
import { getProblemDetail } from "../../services/issue";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./problemInfo.scss";
import CodeEditor from "./codemirror";

const ProblemInfo = () => {
  const navigate = useNavigate();
  //根据路由上的id获取该题目的具体信息
  const [description, setDescription] = useState("");
  const [input_description, setInput_description] = useState("");
  const [out_put_description, setOut_put_description] = useState("");
  const [sample, setSample] = useState("");

  const id = useParams();

  useEffect(() => {
    const getProblemInfo = async () => {
      const res = await getProblemDetail(Number(id.id));
      //console.log(res);
      if (res.data.id == 0) {
        navigate("/home");
      }
      setDescription(res.data.description);
      setInput_description(res.data.input_description);
      setOut_put_description(res.data.out_put_description);
      setSample(res.data.sample);
    };
    getProblemInfo();
  }, []); //查询条件改变将影响结果
  return (
    <>
      <Card style={{ width: 1000 }}>
        <div className="content">
          <p className="title">问题描述</p>
          <p>{description}</p>
          <p className="title">输入说明</p>
          <p>{input_description}</p>
          <p className="title">输出说明</p>
          <p>{out_put_description}</p>
          <div className="sample">
            <div className="sampleInput">
              <p className="title">输入样例</p>
              <p>{sample}</p>
            </div>
          </div>
        </div>
      </Card>
      <Card style={{ width: 1000, marginTop: 20 }}>
        <CodeEditor />
      </Card>
    </>
  );
};

export default ProblemInfo;
