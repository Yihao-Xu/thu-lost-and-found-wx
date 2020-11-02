// pages/found-info/found-info.js
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
      found_location:"六教602",
      found_time:"10月31日下午",
      founder_name:"徐亦豪",
      object_name:"iPhone12 Pro",
      release_time:"今天11:02",
      describe:"今天咱在六教602丢了一部手机，蓝色，iPhone12 Pro，没有手机壳，锁屏是一个美少女，捡到有香锅奶茶酬谢。",
      status:"未归还",
      contact_infomation:{
        "QQ":"89035689",
        "email":"89035689@qq.com",
        "微信":"yihao_xu",
        "mobile":"18611362038"
      },
      object_sort:"手机"
    },
    active_name:"0",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id=options.id
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

  onChange: function(event){
    this.setData({
      active_name:event.detail,
    })
  }
})