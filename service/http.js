// var rootDocument = 'xyh.iterator-traits.com'
var rootDocument = 'https://xyh.iterator-traits.com/api/v1'
// var rootDocument = 'http://192.168.0.103:8000'
// var app = getApp()
var header = {
  "Authorization": null
}

function getReq(url, cb) {
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: rootDocument + url,
    method: 'GET',
    header: header,
    success: function (res) {
      wx.hideLoading()
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      wx.hideLoading()
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
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
    method: 'POST',
    header: header,
    data: data,
    success: function (res) {
      console.log(data)
      console.log(res.data)
      if (res.statusCode >= 200 && res.statusCode < 300) { //成功
        wx.hideLoading()
        return typeof cb == "function" && cb(res.data)
      } else {
        wx.showModal({
          title: "请求错误",
          content: JSON.stringify(res.data),
          showCancel: false
        })
        wx.hideLoading()
      }

    },
    fail: function () {
      wx.hideLoading()
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      return typeof cb == "function" && cb(false)
    }
  })
}

function login(data, cb) {
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: rootDocument + '/auth/wechat/token/',
    method: 'POST',
    header: {},
    data: data,
    success: function (res) {
      console.log(data)
      console.log(res.data)
      if (res.statusCode >= 200 && res.statusCode < 300) { //成功
        wx.hideLoading()
        return typeof cb == "function" && cb(res.data)
      } else {
        wx.showModal({
          title: "请求错误",
          content: JSON.stringify(res.data),
          showCancel: false
        })
        wx.hideLoading()
      }


    },
    fail: function () {
      wx.hideLoading()
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
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
    method: 'PUT',
    header: header,
    data: data,
    success: function (res) {
      console.log(data)
      console.log(res.data)
      if (res.statusCode >= 200 && res.statusCode < 300) { //成功
        wx.hideLoading()
        return typeof cb == "function" && cb(res.data)
      } else {
        wx.showModal({
          title: "请求错误",
          content: JSON.stringify(res.data),
          showCancel: false
        })
        wx.hideLoading()
      }
    },
    fail: function () {
      wx.hideLoading()
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      return typeof cb == "function" && cb(false)
    }
  })
}

function deleteReq(url, cb) {
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: rootDocument + url,
    method: 'DELETE',
    header: header,
    success: function (res) {
      wx.hideLoading()
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      wx.hideLoading()
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      return typeof cb == "function" && cb(false)
    }
  })
}

function uploadImage(url, filePath, data, name, cb) {
  wx.showLoading({
    title: '上传图片中',
  })
  wx.uploadFile({
    filePath: filePath,
    name: name,
    formData: data,
    header: header,
    url: rootDocument + url,
    success(res) {
      wx.showToast({
        title: '上传成功',
        icon: 'success',
        duration: 1500
      })
      cb(res)
    },
    fail(res) {
      wx.showToast({
        title: '上传失败',
        icon: 'error',
        duration: 1500
      })
    }

  })
  wx.hideLoading()
}
module.exports = {
  getReq: getReq,
  postReq: postReq,
  putReq: putReq,
  header: header,
  deleteReq: deleteReq,
  uploadImage: uploadImage,
  login: login
}