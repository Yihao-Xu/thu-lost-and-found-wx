// pages/lost/lost.js
const { getReq } = require("../../../service/http")
const { enterVerifiedPage } = require("../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lostList:[],
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
    wx.setNavigationBarTitle({
      title: '我的寻物启事',
    })
    var that = this
    var app = getApp()
    getReq('/lost-notices/?author__id=' + app.globalData.myInfo.id + '&search=' + this.data.search_value,function(data){
      that.setData({
        lostList:data.results,
        next:data.next
      })
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
    var that = this
    var app = getApp()
    getReq('/lost-notices/?author__id=' + app.globalData.myInfo.id + '&search=' + this.data.search_value,function(data){
      that.setData({
        foundList:data.results,
        next:data.next
      })
    })
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.next===null) return
    var that = this
    console.log(this.data.next)
    var api = this.data.next.split("http://xyh.iterator-traits.com")[1]
    var fl = this.data.foundList
    getReq(api,function(data){
      var nfl = fl.concat(data.results)
      console.log(data.results)
      that.setData({
        foundList:nfl,
        next:data.next
      })
    })
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
    var that = this
    var app = getApp()
    getReq('/lost-notices/?author__id=' + app.globalData.myInfo.id + '&search=' + this.data.search_value,function(data){
      that.setData({
        foundList:data.results,
        next:data.next
      })
    })
  },

    /**
   * 用户对搜索框内容进行取消
   */
  onCancel: function(){
    this.setData({
      search_value:"",
    })
  },
})