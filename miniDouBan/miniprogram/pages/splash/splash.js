// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: []
  },
  // 获取缓存的数据
  getCache() {
    return new Promise((resolve, reject) => {
      app.wechat.getStorage('last_splash_data')
      .then(res => {
        const { movies, expires } = res.data
        
        if(movies.length && expires > Date.now()){
          return resolve(res.data)
        }
        // 缓存过期
        console.log('uncached')
        return resolve(null)
      })
      .catch(e => resolve(null))
    })
  },

  handleStart() {
    // 切换页面
    wx.switchTab({
      url: '../board/board'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getCache()
      .then(cache => {
        console.log('cache:', cache)
        // 若有缓存 则直接使用缓存
        if(cache) {
          return this.setData({movies: cache.movies})
        }
        // 不存在 douban请求
        app.douban.find('coming_soon', 1, 3)
          .then(res => {
            console.log('find:', res)
            this.setData({ movies: res.subjects })
            // 存缓存
            app.wechat.setStorage('last_splash_data', {
              movies: res.subjects,
              expires: Date.now() + 1 * 24 * 60 * 60 * 1000
            })
          })
          .then(() => {console.log('storage last splash data')})
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