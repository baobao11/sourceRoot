// miniprogram/pages/subPages/forgetPwd/forgetPwd.js
import Toast from '../../../../miniprogram_npm/vant-weapp/toast/toast.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: "",
    sms: ""

  },
  phoneChange: function (event) {
    this.setData({
      phoneNum: event.detail.value
    })
  },
  smsChange: function (event) {
    this.setData({
      sms: event.detail.value
    })
  },
  // 发送验证码
  sendSmsFun: function () {
    wx.cloud.callFunction({
      name: 'zhenzisms',
      data: {
        $url: 'sendCode',
        apiUrl: 'https://sms_developer.zhenzikj.com',
        message: '您的验证码为:{code}',
        number: this.data.phoneNum,
        messageId: 'sourceRoot',
        clientIp: '115.112.51.210',
        seconds: 60,
        length: 4
      }
    }).then((res) => {
      console.log(res)
      if (res.result.code === 'success') {
        Toast.success('已发送验证码')
      }
      else {
        Toast(res.result.msg)
      }
    }).catch((e) => {
      Toast.fail(e);
    });
  },
  //点击验证
  comfirmFunc: function () {
    // 此处模拟验证成功时候的页面跳转
    wx.navigateTo({
      url: '../modifyPwd/modifyPwd'
    })
    // 拿到phoneNum，从数据库查询是否有对应的手机号，找不到就不可以发送验证码
    //  如果用户输入的手机号码不为空，且长度等于11
    if (this.data.phoneNum !== '' && this.data.phoneNum.length === 11) {
      //  如果用户输入的验证码不为空，且长度等于4
      if (this.data.sms !== '' && this.data.sms.length === 4) {
        wx.cloud.callFunction({
          name: 'zhenzisms',
          data: {
            $url: 'validateCode',
            apiUrl: 'https://sms_developer.zhenzikj.com',
            number: this.data.phoneNum,
            code: this.data.sms
          }
        }).then((res) => {
          console.log(res)
          if (res.result.code === 'success') {
            //  验证成功则跳转页面，记录登录的用户
            Toast.success('验证成功！');
            wx.reLaunch({
              url: '../modifyPwd/modifyPwd'
            })
          }
          else {
            Toast(res.result.msg)
          }
        }).catch((e) => {
          Toast.fail(e);
        });
      }
      else {
        Toast('请输入四位数的验证码')
      }
    }
    else {
      Toast('请输入正确格式的手机号码')
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})