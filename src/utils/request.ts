import axios from "axios";
import { serverUrl, getToken } from "./tools";
// @ts-ignore
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const instance = axios.create({
  baseURL: serverUrl, //请求的基础地址
  timeout: 5000,
});

// Add a request interceptor，发起请求之前执行
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // @ts-ignore
    config.headers.Authorization = getToken();
    NProgress.start(); // 启动loading
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor，请求返会之后执行
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    NProgress.done();
    return response;
  },
  function (error) {
    NProgress.done(); // 关闭loading
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

//与url进行拼接, url地址，params参数
export const get = (url: string, params: any = {}) =>
  instance.get(url, { params }).then((res) => res.data);

export const post = (url: string, data: any = {}) =>
  instance.post(url, data).then((res) => res.data);

export const put = (url: string, data: any = {}) =>
  instance.put(url, data).then((res) => res.data);

export const patch = (url: string, data: any = {}) =>
  instance.patch(url, data).then((res) => res.data);

export const del = (url: string) =>
  instance.delete(url).then((res) => res.data);
