const {
  getReq, uploadImage, postReq,putReq
} = require("../../service/http");

// pages/personalInfo/personalInfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    myInfo: {},
    sheet_show: false,
    sheet_actions: [{
      name: '更换头像'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    getReq('/users/me/', function (data) {
      wx.setStorageSync('myInfo', data)
      that.setData({
        myInfo: data
      })
    })
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
    var that = this
    var app = getApp()
    getReq('/users/me/', function (data) {
      wx.setStorageSync('myInfo', data)
      that.setData({
        myInfo: data
      })
    })
    if (app.globalData.unread !== 0) {
      wx.showTabBarRedDot({
        index: 2,
      })
    }
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

  //进入编辑资料页面的函数
  enterEditor: function (event) {
    wx.navigateTo({
      url: '/pages/personalInfoEditor/personalInfoEditor',
    })
  },

  //进入认证界面
  enterCertification: function (event) {
    wx.navigateToMiniProgram({
      appId: 'wx1ebe3b2266f4afe0',
      path: 'pages/index/index',
      envVersion: 'trial',
      extraData: {
        origin: "miniapp",
        type: "id.tsinghua"
      }
    })
  },

  /**
   * 扫描二维码
   */
  scanQRCode: function (event) {
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode'],
      success(res) {
        console.log(res)
        console.log(res.result)
      }
    })
  },

  /**
   * 用户打开下拉菜单
   */
  openSheet: function () {
    this.setData({
      sheet_show: true
    })
  },

  /**
   * 下拉菜单关闭
   */
  sheetClose: function () {
    this.setData({
      sheet_show: false
    })
  },

  /**
   * 选择下拉菜单项
   */
  sheetSelect: function (event) {
    switch (event.detail.name) {
      case '更换头像':
        this.changeAvatar()
        break
    }
  },

  /**
   * 用户更换头像
   */
  changeAvatar: function () {
    var _this = this
    var myInfo = _this.data.myInfo
    wx.chooseImage({
      count: 1,
      success: res =>{
        uploadImage('/users/upload-avatar/',res.tempFilePaths[0], {id:myInfo.id}, 'avatar.jpg', function(res){
          myInfo.wechat_avatar = JSON.parse(res.data).url[0]
          _this.setData({
            myInfo:myInfo
          })
          putReq('/users/' + myInfo.id + '/', myInfo, function (data) {
            wx.showToast({
              title: '头像更改成功',
            })
          })
        })
      }
    })
  }
})