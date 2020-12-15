const {
  timeTrans,
  acronymTrans,
  createQrCode
} = require("../../lib/lib")
const {
  getReq,
  deleteReq
} = require("../../service/http")

// pages/found-info/found-info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 1,
    infoData: {},
    activeNames: "0",
    gallery_show: false,
    current_picture: 1,
    myInfo: {},
    moreShow: false,
    actions: [{
      name: '修改'
    }, {
      name: '删除'
    }, {
      name: '转交（生成转交码）'
    }, {
      name: '举报',
      color: '#ee0a24'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id
    wx.setNavigationBarTitle({
      title: '招领启事详情',
    })
    this.setData({
      myInfo: wx.getStorageSync('myInfo')
    })
    var that = this
    getReq('/found-notices/' + options.id, function (data) {
      that.setData({
        infoData: data
      })
      if (that.data.infoData.author.id !== that.data.myInfo.id) {
        that.setData({
          actions: [{
            name: '举报',
            color: '#ee0a24'
          }]
        })
      }
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
  onShareAppMessage: function (res) {
    return {
      title: '紫荆寻物',
      path: 'pages/found-info/found-info?id=' + this.data.id
    }
  },

  /**
   * 用户分享到朋友圈
   */
  onShareTimeline: function () {
    return {
      title: '紫荆寻物',
      query: 'id=' + this.data.id
    }
  },

  showPicture: function (e) {
    var urlArray = this.data.infoData.images.map(a => a.url)
    wx.previewImage({
      current: e.currentUrl,
      urls: urlArray
    })
  },

  /**
   * 删除启事
   */
  delete: function () {
    deleteReq('/found-notices/' + this.data.infoData.id + '/', function (data) {
      wx.showToast({
        title: '删除成功',
        icon: 'success',
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
  edit: function () {
    wx.setStorageSync('cur-found-notice', this.data.infoData)
    // 将启事详情存入localstorage
    wx.setStorageSync('cur-notices', this.data.infoData)
    wx.navigateTo({
      url: '/pages/edit-found/attribute/attribute?type=' + this.data.infoData.property.template,
    })
  },

  /**
   * 上拉菜单选择
   */
  onSelect: function (event) {
    switch (event.detail.name) {
      case '举报':
        break
      case '转交（生成转交码）':
        createQrCode('pages/found-info/found-info', '?id=' + this.data.id)
        break
      case '删除':
        this.delete()
        break;
      case '修改':
        this.edit()
        break

    }
  },

  /**
   * 打开上拉菜单
   */
  moreOnShow: function (event) {
    this.setData({
      moreShow: true
    })
  },

  /**
   * 关闭上拉菜单
   */
  onClose: function (event) {
    this.setData({
      moreShow: false
    })
  }
})