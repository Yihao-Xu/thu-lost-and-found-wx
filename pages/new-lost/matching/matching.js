const {
  getReq
} = require("../../../service/http")

// pages/new-lost/matching/matching.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    min_matching_degree: 0.6,
    type: "lost_notice",
    id: 5,
    matching_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type:options.type,
      id: options.id
    })
    var _this = this
    getReq('/matching-entries/?' + this.data.type + '_id=' + this.data.id, function (res) {
      _this.setData({
        matching_list: res.results
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
   * 返回首页
   */
  back: function () {
    wx.navigateBack({
      delta: 10,
    })
  },

  /**
   * 进入展示的启事
   */
  enterNotice: function (event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/found-info/found-info?id=' + id,
    })
  }
})