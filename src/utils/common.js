import { getToken } from './cookie'

export const playMode = {
  sequence: 1, // 顺序
  loop: 2, // 循环
  random: 3 // 随机
}

// 获取用户信息
export const getUserInfo = () => {
  return getToken('userInfo')
}

// 深拷贝
export const deepCopy = val => {
  return JSON.parse(JSON.stringify(val))
}

// 时间戳转换成yyyy-mm-dd
export const fmtDate = obj => {
  let date = new Date(obj)
  let y = 1900 + date.getYear()
  let m = '0' + (date.getMonth() + 1)
  let d = '0' + date.getDate()
  return (
    y +
    '-' +
    m.substring(m.length - 2, m.length) +
    '-' +
    d.substring(d.length - 2, d.length)
  )
}

// 时间戳转换成mm-ss
export const formatDuring = mss => {
  // let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
  let seconds = parseInt((mss % (1000 * 60)) / 1000)
  // hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 && seconds >= 1 ? '0' + seconds : seconds
  return minutes + ':' + seconds
}

// 时间戳转换成当地时间 2019/3/5 下午4:19
export const toLocalTime = time => {
  return new Date(parseInt(time)).toLocaleString().replace(/:\d{1,2}$/, ' ')
}

// 秒数转换为mm:ss
export const formatTime = interval => {
  interval = interval | 0
  const minute = String(interval / 60 | 0).padStart(2, '0')
  const second = String(interval % 60).padStart(2, '0')
  return `${minute}:${second}`
}

// 格式化歌单数据
export const toNormalizeList = list => {
  let arr = list.map((item, index) => {
    let singer = ''
    item.ar.forEach(i => {
      singer += i.name + '/'
    })
    singer = singer.slice(0, -1)
    return {
      index: index + 1,
      duration: item.dt,
      singer,
      title: item.name,
      album: item.al.name,
      picUrl: item.al.picUrl,
      key: item.id
    }
  })
  return arr
}

//歌词解析
export function parseLyric(lrc) {
  let lyrics = lrc.split('\n')
  let lrcObj = []
  for (let i = 0; i < lyrics.length; i++) {
    let lyric = decodeURIComponent(lyrics[i])
    let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g
    let timeRegExpArr = lyric.match(timeReg)
    if (!timeRegExpArr) continue
    let clause = lyric.replace(timeReg, '')
    for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
      let t = timeRegExpArr[k]
      let min = Number(String(t.match(/\[\d*/i)).slice(1)),
        sec = Number(String(t.match(/\:\d*/i)).slice(1))
      let time = min * 60 + sec
      if (clause !== '') {
        lrcObj.push({ time: time, txt: clause })
      }
    }
  }
  return lrcObj
}

// 查找数组序号
export const findIndex = (list, item) => {
  return list.findIndex(item => {
    return item.id === item.id
  })
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
