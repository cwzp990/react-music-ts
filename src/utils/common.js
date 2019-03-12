export const playMode = {
  sequence: 0,
  loop: 1,
  random: 2
}

// 深拷贝
export const deepCopy = function (val) {
  return JSON.parse(JSON.stringify(val))
}

// 时间戳转换成yyyy-mm-dd
export const fmtDate = function (obj){
  let date =  new Date(obj);
  let y = 1900+date.getYear();
  let m = "0"+(date.getMonth()+1);
  let d = "0"+date.getDate();
  return y +"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
}

// 时间戳转换成mm-ss
export const formatDuring = function (mss){
  let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = (mss % (1000 * 60)) / 1000;
  hours = hours < 10 ? ('0' + hours) : hours;
  minutes = minutes < 10 ? ('0' + minutes) : minutes;
  seconds = seconds < 10 && seconds >= 1 ? ('0' + seconds) : seconds;
  return hours === '00' ? '' : hours + " :" + minutes + " :" + seconds;
}

// 时间戳转换成当地时间 2019/3/5 下午4:19
export const toLocalTime = function (time) {
  return new Date(parseInt(time)).toLocaleString().replace(/:\d{1,2}$/,' ')
}

// 格式化歌单数据
export const toNormalizeList = function (list) {
  let arr = list.map((item, index) => {
    let singer = ''
    item.ar.forEach(i => {
      singer += i.name + '/'
    })
    singer = singer.slice(0, -1)
    return {
      index: index + 1,
      singer,
      title: item.name,
      album: item.al.name,
      picUrl: item.al.picUrl,
      key: item.id
    }
  })
  return arr
}
