//这里放置一些工具函数

/**
 * 将标准时间转换为 yyyy-mm-dd hh:mm 的格式
 */
function timeTransform(time){
  var res = ""
  res+=time.split('T')[0]
  res+=" "
  var t=time.split('T')[1].split('Z')[0].split('.')[0].split(':')
  res+=t[0]+":"+t[1]
  return res
}
function acronymTransform(status){
  switch (status){
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



module.exports = {
  timeTrans :timeTransform,
  acronymTrans : acronymTransform
}