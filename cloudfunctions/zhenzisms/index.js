// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')
const rq = require('request')
const baseUrl = 'https://smsdeveloper.zhenzikj.com'
const appId = '104714'
const appSecret ='YmYyMDAwYTMtYzNlNC00MmJhLWE1OWMtZmFkZTU2NDI4MTIz'

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({ event });
  
  app.router('send', async (ctx) => {
    var messageId = typeof (event.messageId) == "undefined" ? '' : event.messageId;
    var clientIp = typeof (event.clientIp) == "undefined" ? '' : event.clientIp;
    ctx.body = new Promise(resolve => {
      rq({
        url: baseUrl + '/sms/send.html',
        method: "POST",
        json: true,
        form: {
          apiUrl: event.apiUrl,
          appId: appId,
          appSecret: appSecret,
          message: event.message,
          number: event.number,
          messageId: messageId,
          clientIp: clientIp
        }
      }, function (error, response, body) {
        resolve({ body: body, error: error })
      });
      // setTimeout(() => {
      //   resolve('male');
      // }, 500);
    });
  });
  app.router('balance', async (ctx) => {
    ctx.body = new Promise(resolve => {
      rq({
        url: baseUrl + '/sms/balance.html',
        method: "POST",
        json: true,
        form: {
          apiUrl: event.apiUrl,
          appId: appId,
          appSecret: appSecret
        }
      }, function (error, response, body) {
        resolve({ body: body, error: error })
      });
    });
  });
  app.router('findSmsByMessageId', async (ctx) => {
    ctx.body = new Promise(resolve => {
      rq({
        url: baseUrl + '/sms/findSmsByMessageId.html',
        method: "POST",
        json: true,
        form: {
          apiUrl: event.apiUrl,
          appId: appId,
          appSecret: appSecret,
          messageId: event.messageId
        }
      }, function (error, response, body) {
        resolve({ body: body, error: error })
      });
    });
  });
  app.router('sendCode', async (ctx) => {
    let { OPENID} = cloud.getWXContext()
    const intervalTime = 0;//60 * 1000;//两条短信间隔时间(毫秒)，<=0 时无间隔
    var dbResult = await db.collection('sms-record').where({
      openid: OPENID
    }).orderBy('createTime', 'desc').limit(1).get();
    // ctx.body = result;
    dbResult = dbResult.data;
    if (dbResult.length != 0 && intervalTime > 0){
      var record = dbResult[0];
      if (Number(new Date()) - Number(record.createTime) < intervalTime){
        ctx.body = { code: 'intervalError', msg:'一分钟内，不能重复发送！'};
        return ;
      }
    }
    //生成验证码
    var captcha = '';
    for (var i = 0; i < event.length; i++) {
      //设置随机数范围,这设置为0 ~ 9
      captcha += Math.floor(Math.random() * 9);
    }
    var message = event.message;
    message = message.replace('{code}', captcha);
    //发送短信
    var messageId = typeof (event.messageId) == "undefined" ? '' : event.messageId;
    var clientIp = typeof (event.clientIp) == "undefined" ? '' : event.clientIp;
    ctx.body = new Promise(resolve => {
      rq({
        url: baseUrl + '/sms/send.html',
        method: "POST",
        json: true,
        form: {
          apiUrl: event.apiUrl,
          appId: appId,
          appSecret: appSecret,
          message: message,
          number: event.number,
          messageId: messageId,
          clientIp: clientIp
        }
      }, function (error, response, body) {
        if (body.code != 0) {
          resolve({ code: 'smsError', msg: body.data});
          return ;
        }
        var currentDate = new Date();
        var expire = event.seconds * 1000;
     
        db.collection('sms-record').add({
          data: {
            openid: OPENID,
            number: event.number,
            code: captcha,
            expire: expire,
            createTime: currentDate,
            status: 'normal'
          }
        }).then(res => {
          resolve({ code: 'success', msg: '' });
        })
        
      });
    });
  });
  app.router('validateCode', async (ctx) => {
    let { OPENID } = cloud.getWXContext()
    var dbResult = await db.collection('sms-record').where({
      openid: OPENID
    }).orderBy('createTime', 'desc').limit(1).get();
    data = dbResult.data;
    if (data.length == 0) {
      ctx.body = { code: 'empty', msg: '未生成验证码!' };
      return ;
    }
    var record = data[0];
    if (record.status == 'used') {
      ctx.body = { code: 'code_used', msg: '验证码已被使用!' };
      return;
    }
    if (record.number != event.number) {
      ctx.body = { code: 'number_error', msg: '手机号码错误!' };
      return;
    }

    if (Number(new Date()) - Number(record.createTime) > record.expire){
      ctx.body = { code: 'code_expired', msg: '验证码已过期!' };
      return;
    }
    if (record.code != event.code){
      ctx.body = { code: 'code_error', msg: '验证码不一致!' };
      return;
    }
    ctx.body = new Promise(resolve => {
      db.collection('sms-record').where({
        _id: record._id
      }).update({
        data: {
          status: 'used'
        }
      }).then(res => {
        resolve({ code: 'success', msg: '' });
      })
    });
  });
  return app.serve();
}