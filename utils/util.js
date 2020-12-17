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


module.exports = {
  formatTime: formatTime,
  onWsMessage: onWsMessage,
  updateChatList: updateChatList,
  createChat: createChat
}