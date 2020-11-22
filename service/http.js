// var rootDocument = 'xyh.iterator-traits.com'
var rootDocument = 'http://xyh.iterator-traits.com'

var header = {
  'Authorization' : null,
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
    url: rootDocument + url,
    method : 'POST',
    header: header,
    data: data,
    success :function (res){
      console.log(data)
      console.log(res.data)
      if(res.statusCode >= 200 && res.statusCode < 300){//成功
        wx.hideLoading()
        return typeof cb == "function" && cb(res.data)
      }else{
        wx.showModal({
          title:"请求错误",
          content:JSON.stringify(res.data),
          showCancel:false
        })
        wx.hideLoading()
      }
      
      
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

function putReq(url, data, cb) {
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: rootDocument + url,
    method : 'PUT',
    header: header,
    data: data,
    success :function (res){
      console.log(data)
      console.log(res.data)
      if(res.statusCode >= 200 && res.statusCode < 300){//成功
        wx.hideLoading()
        return typeof cb == "function" && cb(res.data)
      }else{
        wx.showModal({
          title:"请求错误",
          content:JSON.stringify(res.data),
          showCancel:false
        })
        wx.hideLoading()
      }
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

module.exports = {
  getReq: getReq,
  postReq: postReq,
  header: header,
  putReq: putReq
}