const {
  getReq
} = require('../service/http')

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
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
  var chat_list = wx.getStorageSync('chat_list')
  if (chat_list == undefined) {
    chat_list = []
  }
  if (typeof (data) !== Object) {
    var data = JSON.parse(data_recv)
  }
  console.log(data)
  updateChatList(chat_list, data, data.sender, callback)
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
      callback(chat_list)
      wx.setStorage({
        data: chat_list,
        key: 'chat_list',
      })
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
    callback(chat_list)
    wx.setStorage({
      data: chat_list,
      key: 'chat_list',
    })
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
  switch(type){
    case "WCT":
      return checkWechat(contact)
    case "PHN":
      return checkPhone(contact)
    case "EML":
      return checkEmail(contact)
  }
  return false
}

const acronymTransform =(status) => {
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

module.exports = {
  formatTime: formatTime,
  onWsMessage: onWsMessage,
  updateChatList: updateChatList,
  createChat: createChat,
  deleteObjFromArray: deleteObjFromArray,
  checkContact: checkContact,
  acronymTrans: acronymTransform
}