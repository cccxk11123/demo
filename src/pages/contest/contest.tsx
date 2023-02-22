import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Divider,
  Input,
  Pagination,
  Form,
  message,
  Select,
  Modal,
} from "antd";
import type { PaginationProps } from "antd";
import {
  FieldTimeOutlined,
  CalendarOutlined,
  LockOutlined,
} from "@ant-design/icons";
import "./contest.scss";
import {
  getContestList,
  hasAccess,
  getContestDetail,
} from "../../services/contestlist";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/tools";

const Contest = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>([]); //查询结果
  const [query, setQuery] = useState({ key: "", page: 0, pageSize: 10 }); //查询条件
  const [total, setTotal] = useState(1); //查询结果的条数
  const [contestPassword, setContestPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [index, setIndex] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    //code -2密码错误 code 0正确
    const res = await getContestDetail({
      index,
      contestPassword,
    });
    if (res.code === 0) {
      //跳转
      navigate(`${index}`, { state: { contestPassword }, replace: true });
      sessionStorage.setItem("MyContest", contestPassword);
    } else {
      message.error(res.msg);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getList = async () => {
      const res = await getContestList(query);
      setData(res.data.list);
      setTotal(res.data.total);
      console.log(res.data.list);
    };
    getList();
  }, [query]); //查询条件改变将影响结果

  //验证是否登录
  const vertifyUser = async (i: any) => {
    const token = getToken();
    setIndex(i);
    if (token != null) {
      if (data[i].have_password) {
        //弹框输入密码后跳转 验证是否输入过密码
        const res = await hasAccess({ i });
        if (res.data) {
          //已经输入过密码直接跳转
          let tmp = sessionStorage.getItem("MyContest");
          navigate(`${i}`, { state: { tmp }, replace: true });
          return;
        }
        setIsModalOpen(true);
      } else {
        navigate(`${i}`, { state: { contestPassword }, replace: true });
      }
    } else {
      message.error("请先登录！");
    }
  };

  const onChange: PaginationProps["onChange"] = (page, pageSize) => {
    setQuery({ ...query, page, pageSize }); //页码改变刷新数据
  };

  //selected
  const handleChange = (status: string) => {};

  return (
    <>
      <Modal
        title="输入竞赛密码"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          allowClear={true}
          onChange={(e) => setContestPassword(e.target.value)}
        />
      </Modal>
      <Card
        bordered={true}
        style={{ width: 1100, padding: 25, paddingBottom: 70 }}
      >
        <div className="top">
          <div className="topLeft">
            <p className="topTitle">All Contests</p>
          </div>
          <div>
            <div className="topRight">
              {/* 下拉式选项 */}
              <Select
                defaultValue="状态"
                style={{ width: 100 }}
                onChange={handleChange}
                options={[
                  { value: "0", label: "正在进行" },
                  { value: "1", label: "已经结束" },
                ]}
              />
              <Form
                layout="inline"
                onFinish={(v: any) => {
                  message.success("查询成功");
                  //console.log(v);
                  setQuery({ ...query, key: v.key });
                }}
              >
                <Form.Item label="" name="key">
                  <Input placeholder="请输入关键词" style={{ width: 250 }} />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit">搜索</Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
        <ol className="list">
          {!data ? (
            <p className="notFind">No Contest</p>
          ) : (
            data.map((item: any, i: any) => {
              return (
                <div key={i}>
                  <li>
                    <div className="listContent">
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTVDMzVBQTRBNjYzMTFFNEIxQzhCNjUwRDA0MEJFRDkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTVDMzVBQTVBNjYzMTFFNEIxQzhCNjUwRDA0MEJFRDkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNUMzNUFBMkE2NjMxMUU0QjFDOEI2NTBEMDQwQkVEOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNUMzNUFBM0E2NjMxMUU0QjFDOEI2NTBEMDQwQkVEOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pi2kbbcAAAZuSURBVHja7FtvaBxF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"
                        alt=""
                      />
                      <div className="listDetail">
                        <ul>
                          <p>
                            <a
                              onClick={(e) => vertifyUser(item.id)}
                              className="listTitle"
                            >
                              {item.title}
                            </a>
                            {item.have_password && <LockOutlined />}
                          </p>
                          <li>
                            <CalendarOutlined className="listIcon" />
                            {item.start_time.split("T")[0] +
                              " " +
                              item.start_time.split("T")[1].substring(0, 5)}
                          </li>
                          <li style={{ width: "100px" }}>
                            <FieldTimeOutlined className="listIcon" />4 hours
                          </li>
                        </ul>
                      </div>
                      {item.status === 0 ? (
                        <Button
                          type="primary"
                          style={{ backgroundColor: "#87D068" }}
                        >
                          正在进行
                        </Button>
                      ) : (
                        <Button type="primary" danger disabled>
                          已结束
                        </Button>
                      )}
                    </div>
                  </li>
                  <Divider />
                </div>
              );
            })
          )}
        </ol>
        <Pagination
          className="pagination"
          defaultCurrent={1}
          total={total + 100}
          onChange={onChange}
        />
      </Card>
    </>
  );
};

export default Contest;
