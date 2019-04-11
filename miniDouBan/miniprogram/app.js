//app.js
/**
 * WeChat API 
 */
const wechat = require('./utils/wechat.js')
/**
 * BaiDu API
 */
const baidu = require('./utils/baidu.js')
/**
 * DouBan  API
 */
const douban = require('./utils/douban.js')


App({
  data: {
    name: 'miniDouban movie',
    version: '1.0.0',
    currentCity: '北京'
  },
  wechat: wechat,
  douban: douban,
  baidu: baidu,
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {}

    wechat
      .getLocation()
      .then(res => {
        const {latitude, longitude} = res
        return baidu.getCityName(latitude, longitude)
      })
      .then(city => {
        this.data.currentCity = city.replace('市', '')
        console.log(city)
      })
      .catch(err => {
        this.data.currentCity = 'beidjing'
        console.log(err)
      })
  }
})
