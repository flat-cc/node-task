import to from 'await-to-js';
import { createConnection } from 'mysql2/promise'
import { getDataByErshou } from './apis';
import { area } from './area';



const beikeTask = async () => {
  // create the connection to database
  const connection = await createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
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
