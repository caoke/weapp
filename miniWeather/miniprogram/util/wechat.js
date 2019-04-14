/**
 * 获取地理位置
 */
const getLocation = (type) => {
    return new Promise((resolve, reject) => {
        wx.getLocation({
            type: type,
            altitude: true,
            success: resolve,
            fail: reject
        })
    })
}

module.exports = {
    getLocation
}