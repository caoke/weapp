
// 腾讯地图实例
const QQMapWX = require('../lib/qqmap-wx-jssdk.min')
// 腾讯地图开发key
const qqMapKey = 'X55BZ-O6OHG-NSRQA-IYLDW-4JCSO-AMFZU'

const qqMap = new QQMapWX({
    key: qqMapKey
})

// 逆地址 坐标->描述
const reverseGeocoder = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
        qqMap.reverseGeocoder({
            location: {
                latitude: latitude,
                longitude: longitude
            },
            success(res) {
                resolve(res.result)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

module.exports = {
    reverseGeocoder
}