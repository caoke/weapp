// 获取天气信息
const URI = 'https://free-api.heweather.com/s6/weather'
// key
const KEY = 'e6cd3629da2e446aad352f34c447b097'
// 天气图标基地址
const COND_ICON_BASE_URL = "https://6465-demo-57510e-1257978613.tcb.qcloud.la/miniWeather/images/cond-white"
// 背景图片基地址
const BG_IMG_BASE_URL = "https://6465-demo-57510e-1257978613.tcb.qcloud.la/miniWeather/images/bg"
// 生活指数图片基地址
const LIFESTYLE_BASE_URL = 'https://6465-demo-57510e-1257978613.tcb.qcloud.la/miniWeather/images/lifestyle'

const fetch = require('./fetch.js')

 // 背景图片代码列表
  /**
     * sunny: 100 900
     * cloudy: 101 102 103
     * overcast: 104
     * windy: 200 202 203 204
     * calm: 201 901 999
     * storm: 205 206 207 208 209 210 211 212 213
     * rain: 300 302 305 309 399
     * hail: 304
     * moderate_rain: 306 314 315
     * heavy_rain: 301 303 307 308 310 311 312 316 317 318
     * freezing_rain: 313 404 405 406
     * light_snow: 400 408
     * moderate_snow: 401 407 409 499
     * heavy_snow: 402 403 409 410
     * dust: 503 504 507 508
     * haze: 500 501 502 509 510 511 512 513 514 515
     */
const bgImglist = [
  {
    type: 'calm',
    codes: [201, 901, 999],
    color: '#404e75'
  },
  {
    type: 'sunny',
    codes: [100, 900],
    color: '#7bc6ed'
  },
  {
    type: 'cloudy',
    codes: [101, 102, 103],
    color: '#4b97d3'
  },
  {
    type: 'overcast',
    codes: [104],
    color: '#92a4ae'
  },
  {
    type: 'windy',
    codes: [200, 202, 203, 204],
    color: '#679ad1'
  },
  {
    type: 'storm',
    codes: [205, 206, 207, 208, 209, 210, 211, 212, 213],
    color: '#43ccf0'
  },
  {
    type: 'rain',
    codes: [300, 302, 305, 309, 399],
    color: '#1186b1'
  },
  {
    type: 'hail',
    codes: [304],
    color: '#809fbe'
  },
  {
    type: 'moderate_rain',
    codes: [306, 314, 315],
    color: '#1865b7'
  },
  {
    type: 'heavy_rain',
    codes: [301, 303, 307, 308, 310, 311, 312, 316, 317, 318],
    color: '#7f95a2'
  },
  {
    type: 'freezing_rain',
    codes: [313, 404, 405, 406],
    color: '#2f81cd'
  },
  {
    type: 'light_snow',
    codes: [400, 408],
    color: '#5fbbe0'
  },
  {
    type: 'moderate_snow',
    codes: [401, 407, 409, 499],
    color: '#5cb4e4'
  },
  {
    type: 'heavy_snow',
    codes: [402, 403, 409, 410],
    color: '#5caceb'
  },
  {
    type: 'dust',
    codes: [503, 504, 507, 508],
    color: '#a59156'
  },
  {
    type: 'haze',
    codes: [500, 501, 502, 509, 510, 511, 512, 513, 514, 515],
    color: '#6b7e8c'
  }
]



/**
 * 抓取特定类型的天气数据
 * @param {String} type 类型 now forecast
 */
function find(type, params) {
  return fetch(URI, type, Object.assign({ key: KEY }, params)).then(res => res.data)
}
/**
 * 根据实时天气获取背景图片
 * @param {String} code 当前天气状况代码
 */
const getBgImage = (code) =>{
  let cur = bgImglist.find(item => {
    return item.codes.includes(parseInt(code))
  })
  let bgImg = BG_IMG_BASE_URL + (cur ? `/${cur.type}` : '/calm') + '.jpg'
  let bgInfo = {
    bgImage: bgImg,
    bgColor: cur ? cur.color : ''
  }
  return bgInfo
} 

module.exports = {
  find,
  getBgImage
}
