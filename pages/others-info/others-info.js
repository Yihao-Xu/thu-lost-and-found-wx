// pages/others-info/others-info.js
const{getReq} = require('../../service/http')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    others_info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var id = options.id
    getReq('/users/'+id+'/', function (data) {
      if(!data.email_visible&&data.email!==''&&data.email!==null){
        data.email = '***********'
      }
      if(!data.phone_visible&&data.phone!==''&&data.phone!=null){
        data.phone='**********'
      }
      if(!data.wechat_visible&&data.wechat_id!==''&&data.wechat_id!=null){
        data.wechat_id='**********'
      }
      _this.setData({
        others_info: data
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