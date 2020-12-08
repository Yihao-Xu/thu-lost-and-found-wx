// pages/new-found/details/details.js
import Dialog from '@vant/weapp/dialog/dialog';
import {
  getReq,
  postReq,
  putReq,
  uploadImage
} from '../../../service/http';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoData: {},
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
    upData:{},
    wx_checked: false,
    phone_checked:false,
    email_checked:false,
    images:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '拾取详情',
    })
    var that = this
    wx.getStorage({
      key: 'cur-notices',
      success(res){
        console.log(res.data)
        that.setData({
          infoData:res.data
        })
        // 设置联系方式开关
        for (var item of that.data.infoData.contacts){
          switch(item.methods){
            case "WCT":
              that.setData({wx_checked:true})
              break;
            case "PHN":
              that.setData({phone_checked:true})
              break;
            case "EML":
              that.setData({email_checked:true})
              break;
          }
        }
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
  onShareAppMessage: function () {

  },

  /**
   * 选择地点
   */
  chooseLocation: function () {
    const that = this
    wx.chooseLocation({
      success(res) {
        var path = 'infoData.found_location'
        that.setData({
          [path]: res.name
        })
      }
    })
  },

  // 用户上传图片前校验是否是图片
  beforeRead: function (event) {},
  //用户上传图片后
  afterRead: function (event) {
    console.log(event.detail)
    const {file} = event.detail
    var imgs = this.data.images
    imgs.push({
      'url':file.url
    })
    this.setData({
      images:imgs
    })
  },
  // 用户删除图片
  deleteImage:function(event){
    const {index} = event.detail
    var imgs = this.data.images
    imgs.splice(index, 1);
    this.setData({
      images:imgs
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
  calendarConfirm: function (event) {
    const {
      year,
      month,
      date,
      hours,
      minute,
    } = this.getYMDHMS(event.detail)
    var ft = 'infoData.found_datetime'
    this.setData({
      date: event.detail,
      [ft]: year + '-' + month + '-' + date + ' ' + hours + ':' + minute,
      calendarShow: false
    })
  },
  calendarCancel: function (event) {
    this.setData({
      calendarShow: false
    })
  },
  release: function (event) {
    Dialog.confirm({
        title: '确认提交',
        message: '您确认要提交招领启事吗？',
      })
      .then(() => {
        // on confirm
        var contacts = []
        var myInfo = wx.getStorageSync('myInfo')
        if(this.data.wx_checked && myInfo.wechat_id !== ""){
          contacts.push({
            "name":myInfo.username,
            "method":"WCT",
            "details":myInfo.wechat_id
          })
        }
        if(this.data.email_checked && myInfo.email !== ""){
          contacts.push({
            "name":myInfo.username,
            "method":"EML",
            "details":myInfo.email
          })
        }
        // if(this.data.phone_checked && myInfo.phone !== ""){
        //   contacts.push({
        //     "name":myInfo.username,
        //     "method":"WX",
        //     "details":myInfo.phone
        //   })
        // }
        var path = "infoData.contacts"
        this.setData({
          [path]:contacts
        })
        //api提交启事
        var that = this
        
        putReq('/found-notices/', this.data.infoData, function (res) {
          //上传图片
          for(var image of that.data.images){
            uploadImage('/found-notices/'+res.id+'/upload-image/',image.url, 'rua.jpg', function(r){
            })
          }
          //返回首页
          wx.navigateBack({
            delta: 3,
            success: (res) => {},
            fail: (res) => {},
            complete: (res) => {},
          })
        })

      })
      .catch(() => {
        // on cancel
      });
  },

  /**
   * 开关状态改变
   */
  checkedChange(event){
    var key = event.currentTarget.dataset.key
    switch(key){
      case "wx":
        this.setData({wx_checked:event.detail})
        break
      case "phone":
        this.setData({phone_checked:event.detail})
        break
      case "email":
        this.setData({email_checked:event.detail})
        break
    }
  },

    // wx双向绑定不支持深度路径，只能利用函数来改变值
    attributeChange: function (event) {
      var path = event.currentTarget.dataset.path
      this.setData({
        [path]: event.detail
      })
    }

})