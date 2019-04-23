// pages/index/index.js
const app = getApp()
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
        boards:[
          { key: "now"},
          { key: 'forecast'},
          { key: 'hourly'},
          { key: 'lifestyle'}
        ]

    },
    /**
     * 获取天气信息
     */
  getWeather(latitude, longitude) {
      const location = `${longitude},${latitude}`
      const tasks = this.data.boards.map(board => {
        return app.heWeather.find(board.key, {location: location}).then(res => {
          board.data = res.HeWeather6[0]
          return board
        })
      })
      // 获取实时天气数据
      Promise.all(tasks).then(boards => {
        wx.hideLoading()
        this.setData({boards: boards})
        this.getBg()
      })
    },
    /**
     * 根据实时天气获取背景图
     */
    getBg() {
      let code = this.data.boards[0].data.now.cond_code
      this.setData({ bg: app.heWeather.getBgImage(code)})
    },
    /**
     * 获取问候语
     */
    getGreeting(){
      this.setData({ greeting: app.utils.getGreeting()})
    },
    /**
     * 获取位置描述
     */
    getAddress() {
      app.wechat.getLocation().then(res => {
        let { latitude, longitude } = res
        this.getWeather(latitude, longitude)
        return app.qqMap.reverseGeocoder(latitude, longitude)
      }).then(position => {
        this.setData({address: position.address})
      })
    },
    init() {
      this.getGreeting()
      this.getAddress()
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