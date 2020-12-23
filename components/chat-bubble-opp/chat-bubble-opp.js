// components/chat-bubble-opp/chat-bubble-opp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    avatar:String,
    time:String,
    bubbleColor: String,
    text: String,
    userid: Number,
    username: String,

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
      console.log(this.properties.text)
      console.log(this.properties.userid)
      wx.navigateTo({
        url: '/pages/others-info/others-info?id='+ this.properties.userid,
      })
    }
  }
})
