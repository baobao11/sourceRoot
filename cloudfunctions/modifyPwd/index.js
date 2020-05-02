// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const user = db.collection('user-record')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let phoneNum = event.phoneNum
  let newPwd = event.newPwd
  user.where({
    phoneNum: phoneNum
   }).update({
    data: {
      pwd: newPwd
    }
  })
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}