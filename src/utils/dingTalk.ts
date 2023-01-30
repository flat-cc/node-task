import axios from "axios";
import * as crypto from "crypto"
import { log } from ".";

const baseURL = 'https://oapi.dingtalk.com';



class DingTalk {
  _webhookUrl;
  _timestamp;
  _sign;
  config: any;
  constructor(config) {
    this.config = config;
    this._timestamp = Date.now();
    this._sign = this.signFn(this._timestamp.toString());
    this._webhookUrl = `/robot/send?access_token=${config.DDAccessToken}&timestamp=${this._timestamp}&sign=${this._sign}&pc_slide=false`;
  }

  setTimestamp(now) {
    this._timestamp = now;
    this._sign = this.signFn(this._timestamp.toString());
    this._webhookUrl = `/robot/send?access_token=${this.config.DDAccessToken}&timestamp=${this._timestamp}&sign=${this._sign}&pc_slide=false`;
  }

  signFn(timestamp) {
    const hmac = crypto.createHmac('sha256', this.config.DDSecretKey);
    hmac.update(timestamp + "\n" + this.config.DDSecretKey);
    let Hmac = hmac.digest('base64');
    return Hmac.toString();
  }

  async pushMsg(msg, ...atMobiles) {
    try {

      let mobilesString = '';
      atMobiles.forEach(item => {
        mobilesString += '@' + item;
      });

      let postData = {
        "msgtype": "text",
        "text": {
          "content": msg + "\n" + mobilesString
        },
        "at": {
          "atMobiles": atMobiles,
          "isAtAll": false
        }
      }
      return await axios.post(baseURL + this._webhookUrl, postData);
    } catch (err) {
      console.error(err)
      return false
    }
  }

  pushFeedCard(links) {
    if (!links || links.length <= 0) {
      return
    }
    const postData = {
      "msgtype": "feedCard",
      "feedCard": {
        "links": links
      }
    }
    axios.post(baseURL + this._webhookUrl, postData).then((res) => {
      log('发送消息成功！', JSON.stringify(postData));
    }).catch(err => {
      log('发送失败！');
      log(err)
    });
  }
}

export default DingTalk;