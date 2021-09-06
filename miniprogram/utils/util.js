/**
 * requestPromise用于将wx.request改写成Promise方式
 * @param：{string} myUrl 接口地址
 * @return: Promise实例对象
 */
const requestPromise = myUrl => {
  // 返回一个Promise实例对象
  return new Promise((resolve, reject) => {
    wx.request({
      url: myUrl,
      method:"GET",
      success: res => resolve(res)
    })
  })
}
// request get 请求
const getData = (url) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: 'GET',
      success (res) {
        console.log(res)
        resolve(res.data)
      },
      fail (err) {
        console.log(err)
        reject(err)
      }
    })
  })
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const formatDate = timeStamp => {
  const date= new Date(timeStamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${[year, month, day].map(formatNumber).join('/')}`
}
// 我把这个函数放在了utils.js中，这样在需要时可以直接引入
module.exports ={requestPromise,getData,formatDate}