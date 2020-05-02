// miniprogram/pages/subPages/enterprise/enterpriseInfo/enterpriseInfo.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: app.globalData.phoneNum,
    enterInfo: {
      compName: '',
      compDescribe: '',
      compAddr: '',
      compContact: ''
    }
  },
  // 提交企业信息数据
  submitFunc: function () {
    let that = this
    wx.cloud.callFunction({
      name: 'enterpriseInfo',
      data: {
        phoneNum: that.data.phoneNum,
        enterInfo: that.data.enterInfo
      }
    }).then((res) => {
      wx.showToast({
        title: '提交成功',
      })
      that.setData({
        enterInfo: {}
      })
    }).catch((e) => {
      wx.showToast({
        title: '提交失败',
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
// 从数据库获取企业信息，填入input框
    // let that = this
    // wx.cloud.callFunction({
    //   name: 'getEnterInfo',
    //   data: {
    //     phoneNum: app.globalData.phoneNum,
    //   }
    // }).then((res) => {
    //   console.log("res:" + JSON.stringify(res.result))
    // }).catch((e) => {
    //   console.log(e)
    // })
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
  compNameChange: function (event) {
    this.setData({
      'enterInfo.compName': event.detail.value
    })
  },
  compDescribeChange: function (event) {
    this.setData({
      'enterInfo.compDescribe': event.detail.value
    })
  },
  compAddrChange: function (event) {
    this.setData({
      'enterInfo.compAddr': event.detail.value
    })
  },
  compContactChange: function (event) {
    this.setData({
      'enterInfo.compContact': event.detail.value
    })
  }
})