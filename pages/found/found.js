// pages/found/found.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foundList:[
      {
        avatar:"/image/avatar-1.jpg",
        username:"徐亦豪",
        release_time:"今天11:02",
        content:"今天咱捡到了一部苹果手机嗷",
        image1:"/image/ip12-1.jpg",
        image2:"/image/ip12-2.jpg",
        image3:"/image/ip12-3.jpg",
        object_name:"iPhone12 Pro",
        location:"六教602",
        found_time:"10月31日下午",
        tags:["蓝色","没有手机壳"]
      }, 
      {
        avatar:"/image/avatar-liqi.jpg",
        username:"李祁",
        release_time:"今天9:02",
        content:"今天咱捡到了一顶帽子",
        image1:"/image/greencap-1.jpg",
        image2:"/image/greencap-2.jpg",
        image3:"/image/greencap-3.jpg",
        object_name:"帽子（绿）",
        location:"五教5305",
        found_time:"10月30日下午",
        tags:["绿色","拥有神秘力量"]
      }
    ],
    search_value:"",//搜索框的内容
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

  /**
   * 用户进行搜索
   */
  onSearch: function(){
  },

    /**
   * 用户对搜索框内容进行取消
   */
  onCancel: function(){
    this.setData({
      search_value:"",
    })
  },
  
  new_found:function(){
    wx.navigateTo({
      url: '/pages/new-found/types/types',
    })
  }
})