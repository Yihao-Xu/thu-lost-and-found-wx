// pages/notice/notice-info/notice-info.js
const {
  onWsMessage,
  updateChatList,
  createChat,
  formatTime
} = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chat: {},
    myInfo: {},
    sender: {},
    message: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var sender = Number(options.sender)
    var app = getApp()

    var chat = app.globalData.chat_list.find(item => item.sender == sender)
    if (chat == undefined) {
      createChat(app.globalData.chat_list, null, sender, function (cl) {})
    }
    this.setData({
      chat: app.globalData.chat_list.find(item => item.sender == sender),
      sender: sender
    })
    this.pageScrollToBottom()


    wx.getStorage({
      key: 'myInfo',
      success(res) {
        _this.setData({
          myInfo: res.data
        })
      }
    })
    wx.onSocketMessage((result) => {
      onWsMessage(result.data, function (cl) {
        _this.setData({
          chat: cl.find(item => item.sender == _this.data.sender)
        })
        _this.pageScrollToBottom()
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
   * 用户发送信息
   */
  sendMessage: function (event) {
    var _this = this
    var app = getApp()
    var date = new Date()
    var data = {
      receiver: this.data.sender,
      message: this.data.message,
      time: formatTime(date)
    }
    wx.sendSocketMessage({
      data: JSON.stringify(data)
    })
    this.setData({
      message: ''
    })

    updateChatList(app.globalData.chat_list, data, this.data.sender, function (chat_list) {
      _this.setData({
        chat: app.globalData.chat_list.find(item => item.sender == _this.data.sender)
      })
      _this.pageScrollToBottom()
    })

  },

  /**
   * 滚动到页面最下端
   */
  pageScrollToBottom: function () {
    wx.createSelectorQuery().select('.box').boundingClientRect(function (rect) {
      wx.pageScrollTo({
        scrollTop: rect.bottom + 50000
      })
    }).exec()
  }

})