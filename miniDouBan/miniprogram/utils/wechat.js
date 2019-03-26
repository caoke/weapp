// wechat.js
const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: resolve,
      fail: reject
    })
  })
}

const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: resolve,
      fail: reject
    })
  })
}

const setStorage = (key, value) => {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key: key,
      data: value,
      success: resolve,
      fail: reject
    })
  })
}

const getStorage = (key) => {
  return new Promise ((resolve,reject) => {
    wx.getStorage({
      key: key,
      success: resolve,
      fail: reject
    })
  })
}
/**
 * 
 */
const getLocation =(type) => {
  return new Promise((resolve, reject) =>{
    wx.getLocation({
      type: type,
      altitude:true,
      success: resolve,
      fail: reject
    })
  })
}



module.exports = {
  login,
  getUserInfo,
  setStorage,
  getStorage,
  getLocation
}