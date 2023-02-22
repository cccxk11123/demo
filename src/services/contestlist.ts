import { post } from "../utils/request";

type getData = {
  key: string;
  page: number;
  pageSize: number;
};

//获取竞赛列表
export const getContestList = (data: getData) =>
  post("/contest/getContestList", {
    key_word: data.key,
    page: data.page,
    page_size: data.pageSize,
  });

//根据竞赛获取问题列表
export const getContestProblemList = (data: any) =>
  post("/contest/getContestProblemList", {
    headers: {
      authorization: data.header,
    },
    contest_id: data.id,
    page: data.page,
    page_size: data.page_size,
  });

//获取竞赛详细信息
export const getContestDetail = (data: any) =>
  post("/contest/getContestDetail", {
    contest_id: data.id,
    pass_word: data.contestPassword,
  });

//验证是否已经输入竞赛mim
export const hasAccess = (i: any) =>
  post("/contest/hasAccess", {
    contest_id: i,
  });
