const {
  getReq
} = require("../../../service/http")

// pages/notice/notice-list/notice-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chat_list: [{
      author: {
        wechat_avatar: '/image/avatar-liqi.jpg',
        id: 0,
        username: '李祁'
      },
      sender: 0,
      messages: [{
        sender: 1,
        reciver: 2,
        message: "我累了，我不想写小程序了。",
        time: "12:32"
      }],
      newest_message: {
        sender: 1,
        reciver: 2,
        message: "我累了，我不想写小程序了。",
        time: "12:32"
      },
      unread: 0,
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var chat_list = this.data.chat_list
    wx.onSocketMessage((result) => {
      var data_recv = JSON.parse(result.data)
      console.log(data_recv)
      for (var i = 0; i < chat_list.length; i++) {
        if (chat_list[i].sender == data_recv.sender) {
          var first_chat = chat_list[i]
          first_chat.messages.push(data_recv)
          first_chat.newest_message = data_recv
          chat_list.splice(i, 1)
          chat_list.unshift(first_chat)
          that.setData({
            chat_list: chat_list
          })
          return
        }
      }
      var new_chat = {}
      new_chat.message = [data_recv]
      new_chat.sender = data_recv.sender
      new_chat.newest_message = data_recv
      getReq('/users/' + data_recv.sender + '/', function (data) {
        new_chat.author = data
        chat_list.unshift(new_chat)
        that.setData({
          chat_list: chat_list
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
  enterInfo: function(event){
    wx.navigateTo({
      url: '/pages/notice/notice-info/notice-info',
    })
  }
})