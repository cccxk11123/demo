import { post, put, get } from "../utils/request";

export const getInformation = (data: any) =>
  get("/user/getInformation", {
    headers: {
      authorization: data,
    },
  });

export const updateUserSelfInfo = (data: any) =>
  put("/user/updateUserSelfInfo", {
    headers: {
      authorization: data.token,
    },
    class: data.class,
    major: data.major,
    nick_name: data.nick_name,
    school: data.school,
    sno: data.sno,
  });

export const changeSelfPassword = (data: any) =>
  put("user/changeSelfPassword", {
    headers: {
      authorization: data.token,
    },
    new_password: data.new_password,
    password: data.password,
  });

export const upload = (data: any) =>
  put("user/upload", {
    headers: {
      authorization: data.token,
    },
    profile_picture_url: data.picture,
  });
