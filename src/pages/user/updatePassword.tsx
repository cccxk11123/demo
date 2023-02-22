import { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Card, Avatar, Input, message } from "antd";
import { changeSelfPassword, getInformation } from "../../services/user";
import "./userInfo.scss";
import { Link } from "react-router-dom";
import { getToken } from "../../utils/tools";

function UpdatePassword() {
  //相关参数
  const [newpassword, setNewpassword] = useState("");
  const [password, setPassword] = useState("");

  const token = getToken();

  const upadetPassword = async () => {
    if (password && newpassword) {
      //更改个人密码
      const res = await changeSelfPassword({
        header: token,
        new_password: newpassword,
        password: password,
      });
      if (res.code == 0) {
        message.success(res.msg);
        //重新加载页面
        window.location.reload();
      } else {
        message.error(res.msg);
      }
    } else {
      message.error("请输入完整的信息！");
    }
  };

  const [user, setUser] = useState({
    nick_name: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const res = await getInformation(token);
      setUser(res.data);
    };
    getUser();
  }, []);

  return (
    <>
      <div className="userInfo">
        <Card style={{ width: 300, height: 500 }}>
          <div className="userInfoDetail">
            <Avatar size={200} icon={<UserOutlined />} />

            <p className="userName">{user.nick_name}</p>
            <Link to={"/userinfo"} className="updatePassword">
              修改信息
            </Link>
          </div>
        </Card>
        <Card style={{ width: 600, height: 500 }}>
          <p className="updateTitle">修改我的密码</p>
          <div className="updateUserPassword">
            <p>
              原密码
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </p>
            <p>
              新密码
              <Input
                onChange={(e) => setNewpassword(e.target.value)}
                type="password"
              />
            </p>
          </div>
          <Button className="submitPassword" onClick={upadetPassword}>
            确认更改
          </Button>
        </Card>
      </div>
    </>
  );
}

export default UpdatePassword;
