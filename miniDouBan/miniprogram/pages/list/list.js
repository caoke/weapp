//list.js
// 获取全局应用程序实例对象

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    type: '',
    page: 1,
    size: 8,
    subtitle: '加载中...'
  },
  // 获取更多数据
  loadMore() {
    wx.showLoading({
      title: '拼命加载中',
    })
    this.setData({ subtitle: '加载中...' })
    return app.douban.find(this.data.type, this.data.page++, this.data.size).then(res => {

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.title = options.title || this.data.title

    // 类型： in_theaters  coming_soon  us_box
    this.data.type = options.type || this.data.type

    this.loadMore()

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