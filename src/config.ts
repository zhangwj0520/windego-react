// export const host = 'https://mock.zhangweijie.info/mock/5e8318a175ca572be0b3c729'
let url
if (process.env.NODE_ENV === 'development') {
  url = 'http://localhost:7001'
} else {
  url = 'https:api.anguoinfo.com/zy'
}

export const host = url
// export const host = 'https:api.anguoinfo.com/zy'
export const iconfontUrl = '//at.alicdn.com/t/font_1721886_wis23dqacw.js'
