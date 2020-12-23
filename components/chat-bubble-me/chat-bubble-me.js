// components/chat-bubble-me/chat-bubble-me.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    avatar:String,
    time:String,
    bubbleColor: String,
    text: String,
    username: String,
    userid:Number
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
    enterInfo: function(){
      wx.navigateTo({
        url: '/pages/others-info/others-info?id=' + this.properties.userid,
      })
    }
  }
})
