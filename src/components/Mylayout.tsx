import React, { useState, useEffect } from "react";
import {
  HomeOutlined,
  BookOutlined,
  BorderOuterOutlined,
  BarChartOutlined,
  RiseOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button, Avatar, Breadcrumb } from "antd";
import { Input, Dropdown, message } from "antd";
import { Form, Modal } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import type { MenuProps } from "antd";
import { codeAPI, createAPI, loginAPI } from "../services/auth";
import { setToken, clearToken, getToken } from "../utils/tools";

const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;
//登录表单数据
interface Values {
  title: string;
  description: string;
  modifier: string;
}
//声明表单接口
interface CollectionCreateFormProps {
  open: boolean;
  isLogin: boolean;
  onCreate: (values: Values) => void;
  onLogin: (Values: Values) => void;
  onCancel: () => void;
}

const items = [
  {
    key: "userInfo",
    icon: <UserOutlined />,
    label: <span>个人信息</span>,
  },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: <span>退出</span>,
  },
];
//侧边栏菜单
const sideMenu = [
  {
    key: "/home",
    icon: <HomeOutlined />,
    label: "首页",
  },
  {
    key: "/problem",
    icon: <BookOutlined />,
    label: "题单",
  },
  {
    key: "/contest",
    icon: <BarChartOutlined />,
    label: "竞赛",
  },
  {
    key: "/status",
    icon: <BorderOuterOutlined />,
    label: "状态",
  },
  {
    key: "/rank",
    icon: <RiseOutlined />,
    label: "排名",
  },
];
//确保刷新后的页面
const findOpenKeys = (key: string) => {
  const result: string[] = [];

  const findInfo = (arr: any) => {
    arr.forEach((item: any) => {
      //如果当前这个键是包含的键那么就放进来
      if (key.includes(item.key)) {
        result.push(key);
      }
    });
  };

  findInfo(sideMenu);
  return result;
};
//面包屑导航
const findDeepPath = (key: string, menus: any) => {
  const result: any = []; // 处理完所有的menu数据成为一个一维数组
  const findInfo = (arr: any) => {
    arr.forEach((item: any) => {
      const { children, ...info } = item;
      result.push(info);
      if (children) {
        findInfo(children); // 递归处理子节点
      }
    });
  };
  findInfo(menus);
  // 根据当前传递的key值过滤数据，获取到当前用来显示的menu item数据
  const tmpData = result.filter((item: any) => key.includes(item.key));
  if (tmpData.length > 0) {
    return [{ label: "CC", key: "/" }, ...tmpData];
  }
  return [];
};

