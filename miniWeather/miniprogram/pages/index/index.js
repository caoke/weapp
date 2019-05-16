// pages/index/index.js
const app = getApp()
// 为了用`async await`
const regeneratorRuntime = require('../../lib/regenerator.js')
// const runtime = require('../../lib/runtime.js')

// 天气图标基地址 https://cdn.heweather.com/cond_icon/100.png
// const COND_ICON_BASE_URL = app.heWeather.COND_ICON_BASE_URL


Page({
  /**
   * 页面的初始数据
   */
  data: {
    bg: '', // 背景图
    // 经纬度
    latitude: '',
    longitude: '',
    // 地理信息地址
    address: '',
    // 问候语
    greeting: '',
    weekday: '',

    weather: {
      now: "",
      forecast: "",
      hourly: "",
      lifestyle: ""
    },
    nowWeather: { // 实时天气数据
      tmp: 'N/A', // 温度
      tmpMax: '', // 最高气温
      tmpMin: "", // 最低气温
      condIcon: '',
      condTxt: '', // 天气状况
      windDir: '', // 风向
      windSc: '', // 风力
      windSpd: '', // 风速
      pres: '', // 大气压
      hum: '', // 湿度
      pcpn: '', // 降水量
      loc: '' // 当地时间
    },

    hourlyWeather: [
      {
        tmp: '', // 温度
        time: '', // 时间
        condIcon: '' // 天气图标
      }
    ], // 逐小时天气数据

    forecastWeather: [
      {
        weekday: '',
        condIcon: '',
        maxTmp: '',
        minTmp: ''
      }
    ], //未来7天天气数据

    days: ['今天', '明天', '后天'],

    dailyWeather: [], // 逐日天气数据

    lifestyle: [] // 生活指数

  },
 

  
  
  init() {
    // 问候语
    this.setData({ greeting: app.utils.getGreeting() })
    // 获取星期几
    this.setData({ weekday: app.utils.getWeekday() })
    // 初始化天气数据
    this.initWeather()
  },

  // 获取当前时间
  
 
  async initWeather() {
    // 获取地址信息
    await this.getLocation()
    // 获取天气信息
    await this.getWeather()
  },
  /**
   * 获取地理经纬度
   */
  async getLocation() {
    await app.wechat.getLocation()
      .then(res => {
        let { latitude, longitude } = res
        this.setData({
          latitude: latitude,
          longitude: longitude
        })
        return app.qqMap.reverseGeocoder(latitude, longitude)
      }).then(position => {
        this.setData({ address: position.address })
      })
      .catch((err) => {
        console.log(err)
      })
  },

  /**
   * 获取天气信息
   */
  getWeather() {
    const location = `${this.data.longitude},${this.data.latitude}`
    const tasks = Object.keys(this.data.weather).map(w => {
      return app.heWeather.find(w, { location: location }).then(res => {
        this.data.weather[w] = res.HeWeather6[0]
      })
    })
    // 获取天气数据
    Promise.all(tasks).then(res => {
      wx.hideLoading()
      this.setData({ weather: this.data.weather })
      // 根据实时数据 获取背景图
      this.getBg()
      // 格式化实时天气数据
      this.formatNow()
      // 格式化hourly格式
      this.formatHourly()
      // 格式化未来7天天气数据
      this.formatForecast()
      // 格式化生活指数
      this.formatLifeStyle()
    })

  },
  /**
   * 根据实时天气获取背景图
   */
  getBg() {
    let code = this.data.weather.now.now.cond_code
    let { bgImage, bgColor } = app.heWeather.getBgImage(code)
    this.setData({ bg: bgImage })
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

  /**
  * 格式化实时天气
  */
  formatNow() {
    let data = this.data.weather.now
    this.setData({
      nowWeather: { // 实时天气数据
        tmp: data.now.tmp, // 温度
        tmpMax: this.data.weather.forecast.daily_forecast[0].tmp_max,
        tmpMin: this.data.weather.forecast.daily_forecast[0].tmp_min,
        condIcon: app.heWeather.getIcon(data.now.cond_code), // 天气状况图标
        condTxt: data.now.cond_txt, // 天气状况
        windDir: data.now.wind_dir, // 风向
        windSc: data.now.wind_sc, // 风力
        windSpd: data.now.wind_spd, // 风速
        pres: data.now.pres, // 大气压
        hum: data.now.hum, // 湿度
        pcpn: data.now.pcpn, // 降水量
        loc: data.update.loc // 当地时间
      },
    })
  },
  /**
   * 格式化逐小时
   */
  formatHourly() {
    this.setData({ hourlyWeather: this.data.weather.hourly.hourly })
    let data = this.data.weather.hourly.hourly
    let arr = data.map(item => {
      return {
        tmp: item.tmp,
        timeTxt: this.getTimeTxt(item.time),
        condIcon: app.heWeather.getIcon(item.cond_code)
      }
    })
    arr.unshift({
      tmp: this.data.weather.now.now.tmp,
      timeTxt: '现在',
      condIcon: app.heWeather.getIcon(this.data.weather.now.now.cond_code)
    })
    this.setData({hourlyWeather: arr})

  },
  getTimeTxt(time) {
    let reg = /\d\d:/
    let txt = time.match(reg)
    if(txt) txt = txt[0].replace(':', "")
    return `${txt}时`
  },

  /**
   * 格式化未来7天的数据
   */
  formatForecast() {
    let data = this.data.weather.forecast.daily_forecast
    let arr = data.map(item => {
      return {
        weekday: app.utils.getWeekday(item.date),
        condIcon: app.heWeather.getIcon(item.cond_code_d),
        maxTmp: item.tmp_max,
        minTmp: item.tmp_min
      }
    })
    this.setData({forecastWeather: arr})
  },
  /**
   * 格式化生活指数
   */
  formatLifeStyle() {
    let data = this.data.weather.lifestyle.lifestyle
    let arr  = data.map(item => {
      return {
        iconSrc: app.heWeather.lifestyleImgList[item.type].src,
        title: app.heWeather.lifestyleImgList[item.type].txt,
        brf: item.brf,
        txt: item.txt
      }
    })
    this.setData({ lifestyle: arr })
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