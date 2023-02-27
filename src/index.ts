import beikeTask from "./features/beike";
import * as schedule from 'node-schedule'
import osChinaTask from "./features/oschina";
import { log } from "./utils";
import getCommunity from "./features/beike/community";

log('🚀 启动任务~')

// 贝壳定时任务启动~每日9点
schedule.scheduleJob('0 0 9 * * 0-7', () => {
  log('贝壳数据开始抓取~')
  beikeTask()
  
});

// 贝壳小区定时任务启动~每日8点40
schedule.scheduleJob('0 40 8 * * 0-7', () => {
  log('贝壳数据开始抓取~')
  getCommunity()
});

// 开源中国~每日9点40
schedule.scheduleJob('0 40 9 * * 1-5', function(){
  log('开源中国每日资讯抓取~')
  osChinaTask()
});

