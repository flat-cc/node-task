import beikeTask from "./features/beike";
import * as schedule from 'node-schedule'
import osChinaTask from "./features/oschina";
import dayjs = require("dayjs");

console.log('🚀启动任务~')

// 贝壳定时任务启动~每日9点
schedule.scheduleJob('0 0 9 * * 0-7', () => {
  console.log('贝壳数据开始抓取~', dayjs().format('YYYY-MM-DD HH:mm:ss'))
  beikeTask()
});

// 开源中国~每日9点40
schedule.scheduleJob('0 40 9 * * 1-5', function(){
  console.log('开源中国每日资讯抓取~', dayjs().format('YYYY-MM-DD HH:mm:ss'))
  osChinaTask()
});
