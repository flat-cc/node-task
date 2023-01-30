import { stringify } from "querystring";
import DingTalk from "../../utils/dingTalk";
import { getOSchinaNewList } from "./api";
import { deFormatTime } from "./utils";
import cheerio from "cheerio";
import { log } from "../../utils";


const dayjs = require('dayjs')

const config = {
  "DDAccessToken": "ea4c61f5580339985a5e20ce5a454b3e00c4f4385d2a9274a0a6c9507f2abb7e",
  "DDSecretKey": "SEC5fbb2df11b3c812000da579f0842a608096eb5caf3b0429642a9104d1c2cbde8",
}
// 测试
// const config = {
//     DDAccessToken: '38276d9f8dc068b7578ca84feee106b2bb3d2de865e39071758ddd67eaf79b61',
//     DDSecretKey: 'SEC702ca28481bc8cc48bc0cc1441a71e14c0662e8814820057ca9e8873e3e3acf1'
// }

const geNewstList = async (page = 1) => {
  let resList = [];
  let _continue = true;
  await getOSchinaNewList(page).then(res => {
    const yesterday = new Date(dayjs().add(-1, 'day').format('yyyy-MM-DD HH:mm:ss'))
    const $ = cheerio.load(res.data);
    const list = $('.news-list-container .news-item-hover')
    list.map(async (i, el) => {
      const item = $(el)
      const timeText = item.find('.item').eq(0).text()
      if (item) {
        const _data = {
          url: (item.data('url') as string).trim(),
          title: item.find('.title').text().trim(),
          img: item.find('img').data('src'),
          description: item.find('.line-clamp').text().trim(),
          timeText,
          time: deFormatTime(timeText)
        }
        if (deFormatTime(timeText) > yesterday) {
          resList.push(_data)
        } else {
          _continue = false;
        }
      }
    })
  })
  // 判断是否请求第二页
  if (_continue) {
    resList = resList.concat(geNewstList(page + 1))
  }
  return resList
}

const osChinaTask = () => {
  geNewstList().then((list) => {
    log(`共抓取${list.length}数据`);
    const talk = new DingTalk(config)
    talk.pushFeedCard(list.map((item) => {
      const query = {
        url: item.url,
        pc_slide: false
      }
      return {
        title: item.title,
        messageURL:`dingtalk://dingtalkclient/page/link?${stringify(query)}`,
        picURL: item.img
      }
    }))
  })
}


export default osChinaTask