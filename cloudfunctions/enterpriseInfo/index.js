// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const user = db.collection('user-record')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let phoneNum = event.phoneNum
  let enterInfo = event.enterInfo
  // console.log(event.phoneNum)
  // console.log(event.enterInfo)
  try {
    return await user.where({
      phoneNum: phoneNum
    }).update({
      data: {
        compName: enterInfo.compName,
        compAddr: enterInfo.compAddr,
        compDescribe: enterInfo.compDescribe,
        compContact: enterInfo.compContact,
      }
    })
  } catch (err) {
    console.log(err)
  }
  finally {

  }
}