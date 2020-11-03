// pages/new-lost/new-lost.js
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoData: {
      object_sort: "",
      found_time: "",
      found_location: "",
      describe: "",
      picList: [

      ],
      tags: ["test1", "test2"]
    },
    pickerShow: false,
    calendarShow: false,
    pickerList: [ //物品选择器的列表
      "",
      "校园卡",
      "书籍",
      "手机",
      "电子产品",
      "自行车/电动车",
      "其他"
    ],
    date: new Date().getTime(),
    maxDate: new Date().getTime(),
    formatter: function (type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    tagDialogShow: false,
    tag: ""
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

  // 用户上传图片前校验是否是图片
  beforeRead: function (event) {},
  //用户上传图片后
  afterRead: function (event) {
    //有后端后才能填写
  },

  //关闭Picker弹窗
  pickerClose: function (event) {
    this.setData({
      pickerShow: false
    });
  },
  pickerChange: function (event) {
    const {
      value
    } = event.detail
    var os = "infoData.object_sort"
    this.setData({
      [os]: value
    })
  },
  openPicker: function (event) {
    this.setData({
      pickerShow: true
    })
  },

  //打开日期选择器
  openCalendar: function (event) {
    this.setData({
      calendarShow: true
    })
  },
  calendarClose: function (event) {
    this.setData({
      calendarShow: false
    });
  },
  formatter: function (type, value) {
    if (type === 'year') {
      return `${value}年`;
    } else if (type === 'month') {
      return `${value}月`;
    }
    return value;
  },
  getYMDHMS: function (time) {
    var time = new Date(time)
    var year = time.getFullYear(),
      month = time.getMonth() + 1,
      date = time.getDate(),
      hours = time.getHours(),
      minute = time.getMinutes(),
      second = time.getSeconds()
    if (month < 10) {
      month = '0' + month;
    }
    if (date < 10) {
      date = '0' + date;
    }
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minute < 10) {
      minute = '0' + minute;
    }
    if (second < 10) {
      second = '0' + second;
    }
    return {
      year: year,
      month: month,
      date: date,
      hours: hours,
      minute: minute,
      second: second
    }
  },
  calendarChange: function (event) {
    const {
      year,
      month,
      date
    } = this.getYMDHMS(event.detail)
    var ft = 'infoData.found_time'
    this.setData({
      date: event.detail,
      [ft]: year + '-' + month + '-' + date
    })
  },
  release: function (event) {
    Dialog.confirm({
        title: '确认提交',
        message: '您确认要提交招领启事吗？',
      })
      .then(() => {
        // on confirm
        wx.navigateBack({
          delta: 1,
          success: (res) => {},
          fail: (res) => {},
          complete: (res) => {},
        })
      })
      .catch(() => {
        // on cancel
      });
  },

  addTag: function (event) {
    if (event.detail === "confirm" && this.data.tag!=="") {
      var ts = this.data.infoData.tags
      ts.push(this.data.tag)
      var path = "infoData.tags"

      this.setData({
        tagDialogShow: false,
        [path]: ts,
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
    var ts = this.data.infoData.tags
    ts.splice(event.currentTarget.dataset.index,1)
    var path="infoData.tags"
    this.setData({
      [path]:ts
    })
  }


})