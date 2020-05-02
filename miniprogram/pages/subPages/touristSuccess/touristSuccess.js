// pages/subPages/touristSuccess/touristSuccess.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 产品对象
    identity: app.globalData.identity,
    product: {
      prodName: "name",     // 产品名称
      prodOrigin: "origin",   // 产地
      prodContact: "1234",  // 生产商联系方式
      prodDate: "2019年8月7日",   // 生产日期
      freshDate: "2019年8月7日",  // 保质期
      inportDate: "2019年8月7日", // 进货日期
      price: "99",        // 单价
      sellArea: "area",     // 经销地区
      sellContact: "5678",  // 经销商联系方式
    }
  },
  // 生产商/经销商录入信息按钮
  inputInfoFunc:function() {
    if(this.identity === 2) {
      wx.navigateTo({
        url: '../producerInput/producerInput'
      })
    }
    else if(this.identity === 3) {
      wx.navigateTo({
        url: '../sellerInput/sellerInput'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.identity = app.globalData.identity
    // 扫码成功后显示，在这里才解析
    // 从二维码字符串解析出的数据展示信息
    // 此处补充从index扫码后传过来的数据。。。。
    //赋值给全局数据product
    // console.log("tour,onload product:" + this.product)
    app.globalData.product = this.data.product
    console.log("tour,onload globalData.product:" + app.globalData.product)
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