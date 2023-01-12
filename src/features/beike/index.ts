import to from 'await-to-js';
import { createConnection } from 'mysql2/promise'
import { getDataByErshou } from './apis';
import { area } from './area';



const beikeTask = async () => {
  // create the connection to database
  const connection = await createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: "DkdR/Ci5&pCV",
    database: 'blog'
  });

  for (let index = 0; index < area.length; index++) {
    const item = area[index];
    const [err, supply] = await to(getDataByErshou(item.id, item.name, item.district_pinyin))
    if (err) {
      console.log(err)
    }
    const [err2, [rows, fields]] = await to(connection.query(`insert into beike set ?`, supply))
    if (err2) {
      console.log(err2)
    }
  }
  console.log(`贝壳数据抓取结束~`)
  connection.destroy()
}


export default beikeTask
