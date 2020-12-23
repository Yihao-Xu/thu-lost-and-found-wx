//app.js
const {
  login,
  header,
  getReq,
  postReq,
  putReq
} = require('./service/http')

const {
  onWsMessage,
  addUnread
} = require('./utils/util')

App({
  onShow: function (options) {
    if (options.scene === 1154) {
      return
    }
    /* 发送清华认证信息 */
    console.log(options.referrerInfo.extraData)
    var myInfo = wx.getStorageSync('myInfo')
    if (options.referrerInfo.extraData != undefined) {
      postReq('/users/' + myInfo.id + '/wechat_thu_auth/', options.referrerInfo.extraData, function (res) {})
      getReq('/users/me/', function (data) {
        wx.setStorageSync('myInfo', data)
        that.globalData.myInfo = data
      })
    }
    if (this.globalData.unread !== 0) {
      wx.showTabBarRedDot({
        index: 2,
      })
    }
  },

  onLaunch: function (event) {
    console.log(event.scene)
    if (event.scene === 1154) {
      this.globalData.scene = event.scene
      return
    }

    // 展示本地存储能力
    var _this = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getStorage({
      key: 'chat_list',
      success(res) {
        _this.globalData.chat_list = res.data
      },
      fail(res) {
        wx.setStorage({
          data: [],
          key: 'chat_list',
        })
      }
    })
    wx.getStorage({
      key: 'unread',
      success(res) {
        _this.globalData.unread = res.data
        if (res.data !== 0) {
          wx.showTabBarRedDot({
            index: 2,
          })
        }
      },
      fail() {
        wx.setStorage({
          data: 0,
          key: 'unread',
        })
        _this.globalData.unread = 0
      }
    })
    wx.getStorage({
      key:"my_found_footprint",
      fail(){
        wx.setStorage({
          data: [],
          key: 'my_found_footprint',
        })
      }
    })
    wx.getStorage({
      key:"my_lost_footprint",
      fail(){
        wx.setStorage({
          data: [],
          key: 'my_lost_footprint',
        })
      }
    })
    wx.getStorage({
      key:"my_found_collection",
      fail(){
        wx.setStorage({
          data: [],
          key: 'my_found_collection',
        })
      }
    })
    wx.getStorage({
      key:"my_lost_collection",
      fail(){
        wx.setStorage({
          data: [],
          key: 'my_lost_collection',
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
          // wx.showToast({
          //   title: '登陆成功',
          // })
          that.globalData.access = data.access
          header.Authorization = "Bearer " + data.access
          // console.log(header.Authorization)
          getReq('/users/me/', function (data) {
            wx.setStorageSync('myInfo', data)
            that.globalData.myInfo = data

            if (!data.is_active||data.status === 'SUS') {
              wx.redirectTo({
                url: '/pages/banned/banned?id=' + data.id,
              })
            }

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
              onWsMessage(result.data, function (chat_list) {
                addUnread(-1, result.data)
              })

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
                    if (myInfo.wechat_avatar === null || myInfo.wechat_avatar === '') {
                      myInfo.wechat_avatar = res.userInfo.avatarUrl
                      if (myInfo.username == "微信用户") {
                        myInfo.username = res.userInfo.nickName
                      }
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
    chat_list: [],
    unread: 0,
    scene: 0
  },
})