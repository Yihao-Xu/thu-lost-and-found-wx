const {
  getReq
} = require("../../../service/http")

const {
  onWsMessage,
  clearUnread,
  addUnread
} = require('../../../utils/util')

// pages/notice/notice-list/notice-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chat_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var app = getApp()
    this.setData({
      chat_list: app.globalData.chat_list
    })
    wx.onSocketMessage((result) => {
      onWsMessage(result.data, function (cl) {
        addUnread(-1, result.data)
        _this.setData({
          chat_list: cl
        })
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
    var _this = this
    wx.onSocketMessage((result) => {
      onWsMessage(result.data, function (cl) {
        addUnread(-1, result.data)
        _this.setData({
          chat_list: cl
        })
      })
    })
    var app = getApp()
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

  /**
   * 进入聊天详情页面
   */
  enterInfo: function (event) {
    var sender = event.currentTarget.dataset.sender
    clearUnread(sender)
    wx.navigateTo({
      url: '/pages/notice/notice-info/notice-info?sender=' + sender,
    })
  }
})