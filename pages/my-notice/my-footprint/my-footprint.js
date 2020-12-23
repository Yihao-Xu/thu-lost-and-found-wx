// pages/my-notice/my-footprint/my-footprint.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    my_found_footprint:[],
    my_lost_footprint:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    wx.setNavigationBarTitle({
      title: '我的足迹',
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
    wx.getStorage({
      key: 'my_found_footprint',
      success(res){
        _this.setData({
          my_found_footprint: res.data
        })
      }
    })
    wx.getStorage({
      key: 'my_lost_footprint',
      success(res){
        _this.setData({
          my_lost_footprint: res.data
        })
      }
    })

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