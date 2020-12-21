// pages/lost-info/lost-info.js
const {
  timeTrans,
  acronymTrans,
  createQrCode
} = require("../../lib/lib")
const {
  getReq,
  deleteReq,
  putReq
} = require("../../service/http")
import Dialog from '@vant/weapp/dialog/dialog'
import {
  deleteObjFromArray,
  enterVerifiedPage
} from '../../utils/util'

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
      name: '已归还',
    }, {
      name: '下架'
    }, {
      name: '删除',
      color: '#ee0a24'
    }, {
    //   name: '转交（生成转交码）'
    // }, {
      name: '举报',
      color: '#ee0a24'
    }],
    scene: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp()
    this.setData({
      scene: app.globalData.scene
    })

    if (this.data.scene !== 1154) {
      this.data.id = options.id
      wx.setNavigationBarTitle({
        title: '寻物启事详情',
      })
      this.setData({
        myInfo: wx.getStorageSync('myInfo')
      })
    }
    var _this = this
    getReq('/lost-notices/' + options.id, function (data) {
      _this.setData({
        infoData: data
      })
      _this.setActions()
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
    getReq('/lost-notices/' + this.data.id, function (data) {
      _this.setData({
        infoData: data
      })
      _this.setActions()
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
  onShareAppMessage: function (res) {
    return {
      title: '紫荆寻物',
      path: 'pages/lost-info/lost-info?id=' + this.data.id
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
    Dialog.confirm({
        title: "确认删除吗？",
        message: "删除后的启事不可恢复，希望之后撤回可以使用下架功能"
      })
      .then(() => {
        deleteReq('/lost-notices/' + this.data.infoData.id + '/', function (data) {
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 1500
          })
          wx.navigateBack({
            delta: 1,
          })
        })
      })
      .catch(() => {})

  },

  /**
   * 编辑启事
   */
  edit: function () {
    wx.setStorageSync('cur-lost-notice', this.data.infoData)
    // 将启事详情存入localstorage
    wx.setStorageSync('cur-notices', this.data.infoData)
    wx.navigateTo({
      url: '/pages/edit-lost/attribute/attribute?type=' + this.data.infoData.property.template,
    })
  },

  /**
   * 上拉菜单选择
   */
  onSelect: function (event) {
    switch (event.detail.name) {
      case '举报':
        this.report(this.data.infoData.id, this.data.infoData.property.name, 'lost', this.data.infoData.author.id)
        break
      case '转交（生成转交码）':
        createQrCode('pages/lost-info/lost-info', '?id=' + this.data.id)
        break
      case '删除':
        this.delete()
        break;
      case '修改':
        this.edit()
        break
      case '已归还':
        this.returned()
        break
      case '下架':
        this.unrelease()
        break
      case '撤回归还':
      case '撤回下架':
        this.release()
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
  },

  /**
   * 联系他人，转到聊天页面
   */
  contact: function (event) {
    enterVerifiedPage('/pages/notice/notice-info/notice-info?sender=' + this.data.infoData.author.id)
  },

  /**
   * 将启事下架
   */
  unrelease: function (event) {
    var infoData = this.data.infoData
    var _this = this
    infoData.status = "CLS"
    Dialog.confirm({
        title: "下架启事",
        message: "下架的启事将不会展示给他人，您可以“我的启事”中找到它。"
      })
      .then(() => {
        putReq('/lost-notices/' + this.data.id + '/', infoData, function () {
          let path = 'infoData.status'
          _this.setData({
            [path]: "CLS"
          })
          _this.setActions()
          wx.showToast({
            title: '下架成功',
          })
        })
      })
  },

  /**
   * 将启事重新改为上架状态
   */
  release: function (event) {
    var infoData = this.data.infoData
    var _this = this
    infoData.status = "PUB"
    Dialog.confirm({
        title: "恢复发布",
        message: "恢复发布的启事可以再次被展示在首页中"
      })
      .then(() => {
        putReq('/lost-notices/' + this.data.id + '/', infoData, function () {
          let path = 'infoData.status'
          _this.setData({
            [path]: "PUB"
          })
          _this.setActions()
          wx.showToast({
            title: '下架成功',
          })
        })
      })
  },

  /**
   * 用户将启事状态设置为“已归还”
   */
  returned: function () {
    var infoData = this.data.infoData
    var _this = this
    infoData.status = "RET"
    Dialog.confirm({
        title: "已归还",
        message: "完成的启事将不会再展示在首页，您可以在“我的启事”中找到它。"
      })
      .then(() => {
        putReq('/lost-notices/' + this.data.id + '/', infoData, function () {
          let path = 'infoData.status'
          _this.setData({
            [path]: "RET"
          })
          _this.setActions()
          wx.showToast({
            title: '设置成功',
          })
        })
      })
  },

  /**
   * 用户进入举报页面
   */
  report: function (id, title, type, user) {
    enterVerifiedPage('/pages/report/report?id=' + id + '&title=' + title + '&type=' + type + "&user=" + user)
  },

  /**
   * 设置上拉菜单 actions 的内容
   */
  setActions: function () {
    if (this.data.infoData.author.id !== this.data.myInfo.id) {
      this.setData({
        actions: [{
          name: '举报',
          color: '#ee0a24'
        }]
      })
    } else if (this.data.infoData.status === 'RET') {
      this.setData({
        actions: [{
          name: '修改'
        }, {
          name: '下架'
        }, {
          name: '撤回归还'
        }, {
          name: '删除',
          color: '#ee0a24'
        }, {
          name: '举报',
          color: '#ee0a24'
        }]
      })
    } else if (this.data.infoData.status === 'CLS') {
      this.setData({
        actions: [{
          name: '修改'
        }, {
          name: '已归还',
        }, {
          name: '撤回下架'
        }, {
          name: '删除',
          color: '#ee0a24'
        }, {
          name: '举报',
          color: '#ee0a24'
        }]
      })
    } else if (this.data.infoData.status === 'PUB') {
      this.setData({
        actions: [{
          name: '修改'
        }, {
          name: '已归还',
        }, {
          name: '下架'
        }, {
          name: '删除',
          color: '#ee0a24'
        }, {
          name: '举报',
          color: '#ee0a24'
        }]
      })
    }
  },

  /**
   * 点击丢失地点打开地图
   */
  openMap: function (event) {
    const location = event.currentTarget.dataset.location
    wx.openLocation({
      latitude: location.latitude,
      longitude: location.longitude,
    })
  }

})