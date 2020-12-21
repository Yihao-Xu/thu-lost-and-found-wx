// pages/login/login.js
const {
  putReq
} = require('../../service/http')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 点击获取用户信息按钮
   */
  bindGetUserInfo: function (event) {
    var app = getApp()
    if (event.detail.userInfo) {
      app.globalData.userInfo = event.detail.userInfo
      wx.setStorage({
        data: event.detail.userInfo,
        key: 'userInfo',
      })
      var myInfo = wx.getStorageSync('myInfo')
      if (myInfo.wechat_avatar !== event.detail.userInfo.avatarUrl) {
        myInfo.wechat_avatar = event.detail.userInfo.avatarUrl
        if (myInfo.username == "微信用户") {
          myInfo.username = event.detail.userInfo.nickName
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
    }
    this.back()
  },

  /**
   * 进入清华学生认证
   */
  vertify: function (event) {
    var _this = this
    wx.navigateToMiniProgram({
      appId: 'wx1ebe3b2266f4afe0',
      path: 'pages/index/index',
      envVersion: 'trial',
      extraData: {
        origin: "miniapp",
        type: "id.tsinghua"
      },
      success: res =>{
        _this.back()
      }
    })
  },

  /**
   * 判断是否应该离开本页面
   */
  back: function(){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getStorage({
            key: 'myInfo',
            success: res =>{
              if(res.data.is_verified){
                wx.navigateBack({
                  delta: 1,
                })
              }
            }
          })
        }
      }
    })
  }
})