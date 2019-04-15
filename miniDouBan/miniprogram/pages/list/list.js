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
    movies: [],
    hasMore: true,
    subtitle: '加载中...'
  },
  /**
   * 查缓存
   */
  getCache() {
    return new Promise((resolve, reject) => {
      app.wechat.getStorage('last_list_data_' + this.data.type)
        .then(res => {
          const { movies, expires, title } = res.data

          if (movies.length && expires > Date.now()) {
            return resolve(res.data)
          }
          // 缓存过期
          console.log('uncached boards')
          return resolve(null)
        })
        .catch(e => resolve(null))
    })
  },
  // 获取更多数据
  loadMore() {
    wx.showLoading({
      title: '拼命加载中',
    })
    this.setData({ subtitle: '加载中...' })
    return app.douban.find(this.data.type, this.data.page++, this.data.size).then(res => {
      if (res.subjects && res.subjects.length) {
        if(res.subjects.length){
          this.setData({ movies: this.data.movies.concat(res.subjects), subtitle: res.title })
        }else {
          this.setData({ subtitle: res.title, hasMore: false })
        }
        
      } else {
        
      }

      
      // 存缓存
      app.wechat.setStorage('last_list_data_' + this.data.type, {
        movies: this.data.movies.concat(res.subjects),
        title: res.title,
        total: res.total,
        expires: Date.now() + 1 * 24 * 60 * 60 * 1000
      })
      wx.hideLoading()
    })
    .catch(e => {
      this.setData({ subtitle: '获取数据异常' })
      console.error(e)
      wx.hideLoading()
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.title = options.title || this.data.title

    // 类型： in_theaters  coming_soon  us_box
    this.data.type = options.type || this.data.type

    this.getCache().then(cache => {
      if (cache) {
        this.data.page = Math.floor(cache.movies.length / this.data.size)

        return this.setData({ movies: cache.movies, subtitle: cache.title, hasMore: cache.movies.length != cache.total })
      }
      this.loadMore()
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
    if (hasMore){
      this.loadMore()
        .then(() => wx.stopPullDownRefresh())
    }
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMore) {
      this.loadMore()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})