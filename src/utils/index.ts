/**
 * 推迟执行
 * @param timeout 时间，毫秒
 * @returns 
 */
export const delay = (timeout: number) => {
  return new Promise<void>((resolve) => setTimeout(() => {
    resolve()
  }, timeout))
}