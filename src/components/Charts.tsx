import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/plots";

//统计表
const Charts = () => {
  const data = [
    {
      name: "ac",
      用户: "cc",
      数量: 20,
    },
    {
      name: "total",
      用户: "cc",
      数量: 100,
    },
    {
      name: "ac",
      用户: "bb",
      数量: 30,
    },
    {
      name: "total",
      用户: "bb",
      数量: 60,
    },
    {
      name: "ac",
      用户: "aa",
      数量: 13,
    },
    {
      name: "total",
      用户: "aa",
      数量: 34,
    },
    {
      name: "ac",
      用户: "gg",
      数量: 44,
    },
    {
      name: "total",
      用户: "gg",
      数量: 67,
    },
  ];
  const config = {
    data,
    isGroup: true,
    loading: false,
    xField: "用户",
    yField: "数量",
    seriesField: "name",

    /** 设置颜色 */
    //color: ['#1ca9e6', '#f88c24'],

    /** 设置间距 */
    // marginRatio: 0.1,
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle" as "middle",
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: "interval-adjust-position",
        }, // 数据标签防遮挡
        {
          type: "interval-hide-overlap",
        }, // 数据标签文颜色自动调整
        {
          type: "adjust-color",
        },
      ],
    },
  };
  return <Column {...config} />;
};

export default Charts;
