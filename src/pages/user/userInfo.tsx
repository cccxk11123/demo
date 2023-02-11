import React, { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Card, Avatar, Input, message } from "antd";
import { updateUserSelfInfo, getInformation } from "../../services/user";
import { getToken } from "../../utils/tools";
import "./userInfo.scss";
import { Link } from "react-router-dom";

function UserInfo() {
  //相关参数
  const [class_, setClass] = useState("");
  const [sno, setSno] = useState("");
  const [school, setSchool] = useState("");
  const [nick_name, setNick_name] = useState("");
  const [major, setMajor] = useState("");

  const [user, setUser] = useState({
    nick_name: "",
    major: "",
    school: "",
    class: "",
    sno: "",
  });

  const token = getToken();

  useEffect(() => {
    const getUser = async () => {
      const res = await getInformation(token);
      setUser(res.data);
    };
    getUser();
  }, []);

  const upadetUserInfo = async () => {
    if (class_ || sno || school || nick_name || major) {
      const res = await updateUserSelfInfo({
        header: token,
        class: class_,
        sno: sno,
        school: school,
        nick_name: nick_name,
        major: major,
      });
      if (res.code == 0) {
        message.success(res.msg);
        //重新加载页面
        window.location.reload();
      }
    } else {
      message.error("请输入修改信息！");
    }
  };

  return (
    <>
      <div className="userInfo">
        <Card style={{ width: 300, height: 500 }}>
          <div className="userInfoDetail">
            <Avatar size={200} icon={<UserOutlined />} />
            <p className="userName">
              {user.nick_name ? user.nick_name : "取一个名字吧"}
            </p>
            <Link to={"/updatepassword"} className="updatePassword">
              修改密码
            </Link>
          </div>
        </Card>
        <Card style={{ width: 600, height: 500 }}>
          <p className="updateTitle">更新个人信息</p>
          <div className="userMainInfo">
            <div className="userinfoLeft">
              <p>
                昵称
                <Input
                  onChange={(e) => setNick_name(e.target.value)}
                  placeholder={user.nick_name}
                />
              </p>
              <p>
                学校
                <Input
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder={user.school}
                />
              </p>
            </div>
            <div className="userinfoRight">
              <p>
                学院
                <Input
                  onChange={(e) => setMajor(e.target.value)}
                  placeholder={user.major}
                />
              </p>
              <p>
                班级
                <Input
                  onChange={(e) => setClass(e.target.value)}
                  placeholder={user.class}
                />
              </p>
              <p>
                学号
                <Input
                  onChange={(e) => setSno(e.target.value)}
                  placeholder={user.sno}
                />
              </p>
            </div>
          </div>
          <Button className="submit" onClick={upadetUserInfo}>
            更改我的个人信息
          </Button>
        </Card>
      </div>
    </>
  );
}

export default UserInfo;
