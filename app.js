//app.js
const {
  login,
  header,
  getReq,
  postReq,
  putReq
} = require('./service/http')

const {
  onWsMessage
} = require('./utils/util')

App({
  onShow: function (options) {
    /* 发送认证信息 */
    console.log(options.referrerInfo.extraData)
    var myInfo = wx.getStorageSync('myInfo')
    if (options.referrerInfo.extraData != undefined) {
      postReq('/users/' + myInfo.id + '/wechat_thu_auth/', options.referrerInfo.extraData, function (res) {})
    }
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getStorage({
      key: 'chat_list',
      fail(res){
        wx.setStorage({
          data: [],
          key: 'chat_list',
        })
      }
    })


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
            that.globalData.myInfo = data

            //连接webSocket
            wx.connectSocket({
              url: 'wss://xyh.iterator-traits.com/ws/chat/' + that.globalData.myInfo.id + '/',
              success(res) {
                console.log('websocket connect success!')
                wx.onSocketMessage((result) => {
                  console.log(result)
                })
              },
            })
            wx.onSocketMessage((result) => {
              onWsMessage(result.data,function (chat_list) {})
            })
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
                    if (myInfo.username !== res.userInfo.nickName || myInfo.wechat_avatar !== res.userInfo.avatarUrl) {
                      myInfo.wechat_avatar = res.userInfo.avatarUrl
                      myInfo.username = res.userInfo.nickName
                      wx.setStorage({
                        data: myInfo,
                        key: 'myInfo',
                      })
                      putReq('/users/' + myInfo.id + '/', myInfo, function (data) {
                        wx.showToast({
                          title: '信息更改成功',
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
              } else {
                console.log('get user info failed')
              }
            },
            fail: res => {}
          })
          console.log("finished!")
        })

      }
    })

  },

  globalData: {
    userInfo: null,
    myInfo: {},
    access: "",
  }
})