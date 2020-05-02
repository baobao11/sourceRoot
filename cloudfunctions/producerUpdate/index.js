// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const prodRecord = db.collection('prod-record')


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let itemId = event.itemId
  let producer = event.producer
  // console.log(itemId)
  // console.log(producer)
  try {
    return await prodRecord.where({
      _id: itemId
    }).update({
      data: {
        prodName: producer.prodName,
        prodorigin: producer.prodorigin,
        proddate: producer.proddate,
        proddescribe: producer.proddescribe,
        prodspecs: producer.prodspecs,
        prodcompany: producer.prodcompany,
        prodbase: producer.prodbase,
        prodcontact: producer.prodcontact,
        prodlicense: producer.prodlicense,
      }
    }).then((res) => {
      console.log(res)
    })
  } catch (err) {
    console.log(err)
  }
  finally {
  }
}