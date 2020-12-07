//app.js
const {
  login,
  header,
  getReq,
  postReq,
  putReq
} = require('./service/http')

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    var that = this
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        login({
          code: res.code
        }, function (data) {
          wx.showToast({
            title: '登陆成功',
          })
          that.globalData.access = data.access
          header.Authorization = "Bearer " + data.access
          // console.log(header.Authorization)
          getReq('/users/me/', function (data) {
            wx.setStorageSync('myInfo', data)
          })
          // 获取用户信息
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  success: res => {
                    // 可以将 res 发送给后台解码出 unionId
                    that.globalData.userInfo = res.userInfo
                    var myInfo = wx.getStorageSync('myInfo')
                    if (myInfo.username !== res.userInfo.nickName) {
                      // myInfo.avatar = res.userInfo.avatarUrl
                      myInfo.username = res.userInfo.nickName
                      wx.setStorage({
                        data: myInfo,
                        key: 'myInfo',
                      })
                      putReq('/users/' + myInfo.id + '/', myInfo, function (data) {
                        wx.showToast({
                          title: '信息初始化成功',
                        })
                      })
                    }
                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                    if (that.userInfoReadyCallback) {
                      that.userInfoReadyCallback(res)
                    }
                  }
                })
              }
            }
          })
        })

      }
    })

  },
  globalData: {
    userInfo: null,
    myInfo: {
      ID: "1",
      wx: "yihao_xu",
      qq: "89035689",
      email: "yihao_xu@126.com",
      mobile: "18611362038",
      hasCertification: false
    },
    access: ""
  }
})