// board.js

// 获取全局应用程序实例对象
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    boards: [
      { key: 'in_theaters' },
      { key: 'coming_soon' },
      { key: 'new_movies' },
      { key: 'top250' }
    ]
  },
  // 获取缓存的数据
  getCache() {
    return new Promise((resolve, reject) => {
      app.wechat.getStorage('last_boards_data')
        .then(res => {
          const { boards, expires } = res.data

          if (boards.length && expires > Date.now()) {
            return resolve(res.data)
          }
          // 缓存过期
          console.log('uncached boards')
          return resolve(null)
        })
        .catch(e => resolve(null))
    })
  },
  // 获取最新的数据
  getLastData() {
    // 获取所有的数据
    const tasks = this.data.boards.map(board => {
      return app.douban.find(board.key, 1, 8).then((res) => {
        board.title = res.title
        board.movies = res.subjects
        return board
      })
    })

    Promise.all(tasks).then(boards => {
      console.log(boards)
      this.setData({ boards: boards })
      // 存缓存
      app.wechat.setStorage('last_boards_data', {
        boards: boards,
        expires: Date.now() + 1 * 24 * 60 * 60 * 1000
      })
      wx.hideLoading()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: '拼命加载中...' })
    this.getCache().then((cache) => {
      // 若有缓存 则直接使用缓存
      if (cache) {
        wx.hideLoading()
        return this.setData({ boards: cache.boards })
      }
      // 不存在缓存则去查询
      this.getLastData()
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