const { putReq } = require("../../service/http")

// pages/personalInfoEditor/personalInfoEditor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '编辑个人信息',
    })
    this.setData({
      myInfo:wx.getStorageSync('myInfo')
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
   * 提交修改
   */
  release: function(){
    var id = this.data.myInfo.id
    var info = this.data.myInfo
    delete info.avatar
    putReq("/users/"+id+'/', this.data.myInfo,function(data){
      if(data == false) return
      wx.setStorage({
        data: data,
        key: 'myInfo',
      })
    })
    wx.navigateBack({
      delta: 1,
    })
  },

  onChange:function(event){
    var key = event.target.dataset.key
    var path = "myInfo." + key
    this.setData({
      [path] : event.detail
    })
  }
})