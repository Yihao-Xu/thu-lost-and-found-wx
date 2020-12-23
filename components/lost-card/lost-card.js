// components/lost-card/lost-card.js
const { addFootprint } = require("../../utils/util")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardData: Object
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
    enterInfo: function (e) {
      wx.navigateTo({
        url: '/pages/lost-info/lost-info?id='+this.data.cardData.id,
      })
      addFootprint(this.properties.cardData, 'lost')
    }
  }
})