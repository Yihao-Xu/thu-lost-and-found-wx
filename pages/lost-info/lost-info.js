// pages/lost-info/lost-info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    infoData:{
      avatar:"/image/avatar-1.jpg",
      images:[
        "/image/ip12-1.jpg",
        "/image/ip12-2.jpg",
        "/image/ip12-3.jpg"
      ],
      found_location:"紫荆园食堂",
      found_time:"10月31日下午",
      founder_name:"李祁",
      object_name:"iPhone12 Pro",
      release_time:"今天11:02",
      describe:"今天我在紫荆园食堂丢了我的iPhone12 Pro，球球捡到的人给咱联系咱，必有重谢！",
      status:"未归还",
      tags:[
        "蓝色",
        "没有手机壳"
      ],
      contact_infomation:{
        "QQ":"89035689",
        "email":"89035689@qq.com",
        "微信":"yihao_xu",
        "mobile":"18611362038"
      },
      object_sort:"手机"
    },
    activeNames:"0",
    gallery_show:false,
    current_picture:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id=options.id
    wx.setNavigationBarTitle({
      title: '寻物启事详情',
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

  showPicture: function(e){
    console.log(this.data.infoData.images)
    wx.previewImage({
      current:e.currentUrl,
      urls: this.data.infoData.images,
    })

    // this.setData({
    //   gallery_show:true,
    //   current_picture:e.currentTarget.dataset.index,
    // })
  }
})