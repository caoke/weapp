// pages/index/index.js
const app = getApp()
// 为了用`async await`
// const regeneratorRuntime = app.regeneratorRuntime
const regeneratorRuntime = require('../../lib/regenerator.js')
// const regeneratorRuntime = require('../../lib/runtime.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bg: '',
    location: {
      latitude: '',
      longitude: ''
    },
    address: '',
    greeting: '',
    weather: {
      now: "",
      forecast: "",
      hourly: "",
      lifestyle: ""
    },
    nowWeather: { // 实时天气数据
      tmp: 'N/A', // 温度
      condTxt: '', // 天气状况
      windDir: '', // 风向
      windSc: '', // 风力
      windSpd: '', // 风速
      pres: '', // 大气压
      hum: '', // 湿度
      pcpn: '', // 降水量
      loc: '' // 当地时间
    },
    days: ['今天', '明天', '后天'],

    dailyWeather: [], // 逐日天气数据

    hourlyWeather: [], // 逐三小时天气数据

    lifestyle: [] // 生活指数

  },
  /**
   * 获取天气信息
   */
  getWeather(latitude, longitude) {
    const location = `${longitude},${latitude}`
    const tasks = Object.keys(this.data.weather).map(w => {
      return app.heWeather.find(w, { location: location }).then(res => {
        this.data.weather[w] = res.HeWeather6[0]
      })
    })
    // 获取实时天气数据
    Promise.all(tasks).then(res => {
      wx.hideLoading()
      this.setData({ weather: this.data.weather})
      this.getBg()
    })
  },
  /**
   * 获取实时天气情况
   */
  getNow() {
    return app.heWeather.find('now', { location: this.data.location }).then(res => {
      this.formatNow(res.HeWeather6[0])
    })
  },
  /**
   * 格式化实时天气
   */
  formatNow(data) {
    this.setData({
      nowWeather: { // 实时天气数据
        tmp: data.now.tmp, // 温度
        condTxt: data.now.cond_txt, // 天气状况
        windDir: data.now.wind_dir, // 风向
        windSc: data.now.wind_sc, // 风力
        windSpd: data.now.wind_spd, // 风速
        pres: data.now.pres, // 大气压
        hum: data.now.hum, // 湿度
        pcpn: data.now.pcpn, // 降水量
        loc: '' // 当地时间
      },
    })
  },

  /**
   * 根据实时天气获取背景图
   */
  getBg() {
    let code = this.data.weather.now.now.cond_code
    let {bgImage, bgColor} = app.heWeather.getBgImage(code)
    this.setData({ bg: bgImage})
    // 设置页面导航条颜色
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: bgColor,
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })

  },
  
  init() {
    // 问候语
    this.setData({ greeting: app.utils.getGreeting() })
    // 获取地理位置描述
    this.getAddress()
    // 初始化天气数据
    this.initWeather()
  },
  /**
   * 获取位置描述
   */
  getAddress() {
    app.wechat.getLocation().then(res => {
      let { latitude, longitude } = res

      this.setData({
        location: `${longitude},${latitude}`
      })
      // 获取地址文字描述
      return app.qqMap.reverseGeocoder(latitude, longitude)
    }).then(position => {
      this.setData({ address: position.address })
    })
  },

  /**
   *初始化天气数据
   */
  async initWeather() {
    await this.getNow()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.init()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})