const MyLayout = ({ children }: any) => {
  //路由跳转
  const navigate = useNavigate();
  //varible
  const [isLogin, setIsLogin] = useState(false);
  const { pathname } = useLocation(); //获取地址栏的信息
  const tmpOpenKeys = findOpenKeys(pathname);
  const [breadcrumbs, setBreadcrumbs] = useState<any>([]);
  //根据路由变化设置面包屑导航
  useEffect(() => {
    setBreadcrumbs(findDeepPath(pathname, sideMenu));
    if (getToken()) {
      setIsLogin(true);
    }
  }, [pathname]);

  //对登录表单进行管理
  const [open, setOpen] = useState(false);

  //resgiter
  const onCreate = async (values: any) => {
    //console.log("Received values of form: ", values);
    const res = await createAPI(values);
    if (res.code === 0) {
      message.success(res.msg);
      setOpen(false);
    } else {
      message.error(res.msg);
    }
  };

  //user login
  const onLogin = async (values: any) => {
    //console.log("Login values of form: ", values);
    const res = await loginAPI(values);
    console.log(res);
    if (res.code === 0) {
      message.success(res.msg);
      setToken(res.data.token);
      setOpen(false);
      setIsLogin(true);
    } else {
      message.error(res.msg);
    }
  };

  //search
  const onSearch = (value: string) => {};

  //头像的下拉式菜单
  const onClick: MenuProps["onClick"] = ({ key }) => {
    //message.info(`Click on item ${key}`);
    if (key === "logout") {
      //执行退出操作
      clearToken();
      setIsLogin(false);
      navigate("/home");
    }
    if (key === "userInfo") {
      //跳转到个人信息
      navigate(`/userInfo`);
    }
  };

  //主题样式设置
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        width={130}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background: colorBgContainer,
        }}
      >
        <div className="sideImage">
          <img
            src="https://ts1.cn.mm.bing.net/th/id/R-C.4d6e242be3e2e211316847d83e3dc8a6?rik=Wm16Ceq36Wg5fA&riu=http%3a%2f%2fimg.mm4000.com%2ffile%2fa%2f26%2f259676f001.jpg&ehk=oGQbgv4lakarEiRpmJqFY7GOghpdshkel%2bzQ9kouA1c%3d&risl=&pid=ImgRaw&r=0"
            alt=""
          />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultOpenKeys={tmpOpenKeys}
          defaultSelectedKeys={tmpOpenKeys}
          // 用key来当路由
          onClick={({ key }) => {
            //alert(key);
            navigate(key);
          }}
          items={sideMenu}
        />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 180 }}>
        <Header
          className="header"
          style={{ padding: 0, background: colorBgContainer }}
        >
          <div className="headerRight">
            <Search
              placeholder="input search text"
              allowClear
              onSearch={onSearch}
              style={{ width: 200 }}
            />
            {
              //登录后隐藏按钮
              !isLogin && (
                <Button
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  登录 / 注册
                </Button>
              )
            }

            <CollectionCreateForm //登录处理表单
              open={open}
              onCreate={onCreate}
              onLogin={onLogin}
              isLogin={isLogin}
              onCancel={() => {
                setOpen(false);
              }}
            />
            {isLogin && (
              <Dropdown menu={{ items, onClick }} placement="bottom">
                <Avatar //头像
                  size="large"
                  style={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                    cursor: "default",
                  }}
                >
                  U
                </Avatar>
              </Dropdown>
            )}
          </div>
        </Header>
        <Breadcrumb>
          {breadcrumbs.map((item: any, index: any) => (
            <Breadcrumb.Item key={index}>{item.label}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
        <Content
          style={{ margin: "24px 16px 0", overflow: "initial", minHeight: 530 }}
        >
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>@by cc</Footer>
      </Layout>
    </Layout>
  );
};

//登录/注册
//表单模型
const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  onLogin,
}) => {
  //表单默认值
  const [useremail, setUseremail] = useState("");
  const [sendButton, setSendButton] = useState(!open);
  const [loading, setLoading] = useState(false);

  //send code,正则表达式验证邮箱是否输入正确
  const isOpenButton = (e: any) => {
    setSendButton(true);
    if (
      e.target.value.search(
        /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
      ) !== -1
    ) {
      setUseremail(e.target.value);
      setSendButton(false);
    }
  };
  //发送验证码
  const sendCode = async (email: any) => {
    const res = await codeAPI(email);
    if (res.code === 0) {
      message.success(res.msg);
    } else {
      message.error(res.msg);
    }
    //console.log(res);
    setLoading(true);
    //60s
    setTimeout(function () {
      setLoading(false);
    }, 600000);
  };

  const [form] = Form.useForm();

  //设置显示内容,默认显示注册表单
  const [extend, setExtend] = useState(false);

  return (
    <Modal
      open={open}
      title={extend ? "注册您的账号" : "登录您的账号"}
      okText={extend ? "创建" : "登录"}
      cancelText="取消"
      onCancel={onCancel}
      destroyOnClose={true}
      onOk={() => {
        //数据处理
        {
          extend
            ? form
                .validateFields()
                .then((values) => {
                  form.resetFields();
                  onCreate(values);
                })
                .catch((info) => {
                  //console.log("Register Failed:", info);
                })
            : form
                .validateFields()
                .then((values) => {
                  form.resetFields();
                  onLogin(values);
                })
                .catch((info) => {
                  //console.log("Login Failed:", info);
                });
        }
      }}
    >
      <Form
        form={form}
        preserve={false}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "用户名不能为空!",
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        {extend ? (
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入您的密码!",
              },
              {
                min: 4,
                message: "密码长度不小于4位!",
              },
            ]}
            hasFeedback
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
        ) : (
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入您的密码!",
              },
            ]}
            hasFeedback
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
        )}
        {extend && (
          <>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "请输入有效的邮箱!",
                },
                {
                  required: true,
                  message: "请输入您的邮箱!",
                },
              ]}
              hasFeedback
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  isOpenButton(e);
                }}
              />
            </Form.Item>
            <div className="sendButton">
              <Form.Item
                name="code"
                rules={[
                  {
                    required: true,
                    message: "请输入您的验证码!",
                  },
                ]}
              >
                <Input
                  style={{
                    width: 100,
                  }}
                  placeholder="Code"
                ></Input>
              </Form.Item>
              <Button
                disabled={sendButton}
                loading={loading}
                onClick={() => {
                  sendCode(useremail);
                }}
              >
                发送验证码
              </Button>
            </div>
          </>
        )}
      </Form>

      {extend ? (
        <>
          已有账号？
          <a
            onClick={() => {
              setExtend(false);
            }}
          >
            点我登录
          </a>
        </>
      ) : (
        <>
          没有账号？
          <a
            onClick={() => {
              setExtend(true);
            }}
          >
            立即注册！
          </a>
        </>
      )}
    </Modal>
  );
};

export default MyLayout;
