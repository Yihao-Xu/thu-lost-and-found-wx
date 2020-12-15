//这里放置一些工具函数

/**
 * 将标准时间转换为 yyyy-mm-dd hh:mm 的格式
 */
function timeTransform(time) {
  var res = ""
  res += time.split('T')[0]
  res += " "
  var t = time.split('T')[1].split('Z')[0].split('.')[0].split(':')
  res += t[0] + ":" + t[1]
  return res
}

function acronymTransform(status) {
  switch (status) {
    case 'RET':
      return "已归还"
    case "OPN":
      return "发布中"
    case "CLS":
      return "已关闭"
    case "DFT":
      return "未发布"
    case "PHN":
      return "手机"
    case "WX":
      return "微信"
    case "EML":
      return "邮箱"
  }
}

function createQrCode(page, scene) {
  var that = this
  wx.request({
    url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET',
    data: {
      grant_type: 'client_credential',
      appid: 'wx37691919cf7de37e',
      secret: 'fec1b42d4142060c21bee3ee60a9e5a7'
    },
    method: 'GET',
    success(res) {
      wx.request({
        url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + res.data.access_token,
        method: 'POST',
        data: {
          page:page,
          width: 430,
          scene: scene
        },
        responseType: 'arraybuffer',
        header: {
          'content-type': 'application/json;charset=utf-8'
        },
        success(res){
          var bin64 = wx.arrayBufferToBase64(res.data)
          return bin64
        }
      })
    }
  })
  return false;
}

module.exports = {
  timeTrans: timeTransform,
  acronymTrans: acronymTransform,
  createQrCode: createQrCode
}