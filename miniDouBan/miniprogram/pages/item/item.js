let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    title: '',
    movie: {}
  },
  /**
   *获取缓存
   */
  getCache() {
    return new Promise((resole, reject) =>{
      app.wechat.getStorage('last_item_data_' + this.data.id)
        .then(cache => {
          let {movie, expires} = cache.data
          if(movie && expires >  Date.now()){
            resole(cache)
          }else {
            resole(null)
          }
        })
        .catch(e => {
            resole(null)
        })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    console.log(options)
    this.data.id = options.id || this.data.id
    this.getCache().then(cache => {
      if(cache) {
        wx.hideLoading()
        this.setData({ movie: cache.data.movie})
      }else {
        app.douban.findOne(options.id)
          .then(d => {
            if(!d.code){
              this.setData({ movie: d })
              // 存缓存
              app.wechat.setStorage('last_item_data_' + options.id, {
                movie: d,
                title: d.title,
                expires: Date.now() + 1 * 24 * 60 * 60 * 1000
              })
              wx.hideLoading()
            }
          })
          .catch(e => {
            this.setData({ title: '数据获取异常', movie: {} })
            console.log(e)
            wx.hideLoading()
          })
      }
    })
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