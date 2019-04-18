// pages/index/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bg: '',
        address: '',
        greeting: ''

    },
    /**
     * 获取天气信息
     */
    getWeather() {
      // 获取实时天气数据
      
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