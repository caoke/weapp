const URI = 'https://free-api.heweather.com/s6/weather'
const fetch = require('./fetch.js')


/**
 * 抓取特定类型的天气数据
 * @param {String} type 类型 
 */
function find(type) {
  return fetch(URI, type).then(res => {res.data})
}

module.exports = {
  find
}
