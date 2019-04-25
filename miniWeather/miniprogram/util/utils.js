const getGreeting = () => {
  let h = new Date().getHours()
  let w = ''
  if( 5 <= h && h <= 10 ){
    w = "早上"
  } else if(11 <= h && h <= 13 ) {
    w = '中午'
  }else if( 14 <= h && h <= 18 ) {
    w = '下午'
  } else if( 19<= h && h <= 23 ){
    w = '晚上'
  }else if( 0 <= h && h <= 4) {
    w = '凌晨'
  }
  return `${w}好`
}
const getWeekday = () => {
  let w = new Date().getDay()
  let arr = ['日','一', '二', '三', '四', '五', '六']
  return `星期${arr[w]}`
}

module.exports = {
  getGreeting,
  getWeekday
}