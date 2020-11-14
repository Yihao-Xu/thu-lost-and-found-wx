// pages/new-found/details/details.js
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoData: {
      found_time: "",
      found_location: "",
      describe: "",
      picList: [

      ],
      tags: ["test1", "test2"]
    },
    calendarShow: false,
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
    wx.setNavigationBarTitle({
      title: '拾取详情',
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
   * 选择地点
   */
  chooseLocation: function(){
    const that=this
    wx.chooseLocation({
      success(res){
        var path = 'infoData.found_location'
        that.setData({
          [path]:res.name
        })
      }
    })
  },

  // 用户上传图片前校验是否是图片
  beforeRead: function (event) {},
  //用户上传图片后
  afterRead: function (event) {
    //有后端后才能填写
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
    // const {
    //   year,
    //   month,
    //   date
    // } = this.getYMDHMS(event.detail)
    // var ft = 'infoData.found_time'
    // this.setData({
    //   date: event.detail,
    //   [ft]: year + '-' + month + '-' + date
    // })
  },
  calendarConfirm:function(event){
    const {
      year,
      month,
      date
    } = this.getYMDHMS(event.detail)
    var ft = 'infoData.found_time'
    this.setData({
      date: event.detail,
      [ft]: year + '-' + month + '-' + date,
      calendarShow:false
    })
  },
  calendarCancel:function(event){
    this.setData({
      calendarShow:false
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
          delta: 3,
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