// pages/new-found/attribute/attribute.js
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:"",
    template:{
      '姓名':'',
      '院系':'',
      '卡号':'',
    },
    description:"",
    tags: ["test1", "test2"],
    tagDialogShow: false,
    tag: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type:options.type,
    })
    const that = this
    wx.getStorage({
      key: 'cur-template',
      success(res){
        that.setData({template:res.data})
      }
    })
    console.log(wx.getStorage({
      key: 'cur-template',
    }))
    wx.setNavigationBarTitle({
      title: '填写'+this.data.type+'特征',
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
    var property = {}
    property.template = this.data.type
    property.attribute = this.data.template
    property.name = 'name'
    wx.setStorage({
      data: property,
      key: 'cur-property',
    })
    wx.navigateTo({
      url: '/pages/new-found/details/details',
    })
  },

  addTag: function (event) {
    if (event.detail === "confirm" && this.data.tag!=="") {
      var ts = this.data.tags
      ts.push(this.data.tag)
      this.setData({
        tagDialogShow: false,
        tags: ts,
        tag: "",

      })
    }else{
      this.setData({
        tagDialogShow: false,
        tag: "",
      })
    }
  },
  cancelTag: function (event) {

  },
  openTagDialog: function (event) {
    this.setData({
      tagDialogShow: true
    })
  },
  deleteTag: function (event) {
    var ts = this.data.tags
    ts.splice(event.currentTarget.dataset.index,1)
    this.setData({
      tags:ts
    })
  }
})