// pages/notice/notice-info/notice-info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputFocus:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.pageScrollToBottom()
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
   * 滚动到页面最下端
   */
  pageScrollToBottom: function(){
    wx.createSelectorQuery().select('.box').boundingClientRect(function(rect){
      wx.pageScrollTo({
        scrollTop:rect.bottom
      })
    }).exec()
  }

})