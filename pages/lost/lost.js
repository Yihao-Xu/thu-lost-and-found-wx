// pages/lost/lost.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testData:{
      avatar:"/image/avatar-1.jpg",
      username:"徐亦豪",
      release_time:"今天11:02",
      content:"今天咱丢失了一部苹果手机嗷",
      image1:"/image/ip12-1.jpg",
      image2:"/image/ip12-2.jpg",
      image3:"/image/ip12-3.jpg",
      object_name:"iPhone12 Pro",
      location:"六教602",
      found_time:"10月31日下午",
      tags:["蓝色","没有手机壳"]
    },
    search_value:"",//搜索框的内容
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
   * 用户进行搜索
   */
  onSearch: function(){
  },

    /**
   * 用户对搜索框内容进行取消
   */
  onCancel: function(){
    this.setData({
      search_value:"",
    })
  },
  
  new_lost:function(){
    wx.navigateTo({
      url: '/pages/new-lost/new-lost',
    })
  }
})