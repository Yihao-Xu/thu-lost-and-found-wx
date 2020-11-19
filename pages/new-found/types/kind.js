// pages/new-found/kind/kind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0, //侧边导航栏的索引
    infoData: {
      kindIndex:["证件","卡片"],
      kindData: {
        "证件": {
          "护照": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605337531439&di=852a16c52765d32c1bfc2723106de9a9&imgtype=0&src=http%3A%2F%2Fpic1.zhimg.com%2Fv2-518d1d5f5a913756e082e6dac09c6935_250x0.jpg%3Fsource%3D172ae18b",
          "身份证": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605337567510&di=6099b215ad31a10001052355d8f8896b&imgtype=0&src=http%3A%2F%2Fjs.people.com.cn%2FNMediaFile%2F2015%2F1204%2FLOCAL201512041515000375056788320.jpg",
          "驾驶证":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605349666492&di=ffc9f229900d6eeb0a49753cedfbbab0&imgtype=0&src=http%3A%2F%2Fimg12.360buyimg.com%2Fn1%2Fjfs%2Ft19405%2F12%2F1895957740%2F219580%2Fc0c2e74b%2F5adc8e4cN0856762c.jpg",
          "毕业证":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605351031218&di=ba15c04bdd0de5c9739e547e513454a8&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160416%2Fb81970511a87409ab37d2c59d0fad150_th.jpg"
        },
        "卡片": {
          "校园卡": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605337592786&di=3ce38e289a30a192d52904adecc27c32&imgtype=0&src=http%3A%2F%2Fpic05.997788.com%2Fpic_search%2F00%2F16%2F40%2F54%2Fse16405474a.jpg",
          "银行卡": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605337607884&di=805b483fe5c1baeb2085203b93061b03&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F77e9d895b3ff6ed11d0ae68fe72036ab02d62d94a6f0e-rYXqfT_fw658"
        }
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '选择物品种类',
    })
    //发送请求加载kind
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

  /*
   * 切换侧边导航栏
   */
  sidebarChange: function (event) {
    // 重新渲染宫格组件
    this.setData({
      activeKey:event.detail
    })
  },

  /*
  * 选择好种类，进入下一个页面
  */
 enterNext:function(event){
  wx.navigateTo({
    url: '/pages/new-found/attribute/attribute?kind='+event.currentTarget.dataset.kind,
  })
 }
})