const { timeTrans, acronymTrans} = require("../../lib/lib")
const { getReq, deleteReq } = require("../../service/http")

// pages/found-info/found-info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    infoData:{
    },
    activeNames:"0",
    gallery_show:false,
    current_picture:1,
    myInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id=options.id
    wx.setNavigationBarTitle({
      title: '招领启事详情',
    })
    this.setData({
      myInfo:wx.getStorageSync('myInfo')
    })
    var that = this
    getReq('/found-notices/'+options.id,function(data){
      that.setData({
        infoData:data
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

  showPicture: function(e){
    console.log(this.data.infoData.images)
    wx.previewImage({
      current:e.currentUrl,
      urls: this.data.infoData.images,
    })
  },

  /**
   * 删除启事
   */
  delete:function(){
    deleteReq('/found-notices/'+this.data.infoData.id+'/', function(data){
      wx.showToast({
        title: '删除成功',
        icon:'success',
        duration: 1500
      })
      wx.navigateBack({
        delta: 1,
      })
    })
  },

  /**
   * 编辑启事
   */
  edit: function(){
    wx.setStorageSync('cur-found-notice', this.data.infoData)
    // 将启事详情存入localstorage
    wx.setStorageSync('cur-notices', this.data.infoData)
    wx.navigateTo({
      url: '/pages/edit-found/attribute/attribute?type=' + this.data.infoData.property.template,
    })
  }
})