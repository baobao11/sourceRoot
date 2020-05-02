//index.js
const app = getApp()
Page({
  /**
   * 页面加载时，先获取全局变量，根据identity，设置不同的权限（企业可以添加产品信息，管理员可以查看审核列表）
   * 扫一扫功能对所有开放
   * 
  */
  data: {
    scanCodeMsg: "",
    identity: app.globalData.identity,
    prodOrSell: app.globalData.prodOrSell
  },
  splitArr: function (arr) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
      var split = arr[i].split(':');
      obj[split[0]] = split[1];
    }
    return obj;
  },
  // 扫码信息
  // charSet: "utf-8"
  // errMsg: "scanCode:ok"
  // rawData: "OTc4NzExNTUwOTA1NQ=="
  // result: "9787115509055"
  // scanType: "EAN_13"
  scanCode: function () {
    var that = this;
    wx.scanCode({
      success(res) {
        // 在这里解析二维码的字符串
        // console.log(res.result)
        // 当前result就是扫码查询的产品对象
        let result = that.splitArr(res.result.split("?")[1].replace(/=/g, ":").split('&'))
        // 把result对象传递给prodDetail页面
        wx.navigateTo({
          url: '../subPages/scanProd/scanProd?item=' + JSON.stringify(result),
        })
        wx.showToast({
          title: '成功',
          duration: 1000
        })
      },
      fail(res) {
        wx.navigateTo({
          url: '../subPages/scanError/scanError'
        })
      },
      error(e) {
        wx.showToast({
          title: e.detail,
        })
      }
    })
  },
  
  // 查看审核列表
  checkFunc: function () {
    wx.navigateTo({
      url: '../subPages/admin/check/check',
    })
    // // 生产商
    // wx.navigateTo({
    //   url: '../subPages/enterprise/prodinfoInput/prodinfoInput',
    // })
    // // 经销商
    // wx.navigateTo({
    //   url: '../subPages/enterprise/sellerInput/sellerInput',
    // })
  },
  // 管理产品信息
  manageProdFunc: function () {
    wx.navigateTo({
      url: '../subPages/enterprise/manageProd/manageProd',
    })
  },
  // 添加产品信息
  addProdFunc: function () {
    wx.navigateTo({
      url: '../subPages/enterprise/prodinfoInput/prodinfoInput',
    })
  },
  // 生产商已经添加的信息
  beAddedFunc: function () {
    wx.navigateTo({
      url: '../subPages/enterprise/prodBeAdded/prodBeAdded',
    })
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      identity: app.globalData.identity,
      prodOrSell: app.globalData.prodOrSell
    })
  },
  /**
 * 生命周期函数--监听页面隐藏
 */
  onHide: function () { },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { },

})