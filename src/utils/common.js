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