// miniprogram/pages/subPages/enterprise/modifyPwd/modifyPwd.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    newPwd: '',
    newPwd2: '',
    phoneNum: app.globalData.phoneNum
  },
  //  提交并保存按钮
  submitFunc: function () {
    // 判断两次输入的新密码是否一致
    if (this.data.newPwd !== this.data.newPwd2) {
      wx.showToast({
        title: '密码不一致',
        icon: 'none'
      })
      return
    } else {
      // 调用云函数修改密码
      let that = this
      wx.cloud.callFunction({
        name: 'modifyPwd',
        data: {
          phoneNum: that.data.phoneNum,
          newPwd: that.data.newPwd
        }
      }).then((res) => {
        wx.showToast({
          title: '提交成功',
        })
        wx.switchTab({
          url: '../../user/user',
        })
      }).catch((e) => {
        wx.showToast({
          title: e.detail,
          icon: 'none'
        })
      });
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
    this.setData({
      phoneNum: app.globalData.phoneNum
    })
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
  // 各个字段的输入事件
  // oldPwdChange: function (event) {
  //   this.setData({
  //     oldPwd: event.detail.value
  //   })
  // },
  newPwdChange: function (event) {
    this.setData({
      newPwd: event.detail.value
    })
  },
  newPwd2Change: function (event) {
    this.setData({
      newPwd2: event.detail.value
    })
  }
})