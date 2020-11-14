// pages/new-found/attribute/attribute.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kind:"",
    template:{
      '姓名':'',
      '院系':'',
      '卡号':'',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      kind:options.kind
    })
    wx.setNavigationBarTitle({
      title: '填写'+this.data.kind+'特征',
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
   * 上交填写的内容，并进入丢失详情页面
   */
  enterNext:function(){
    // 将填写的内容存入localstorage
    // TODO
    wx.navigateTo({
      url: '/pages/new-found/details/details',
    })
  }
})