export const serverUrl = "http://qiaohuhu.xyz:9200/api";

export const setToken = (token: string) =>
  sessionStorage.setItem("token", token);

export const clearToken = () => sessionStorage.clear();

export const getToken = () => sessionStorage.getItem("token");
