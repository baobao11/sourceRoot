//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'source-root-kz0nk',
        traceUser: true,
      })
    }

    this.globalData = {
    // 默认 2 表示企业     2*2=4登录成功
    //      3 表示管理员             3*3=9登录成功
    //      5 表示普通游客/用户             5*5=25登录成功
    //  登录成功后才设置平方
      identity: 0,
      myOpenId: '',
      phoneNum: '',
      prodOrSell:''
    }
  }
})
