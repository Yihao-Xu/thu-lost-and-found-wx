// var rootDocument = 'xyh.iterator-traits.com'
var rootDocument = 'http://xyh.iterator-traits.com'

var header = {
  'Accept' : 'application/json',
  'content-type' : 'application/json',
  'Authorization' : null
}

function getReq(url, cb) {
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: rootDocument + url,
    method : 'GET',
    header: header,
    success :function (res){
      wx.hideLoading()
      return typeof cb == "function" && cb(res.data)
    },
    fail: function() {
      wx.hideLoading()
      wx.showModal({
        title : '网络错误',
        content : '网络出错，请刷新重试',
        showCancel : false
      })
      return typeof cb == "function" && cb(false)
    }

  })
}

function postReq(url, data, cb) {
  wx.showLoading({
    title: '加载中',
  })
    wx.request({
      url: rootDocment + url,
      header: header,
      data: data,
      method: 'POST',
      success: function (res) {
        wx.hideLoading();
        return typeof cb == "function" && cb(res.data)
      },
      fail: function () {
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        return typeof cb == "function" && cb(false)
      },
      complete: function (){
        wx.hideLoading()
      }
    })
 
}

module.exports = {
  getReq: getReq,
  postReq: postReq,
  header: header,
}