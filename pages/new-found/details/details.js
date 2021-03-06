// pages/new-found/details/details.js
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
      found_time: "",
      found_location: "",
      describe: "",
      picList: [

      ],
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
    upData: {},
    wx_checked: false,
    phone_checked: false,
    email_checked: false,
    myInfo: {},
    images: [],
    contacts:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '拾取详情',
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
          that.setData({contacts:contacts})
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
    console.log('choose')
    const that = this
    wx.getSetting({
      success(res){
        console.log(res)
        if(!res.authSetting['scope.userLocation']){
          wx.authorize({
            scope: 'scope.userLocation',
            success(){
              wx.chooseLocation({
                success(res) {
                  delete res.errMsg
                  var path = 'infoData.found_location'
                  that.setData({
                    [path]: res
                  })
                },
                fail(res){
                  console.log(res)
                }
              })
            },
            fail(){
              console.log("failed!")
            }
          })
        }else{
          wx.chooseLocation({
            success(res) {
              delete res.errMsg
              var path = 'infoData.found_location'
              that.setData({
                [path]: res
              })
            },
            fail(res){
              console.log(res)
            }
          })
        }
      },
      fail(res){
        console.log(res)
        console.log('get setting failed!')
        wx.chooseLocation({
          success(res) {
            delete res.errMsg
            var path = 'infoData.found_location'
            that.setData({
              [path]: res
            })
          },
          fail(res){
            console.log(res)
          }
        })
      }
    })
    console.log('finish')
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
    uploadImage('/found-notices/upload-image/', file.url, {}, 'rua.jpg', function (r) {
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
    var ft = 'infoData.found_time'
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
  /**
   * 提交启事
   */
  release: function (event) {
    Dialog.confirm({
        title: '确认提交',
        message: '您确认要提交招领启事吗？',
      })
      .then(() => {
        // on confirm
        //组合提交的Json
        var data = {}
        data.found_datetime = this.data.infoData.found_time
        data.found_location = this.data.infoData.found_location
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

        if(this.blankCheck(data) == false){
          return
        }

        //api提交启事
        var that = this
        postReq('/found-notices/', this.data.upData, function (res) {
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
  addNewContact:function(event){
    wx.navigateTo({
      url: '/pages/add-contact/add-contact',
    })
  },

  /**
   * 删除联系方式
   */
  deleteContact: function(event){
    var index = event.currentTarget.dataset.index
    var contacts = this.data.contacts
    contacts.splice(index, 1)
    this.setData({
      contacts:contacts
    })
  },

    /**
   * 提交前检查用户有没有未填的项目
   */
  blankCheck: function(data){
    console.log(data)
    if(data.found_datetime == undefined || data.found_datetime == ""){
      this.popupDialog("拾取时间")
      return false
    }else if(data.found_location === "" || data.found_location.name == ""){
      this.popupDialog("拾取地点")
      return  false
    }else if(data.contacts.length === 0){
      this.popupDialog("联系方式")
      return false
    }
    return true
  },

  /**
   * 弹一个弹窗，提示用户XX还没填写
   */
  popupDialog: function(content){
    Dialog.alert({
      message:content+' 还未填写'
    })
  }

})