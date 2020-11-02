// components/found-card/found-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardData:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    enterInfo:function(e){
      wx.navigateTo({
        url: '/pages/found-info/found-info?id=1',
      })
    }
  }
})
