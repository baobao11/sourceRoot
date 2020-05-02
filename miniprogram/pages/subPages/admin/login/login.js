// miniprogram/pages/subPages/admin/login/login.js
const app = getApp()
// 获取user-record数据库
const db = wx.cloud.database()
const user = db.collection('user-record')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: "",
    pwd: ""
  },
  // 登录
  loginFun: function () {
    let that = this
    let userExist = false
    user.get({
      success: (res) => {
        let userList = res.data
        for (let i = 0; i < userList.length; i++) {
          if (this.data.phoneNum === userList[i].phoneNum && this.data.pwd === userList[i].pwd
            && userList[i].identity === 'admin') {
            userExist = true
            break
          }
        }
        // 管理员存在，调用登录接口
        if (userExist === true) {
          wx.cloud.callFunction({
            name: 'login',
          }).then((res) => {
            // 登录成功后才设置
            app.globalData.myOpenId = res.result.event.userInfo.openId
            app.globalData.phoneNum = that.data.phoneNum
            // 管理员身份---3*3=9
            app.globalData.identity = app.globalData.identity * app.globalData.identity
            wx.switchTab({
              url: '../../../user/user'
            })
          });
        }
      }
    })


    
  },
  // 
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
  },
})