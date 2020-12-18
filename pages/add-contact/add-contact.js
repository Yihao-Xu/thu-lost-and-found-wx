const { checkContact } = require("../../utils/util")
import Dialog from '@vant/weapp/dialog/dialog'
import { acronymTrans } from '../../utils/util'
// pages/add-contract/add-contract.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    details: "",
    method: "",
    sheetOnShow: false,
    actions: [{
      name: "微信"
    }, {
      name: "邮箱"
    }, {
      name: "手机"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '添加联系方式',
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
   * 用户打开面板
   */
  sheetShow: function () {
    this.setData({
      sheetOnShow: true
    })
  },

  /**
   * 用户关闭上拉面板
   */
  onClose: function () {
    this.setData({
      sheetOnShow: false
    })
  },

  /**
   * 用户选择选项
   */
  onSelect: function (event) {
    switch (event.detail.name) {
      case "微信":
        this.setData({
          method: "WCT"
        })
        break
      case "手机":
        this.setData({
          method: "PHN"
        })
        break
      case "邮箱":
        this.setData({
          method: "EML"
        })
        break;
    }
  },

  /**
   * 用户提交并退出
   */
  release: function (event) {
    if(this.data.name == ""){
      Dialog.alert({
        title:"格式错误",
        message:"联系人姓名不能为空！"
      })
      return
    }
    if(this.data.method === ""){
      Dialog.alert({
        title:"格式错误",
        message:"请填写联系方式！"
      })
      return
    }
    console.log(this.data.method)
    console.log(acronymTrans(this.data.method))
    if(checkContact(this.data.details, this.data.method) === false){
      Dialog.alert({
        title:"格式错误",
        message:"您输入的" + acronymTrans(this.data.method) + "格式有误！"
      })
      return
    }
    var contact = {
      name: this.data.name,
      details: this.data.details,
      method: this.data.method
    }
    wx.setStorageSync('new-contact', contact)
    wx.navigateBack({
      delta: 1,
    })
  }
})