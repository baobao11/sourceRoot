// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const user = db.collection('user-record')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let phoneNum = event.phoneNum
  // console.log(event.phoneNum)
  try {
    var enterInfo = {};
    return await user.where({
      phoneNum: phoneNum
    }).get().then(res => {
      enterInfo = res.data[0]
    })
  } catch (err) {
    console.log(err)
  }
  finally {

  }
}