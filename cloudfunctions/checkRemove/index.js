// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const checking = db.collection('checking')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let phoneNum = event.phoneNum
  console.log(phoneNum)
  await checking.where({
    phoneNum: phoneNum
  }).remove((res) => {
    console.log('res: '+res)
  })


  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}