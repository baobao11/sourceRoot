// pages/subPages/sellerInput/sellerInput.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    itemId: '',
    seller:{
      sellName: '',
      sellArea: '',
      sellcontact: '',
      selllicense: '',
      selldate: "年/月/日"
    }
  },
  // 提交
  submitFunc: function () {
    // 对每个字段进行判断，提交不能为空
    let seller = this.data.seller
    if (seller.sellName === '' || seller.sellArea === '' || seller.sellcontact === '' || seller.selllicense === '' || 
      seller.selldate === '年/月/日') {
        wx.showToast({
          title: '请确保每个字段都有值',
        })
        return
    }
    // 对itemId插入数据,调用云函数sellerUpdate
    // console.log(this.data.itemId)
    // console.log(this.data.seller)
    let that = this
    wx.cloud.callFunction({
      name: 'sellerUpdate',
      data: {
        itemId: that.data.itemId,
        seller: that.data.seller
      }
    }).then((res) => {
      wx.showToast({
        title: '提交成功',
      })
    }).catch((e) => {
      wx.showToast({
        title: '提交失败',
      })
    });
  },
  // 测试二维码
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let itemId = JSON.parse(options.itemId)
    this.setData({
      itemId: itemId
    })
    // console.log(this.data.itemId)
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
  // 各个字段的输入事件
  sellNameChange: function (event) {
    this.setData({
      'seller.sellName': event.detail.value
    })
  },
  sellAreaChange: function (event) {
    this.setData({
      'seller.sellArea': event.detail.value
    })
  },
  sellcontactChange: function (event) {
    this.setData({
      'seller.sellcontact': event.detail.value
    })
  },
  selllicenseChange: function (event) {
    this.setData({
      'seller.selllicense': event.detail.value
    })
  },
  datePickerBindchange: function (e) {
    this.setData({
      'seller.selldate': e.detail.value
    })
  }
})