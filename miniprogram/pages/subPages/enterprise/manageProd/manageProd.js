// miniprogram/pages/subPages/enterprise/manageProd/manageProd.js
const db = wx.cloud.database()
const prodRecord = db.collection('prod-record')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 企业可管理的产品列表
    prodList: [],
    result: ['a', 'b']
  },
  // checkOnChange(event) {
  //   this.setData({
  //     result: event.detail
  //   });
  // },
  // 查看详情
  prodDetailFunc: function (event) {
    let item = event.currentTarget.dataset.item
    wx.navigateTo({
      url: '../prodDetail/prodDetail?item=' + JSON.stringify(item),
    })
  },
  // 添加信息
  addInfoFunc: function (event) {
    let id = event.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../sellerInput/sellerInput?itemId=' + JSON.stringify(id),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 从prod-record数据库中读取可管理的产品列表，赋值给prodList
    let that = this
    prodRecord.get({
      success: (res) => {
        that.setData({
          prodList: res.data
        })
      }
    })
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