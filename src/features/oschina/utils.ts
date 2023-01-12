import dayjs = require("dayjs")

/**
 * 反编译为正常的时间格式 yyyy-MM-DD HH:mm:ss
 * @param {*} time os格式化后的时间
 * @returns string
 */
export const deFormatTime = (time) => {
  if (time.includes('分钟前')) {
    return dayjs().add(parseInt(time), 'minute').format('yyyy-MM-DD')
  }
  const today = dayjs().format('yyyy-MM-DD')
  const yesterday = dayjs().add(-1, 'day').format('yyyy-MM-DD')
  const anteayer = dayjs().add(-2, 'day').format('yyyy-MM-DD')
  return new Date(time.split('·')[1].replace('今天', today).replace('昨天', yesterday).replace('前天', anteayer))
}