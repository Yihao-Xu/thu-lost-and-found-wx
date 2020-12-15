const { getReq } = require("../../../service/http")

// pages/notice/notice-list/notice-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chat_list:[
      {
        author:{
          wechat_avatar:null,
          id:0,
          username:'李祁'
        },
        sender: 0,
        messages:[
          {
            sender: 1,
            reciver: 2,
            message: "我累了，我不想写小程序了。",
            time:"12:32"
          }
        ],
        unread:0,
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var chat_list = this.data.chat_list
    wx.onSocketMessage((result) => {
      for(var i = 0; i < that.chat_list.length; i++){
        if(chat_list[i].sender == result.sender){
          var first_chat = that.chat_list[i]
          chat_list[i].messages.push(result)
          chat_list.splice(i, 1)
          chat_list.unshift(first_chat)
          that.setData({chat_list: chat_list})
          return
        }
      }
      var new_chat = {}
      new_chat.message = [result]
      new_chat.sender = result.sender
      getReq('/users/' + result.sender + '/', function(data){
        new_chat.author = data
        chat_list.unshift(new_chat)
        that.setData({chat_list: chat_list})
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

  }
})