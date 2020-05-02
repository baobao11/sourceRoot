// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const prodRecord = db.collection('prod-record')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let itemId = event.itemId
  try {
    var wholeItem = {};
    return await prodRecord.where({
      _id: itemId
    }).get().then(res => {
      wholeItem = res.data[0]
    })
  }
  catch (err) {
    console.log(err)
  }
  finally {
  }
}
