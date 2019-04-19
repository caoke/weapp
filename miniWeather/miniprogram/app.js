//app.js
/**
 * wechat API
 */
const wechat = require('./util/wechat.js')

/**
 * qqMap API
 */
const qqMap = require('./util/qqMap.js')

/**
 * heWeather API
 */
const heWeather = require('./util/heWeather.js')

/**
 * utils
 */
const utils = require('./util/utils.js')

App({
  data: {
    address: '',
    version: '1.0.0',
    currentCity: '北京'
  },
  wechat: wechat,
  qqMap: qqMap,
  heWeather: heWeather,
  utils: utils,
  globalData: {
    latitude: '',
    longitude: ''
  },
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    // wechat.getLocation().then(res => {
    //     let {latitude, longitude} = res
    //     this.globalData.latitude = latitude
    //     this.globalData.longitude = longitude
    //     return qqMap.reverseGeocoder(latitude, longitude)
    // }).then(position => {
    //   this.data.address = position.address
    // })
  }
})
