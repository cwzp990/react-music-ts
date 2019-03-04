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
  var date =  new Date(obj);
  var y = 1900+date.getYear();
  var m = "0"+(date.getMonth()+1);
  var d = "0"+date.getDate();
  return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
}