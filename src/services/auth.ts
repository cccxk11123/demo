import { post } from "../utils/request";

type loginData = {
  UserName: string;
  PassWord: string;
};

type EmailData = {
  email: string;
};

//用户登录
export const loginAPI = (data: loginData) => post("/user/login", data);

//用户注册
export const createAPI = (data: any) =>
  post("/user/register", {
    user_email: data.email,
    user_email_code: data.code,
    user_name: data.username,
    user_password: data.password,
  });

//发送验证码
export const codeAPI = (data: EmailData) =>
  post("/user/register/send-code", { email: data });
