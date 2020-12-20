// pages/new-lost/details/details.js
import Dialog from '@vant/weapp/dialog/dialog';
import {
  getReq,
  postReq,
  uploadImage
} from '../../../service/http';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoData: {
      lost_time: "",
      lost_location: {
        locations: []
      },
      describe: "",
      picList: [

      ],
    },
    start_calendar_show: false,
    end_calendar_show: false,
    start_date: new Date().getTime(),
    end_date: new Date().getTime(),
    maxDate: new Date().getTime(),
    formatter: function (type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    upData: {},
    wx_checked: false,
    phone_checked: false,
    email_checked: false,
    myInfo: {},
    images: [],
    contacts: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '丢失详情',
    })
    this.setData({
      myInfo: wx.getStorageSync("myInfo")
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
    // 如果新添加了联系方式，从storage中取出，并置null。
    var that = this
    wx.getStorage({
      key: 'new-contact',
      success(res) {
        if (res.data !== null) {
          var contacts = that.data.contacts
          contacts.push(res.data)
          that.setData({
            contacts: contacts
          })
          wx.setStorageSync('new-contact', null)
        }
      }
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
  onShareAppMessage: function () {

  },

  /**
   * 选择地点
   */
  chooseLocation: function () {
    const that = this
    var lost_location = that.data.infoData.lost_location
    if (lost_location.locations.length >= 10) {
      return
    }
    wx.chooseLocation({
      success(res) {
        delete res.errMsg
        var path = 'infoData.lost_location'
        if (res.name === "" || res.name === undefined) return
        lost_location.locations.push(res)
        that.setData({
          [path]: lost_location
        })
      }
    })
  },

  // 用户上传图片前校验是否是图片
  beforeRead: function (event) {},
  /**
   * 用户上传图片后，上传到服务器上
   */
  afterRead: function (event) {
    console.log(event.detail)
    var that = this
    const {
      file
    } = event.detail
    uploadImage('/lost-notices/upload-image/', file.url, 'rua.jpg', function (r) {
      var imgs = that.data.images
      console.log(r)
      console.log(typeof (r.data))
      console.log(JSON.parse(r.data))
      imgs.push({
        'url': JSON.parse(r.data).url[0]
      })
      that.setData({
        images: imgs
      })
    })
  },
  // 用户删除图片
  deleteImage: function (event) {
    const {
      index
    } = event.detail
    var imgs = this.data.images
    imgs.splice(index, 1);
    this.setData({
      images: imgs
    })
  },
  /**
   *   打开日期选择器
   */
  openStartCalendar: function (event) {
    this.setData({
      start_calendar_show: true
    })
  },
  openEndCalendar: function (event) {
    this.setData({
      end_calendar_show: true
    })
  },
  startCalendarClose: function (event) {
    this.setData({
      start_calendarShow: false
    });
  },
  endCalendarClose: function (event) {
    this.setData({
      end_calendarShow: false
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
  startCalendarConfirm: function (event) {
    const {
      year,
      month,
      date,
      hours,
      minute,
    } = this.getYMDHMS(event.detail)
    var ft = 'infoData.est_lost_start_time'
    this.setData({
      start_date: event.detail,
      [ft]: year + '-' + month + '-' + date + ' ' + hours + ':' + minute,
      start_calendar_show: false
    })
  },
  endCalendarConfirm: function (event) {
    const {
      year,
      month,
      date,
      hours,
      minute,
    } = this.getYMDHMS(event.detail)
    var ft = 'infoData.est_lost_end_time'
    this.setData({
      end_date: event.detail,
      [ft]: year + '-' + month + '-' + date + ' ' + hours + ':' + minute,
      end_calendar_show: false
    })
  },
  calendarCancel: function (event) {
    this.setData({
      start_calendar_show: false,
      end_calendar_show: false
    })
  },
  /**
   * 提交启事
   */
  release: function (event) {
    Dialog.confirm({
        title: '确认提交',
        message: '您确认要提交寻物启事吗？',
      })
      .then(() => {
        // on confirm
        //组合提交的Json
        var data = {}
        data.est_lost_start_datetime = this.data.infoData.est_lost_start_time
        data.est_lost_end_datetime = this.data.infoData.est_lost_end_time
        data.lost_location = this.data.infoData.lost_location
        data.images = this.data.images
        data.description = this.data.infoData.describe
        try {
          data.property = wx.getStorageSync('cur-property')
        } catch (e) {}
        // 这里修改tag的格式
        var tags = data.property.tags
        var newtags = []
        for (var item of tags) {
          var i = {
            "name": item
          }
          newtags.push(i)
        }
        data.property.tags = newtags
        //这里添加联系方式
        var contacts = this.data.contacts
        var myInfo = wx.getStorageSync('myInfo')
        if (this.data.wx_checked && myInfo.wechat_id !== "") {
          contacts.push({
            "name": myInfo.username,
            "method": "WCT",
            "details": myInfo.wechat_id
          })
        }
        if (this.data.email_checked && myInfo.email !== "") {
          contacts.push({
            "name": myInfo.username,
            "method": "EML",
            "details": myInfo.email
          })
        }
        if (this.data.phone_checked && myInfo.phone !== "") {
          contacts.push({
            "name": myInfo.username,
            "method": "PHN",
            "details": myInfo.phone
          })
        }
        data.contacts = contacts

        this.setData({
          upData: data
        })

        if (this.blankCheck(data) == false) {
          return
        }

        //api提交启事
        var that = this
        postReq('/lost-notices/', this.data.upData, function (res) {
          //去匹配页面
          wx.redirectTo({
            url: '/pages/new-lost/matching/matching',
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
  checkedChange(event) {
    var key = event.currentTarget.dataset.key
    switch (key) {
      case "wx":
        this.setData({
          wx_checked: event.detail
        })
        break
      case "phone":
        this.setData({
          phone_checked: event.detail
        })
        break
      case "email":
        this.setData({
          email_checked: event.detail
        })
        break
    }
  },

  // wx双向绑定不支持深度路径，只能利用函数来改变值
  attributeChange: function (event) {
    var path = event.currentTarget.dataset.path
    this.setData({
      [path]: event.detail
    })
  },

  /**
   * 跳转到添加联系方式页面
   */
  addNewContact: function (event) {
    wx.navigateTo({
      url: '/pages/add-contact/add-contact',
    })
  },

  /**
   * 删除联系方式
   */
  deleteContact: function (event) {
    var index = event.currentTarget.dataset.index
    var contacts = this.data.contacts
    contacts.splice(index, 1)
    this.setData({
      contacts: contacts
    })
  },

  /**
   * 删除地点
   */
  deleteLocation: function (event) {
    var index = event.currentTarget.dataset.index
    var lost_location = this.data.infoData.lost_location
    lost_location.locations.splice(index, 1)
    var path = "infoData.lost_location"
    this.setData({
      [path]: lost_location
    })
  },

  /**
   * 提交前检查用户有没有未填的项目
   */
  blankCheck: function (data) {
    if (data.est_lost_start_datetime == undefined) {
      this.popupDialog("最早丢失时间")
      return false
    } else if (data.est_lost_end_datetime == undefined) {
      this.popupDialog("最晚丢失时间")
      return false
    } else if (data.lost_location.locations.length === 0) {
      this.popupDialog("可能丢失地点")
      return false
    } else if (data.contacts.length === 0) {
      this.popupDialog("联系方式")
      return false
    }
    return true
  },

  /**
   * 弹一个弹窗，提示用户XX还没填写
   */
  popupDialog: function (content) {
    Dialog.alert({
      message: content + ' 还未填写'
    })
  }
})