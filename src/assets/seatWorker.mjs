import { replaceArrayElements } from '@/assets/seatHelper.js'
//importScripts('seatHelper.js')

self.onmessage = (event) => {
  const data = event.data
  console.log('接收到主线程的消息:', event.data)
  const stopwatch =performance.now()
  // 执行耗时的任务
  const result = replaceArrayElements(data).map((item, index) => {return { name: item.name, index: index }})
  console.log('执行完成,用时'+(performance.now()-stopwatch)+'ms')
  // 向主线程发送消息
  self.postMessage(result)
}
