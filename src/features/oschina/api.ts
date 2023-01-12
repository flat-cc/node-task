import axios from "axios"

export const getOSchinaNewList = (p) => {
  return axios.get('https://www.oschina.net/news/widgets/_news_index_all_list_new?type=ajax', { params: { p }})
}