// components/chat-bubble-matching/chat-bubble-matching.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    matching_data: Object
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
    enterFoundNotice: function(){
      wx.navigateTo({
        url: '/pages/found-info/found-info?id='+this.matching_data.found_notice_id,
      })
    }
  }
})
