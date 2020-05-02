// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const prodRecord = db.collection('prod-record')


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let itemId = event.itemId
  let seller = event.seller
  // console.log(itemId)
  // console.log(seller)
  try {
    return await prodRecord.where({
      _id: itemId
    }).update({
      data: {
        sellName: seller.sellName,
        sellArea: seller.sellArea,
        sellcontact: seller.sellcontact,
        selllicense: seller.selllicense,
        selldate: seller.selldate,
      }
    }).then ((res) => {
      console.log(res)
    })
  } catch (err) {
    console.log(err)
  }
  finally {
  }
  
  
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}