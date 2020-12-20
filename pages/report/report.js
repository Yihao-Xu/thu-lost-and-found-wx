// pages/report/report.js
import Dialog from '@vant/weapp/dialog/dialog'
import { postReq } from '../../service/http'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice_id: 0,
    notice_title: "",
    notice_type: "",
    description:"",
    report_type:"",
    user: 0,
    picker_show: false,
    columns: [
      '诈骗信息',
      '骚扰信息',
      '广告信息',
      '色情信息',
      '非法内容',
      '垃圾信息',
      '侵犯版权',
      '其他'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      notice_id: Number(options.id),
      notice_title: options.title,
      notice_type: options.type,
      user: Number(options.user)
    })
    wx.setNavigationBarTitle({
      title: '举报',
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

  }
  ,

  /**
   * 打开选择器
   */
  openPicker: function(){
    this.setData({
      picker_show: true
    })
  },

  /**
   * 关闭选择器
   */
  closePicker: function(){
    this.setData({
      picker_show: false
    })
  },

  /**
   * 用户确定选择器结果
   */
  onConfirm: function(event){
    const { picker, value, index } = event.detail;
    this.setData({
      report_type: value
    })
    this.closePicker()
  },

  /**
   * 把中文的举报类型翻译成要提交的英文提交类型
   */
  translate:function(type){
    switch(type){
      case '诈骗信息':
        return 'SCM'
      case '骚扰信息':
        return 'HRS'
      case '广告信息':
        return 'ADV'
      case '色情信息':
        return 'PRN'
      case '非法内容':
        return 'ILL'
      case '垃圾信息':
        return 'SPM'
      case '侵犯版权':
        return 'CPY'
      case '其他':
        return 'OTH'
      case 'found':
        return 'FND'
      case 'lost':
        return "LST"
    }
    return 'type'
  },

  /**
   * 用户提交举报内容
   */
  release: function(event){
    if(this.data.report_type === ''){
      Dialog.alert({
        message:'举报类型不能为空哦！'
      })
      return
    }
    if(this.data.description === ''){
      Dialog.alert({
        message:'举报详情不能为空哦！'
      })
      return
    }

    Dialog.confirm({
      title:'提交举报',
      message:'确定要提交吗？'
    })
    .then(()=>{
      var report = {}
      report.type = this.translate(this.data.report_type)
      report.description = this.data.description
      report.notice_type = this.translate(this.data.notice_type)
      report.user = this.data.user
      if(this.data.notice_type === 'found'){
        report.found_notice = this.data.notice_id
      }else{
        report.lost_notice = this.data.notice_id
      }
      postReq('/reports/', report, function(){
        wx.showToast({
          title: '提交举报成功',
          icon: 'success'
        })
        wx.navigateBack({
          delta: 1,
        })
      })
    })

  },

})