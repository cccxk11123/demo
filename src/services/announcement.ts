import { post } from "../utils/request";

type getData = {
  page: number;
  pageSize: number;
};

//获取公告列表
export const getAnnouncementList = (data: getData) =>
  post("/announcement/getAnnouncementList", data);

//根据id获取公告
export const getAnnouncementById = (data: number) =>
  post("announcement/getAnnouncement", data);
