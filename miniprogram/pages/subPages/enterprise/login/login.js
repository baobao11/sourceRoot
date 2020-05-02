// miniprogram/pages/subPages/enterprise/login/login.js
const app = getApp()
const db = wx.cloud.database()
const user = db.collection('user-record')
import Toast from '../../../../miniprogram_npm/vant-weapp/toast/toast.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: "",
    pwd: "",
  },
  // 去注册
  urlToRegister: function () {
    wx.navigateTo({
      url: '../register/register',
    })
  },
  // 企业登录
  loginFun: function () {
    // 根据手机号和密码，从数据库中查询是否正确。
    // 正确则跳转首页，企业权限说明
    let that = this
    let userExist = false
    user.get({
      success: (res) => {
        let userList = res.data
        for (let i = 0; i < userList.length; i++) {
          if (that.data.phoneNum === userList[i].phoneNum && that.data.pwd === userList[i].pwd
            && userList[i].identity !== 'admin') {
              // 全局变量prodOrSell记录是生产商还是经销商
            app.globalData.prodOrSell = userList[i].identity
            userExist = true
            break
          }
        }
        // 登录成功
        if (userExist === true) {
          wx.cloud.callFunction({
            name: 'login',
          }).then((res) => {
            // res.result.event.myOpenId
            app.globalData.myOpenId = res.result.event.userInfo.openId
            app.globalData.phoneNum = this.data.phoneNum
            // 企业身份---2*2=4
            app.globalData.identity = app.globalData.identity * app.globalData.identity
            wx.showToast({
              title: '登录成功',
            })
            wx.switchTab({
              url: '../../../user/user',
            })
          }).catch((e) => {
            Toast(e.detail)
          });
        } else {
          wx.showToast({
            title: '登录失败',
          })
        }
      }
    })
    // ***
    // 补充代码
    // ****
   
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

  },
  // 字段的输入事件
  phoneChange: function (event) {
    this.setData({
      phoneNum: event.detail.value
    })
  },
  pwdChange: function (event) {
    this.setData({
      pwd: event.detail.value
    })
  }
})