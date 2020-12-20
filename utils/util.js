const {
  getReq
} = require('../service/http')

var app = getApp()

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * websocket 接收到信息
 * callback 参数为回调函数，传入处理好的chat_list为参数
 * 如果 chat_list 为 null， 则从localstorage中拿
 */
const onWsMessage = (data_recv, callback) => {
  // var chat_list = wx.getStorageSync('chat_list')
  // if (chat_list == undefined) {
  //   chat_list = []
  // }
  var app = getApp()
  var data = JSON.parse(data_recv)
  console.log(data)
  updateChatList(app.globalData.chat_list, data, data.sender, callback)
}

const updateChatList = (chat_list, message, sender, callback) => {
  // 寻找list中对应的chat
  for (var i = 0; i < chat_list.length; i++) {
    if (chat_list[i].sender == sender) {
      var first_chat = chat_list[i]
      first_chat.messages.push(message)
      first_chat.newest_message = message
      chat_list.splice(i, 1)
      chat_list.unshift(first_chat)
      wx.setStorage({
        data: chat_list,
        key: 'chat_list',
      })
      callback(chat_list)
      return
    }
  }

  // 找不到则新建一个
  createChat(chat_list, message, sender, callback)
}

/**
 * 新建一个聊天
 */
const createChat = (chat_list, message, sender, callback) => {

  var new_chat = {}
  if (message !== null) {
    new_chat.messages = [message]
  } else {
    new_chat.messages = []
  }
  new_chat.unread = 0
  new_chat.sender = sender
  new_chat.newest_message = message

  getReq('/users/' + sender + '/', function (data) {
    new_chat.author = data
    chat_list.unshift(new_chat)
    wx.setStorage({
      data: chat_list,
      key: 'chat_list',
    })
    callback(chat_list)

  })
}

const deleteObjFromArray = (array, obj) => {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === obj) {
      array.splice(i, 1)
      return array
    }
  }
  return array
}

/**
 * 更新unread
 */
const addUnread = (cur_notice_info_sender, message) => {
  var app = getApp()
  if (cur_notice_info_sender === message.sender) return
  if (typeof (message) != Object) {
    message = JSON.parse(message)
  }
  console.log(app.globalData.chat_list)
  app.globalData.chat_list.find(item => item.sender == message.sender).unread++
  app.globalData.chat_list.find(item => item.sender == message.sender).show_dot = true
  console.log(app.globalData.chat_list.find(item => item.sender == message.sender).show_dot)
  app.globalData.unread++
  wx.setStorage({
    data: app.globalData.chat_list,
    key: 'chat_list',
  })
  wx.setStorage({
    data: app.globalData.unread,
    key: 'unread',
  })
  wx.showTabBarRedDot({
    index: 2,
    fail() {}
  })
}

const clearUnread = (sender) => {
  var app = getApp()
  var read = app.globalData.chat_list.find(item => item.sender == sender).unread
  
  app.globalData.chat_list.find(item => item.sender == sender).unread = 0
  app.globalData.chat_list.find(item => item.sender == sender).show_dot = false
  app.globalData.unread -= read
  wx.setStorage({
    data: app.globalData.chat_list,
    key: 'chat_list',
  })
  wx.setStorage({
    data: app.globalData.unread,
    key: 'unread',
  })
  if (app.globalData.unread == 0) {
    console.log('hide')
    wx.hideTabBarRedDot({
      index: 2,
      fail() {}
    })
  }
}

/**
 * 检测联系方式是否合法
 */
const checkPhone = (phone) => {
  let phone_reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
  return phone_reg.test(phone)
}

const checkEmail = (email) => {
  let email_reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
  return email_reg.test(email)
}

const checkWechat = (wechat) => {
  let wechat_reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/
  return wechat_reg.test(wechat)
}

const checkContact = (contact, type) => {
  switch (type) {
    case "WCT":
      return checkWechat(contact)
    case "PHN":
      return checkPhone(contact)
    case "EML":
      return checkEmail(contact)
  }
  return false
}

/**
 * 将缩写转换为中文
 */
const acronymTransform = (status) => {
  switch (status) {
    case 'RET':
      return "已归还"
    case "OPN":
      return "发布中"
    case "CLS":
      return "已下架"
    case "DFT":
      return "未发布"
    case "PUB":
      return "寻找中"
    case "PHN":
      return "手机"
    case "WCT":
      return "微信"
    case "EML":
      return "邮箱"
  }
  return status
}

const enterVerifiedPage = (url) => {
  var myInfo = wx.getStorageSync('myInfo')
  wx.getSetting({
    success: res => {
      if (!res.authSetting['scope.userInfo'] || !myInfo.is_verified) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      } else {
        wx.navigateTo({
          url: url,
        })
      }
    },
    fail: res => {
      wx.navigateTo({
        url: url,
      })
    }
  })
}

const propertyBlankCheck = (data, callback) =>{
  console.log(data)
  if(data.name ===""||data.name=== undefined){
    callback('物品名称')
    return false
  }
  for(var key in data.attributes){
    if(data.attributes[key] === '' || data.attributes[key] === undefined){
      callback(key)
      return false
    }
  }
  return true
}



module.exports = {
  formatTime: formatTime,
  onWsMessage: onWsMessage,
  updateChatList: updateChatList,
  createChat: createChat,
  deleteObjFromArray: deleteObjFromArray,
  checkContact: checkContact,
  acronymTrans: acronymTransform,
  addUnread: addUnread,
  clearUnread: clearUnread,
  enterVerifiedPage: enterVerifiedPage,
  propertyBlankCheck: propertyBlankCheck
}