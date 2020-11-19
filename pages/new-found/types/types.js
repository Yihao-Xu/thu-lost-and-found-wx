// pages/new-found/kind/kind.js
import '../../../service/http'
import { getReq } from '../../../service/http'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0, //侧边导航栏的索引
    typesData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '选择物品种类',
    })
    //请求获取types
    const that = this
    getReq('/property-types/',function(res){
      that.setData({
        typesData: res.results
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

  /*
   * 切换侧边导航栏
   */
  sidebarChange: function (event) {
    this.setData({
      activeKey:event.detail
    })
  },
  /*
  * 选择好种类，进入下一个页面
  */
 enterNext:function(event){
  wx.setStorage({
    data: event.currentTarget.dataset.template,
    key: 'cur-template',
  })
  
  wx.navigateTo({
    url: '/pages/new-found/attribute/attribute?type='+event.currentTarget.dataset.template.name,
  })
 },
})