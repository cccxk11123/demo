import { post } from "../utils/request";

type getData = {
  key: string;
  page: number;
  pageSize: number;
};

//获取问题列表
export const getProblemList = (data: getData) =>
  post("/problem/getProblemList", {
    key_word: data.key,
    page: data.page,
    page_size: data.pageSize,
  });

//获取问题详细byId
export const getProblemDetail = (id: number) =>
  post("/problem/getProblemDetail", { problem_id: id });

//获取所有标签
export const getAllLabels = () => post("/problem/getAllLabels", {});
