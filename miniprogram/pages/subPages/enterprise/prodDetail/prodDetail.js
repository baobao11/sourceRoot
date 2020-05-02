// miniprogram/pages/subPages/enterprise/prodDetail/prodDetail.js
const app = getApp()
const QR = require('../../../../utils/qrcode.js')
Page({
  /**
  *在查看详情页面，可以生成二维码并保存
  *对于传过来的item，获取其item._id
  *通过item._id从数据库取得完整的item（包含生产商和经销商）
  *然后遍历item，展示所有字段
  *生成二维码的时候要传入所有字段
  */
  /**
   * 页面的初始数据
   */
  data: {
    currentItem: {},
    params: '?',
    // 测试
    name: "lishi",
    canvasHidden: false,
    imagePath: '',
    placeholder: '../login/login',//默认二维码生成文本。我给我i你看啊看我怎么判断企业还是管理员
  },
  // 添加该产品信息
  inputInfoFunc: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let item = JSON.parse(options.item)
    let itemId = item._id
    let that =this
    let wholeItem = {}
    // 调用云函数getProd，获取完整item产品信息（经销商+生产商）
    wx.cloud.callFunction({
      name: 'getProd',
      data: {
        itemId: itemId
      }
    }).then((res) => {
      wholeItem = res.result.wholeItem
      that.setData({
        currentItem: wholeItem
      })
      // console.log(wholeItem)

      // 开始对每个字段补充道url的参数部分
      for (let key in wholeItem) {
        that.data.params = that.data.params + key + '=' + wholeItem[key] + '&'
      }
      let length = that.data.params.length
      that.data.params = that.data.params.slice(0,length-1)
      that.data.placeholder = that.data.placeholder + that.data.params
      
      //  测试
      var size = that.setCanvasSize();//动态设置画布大小
      var initUrl = that.data.placeholder;
      that.createQrCode(initUrl, "mycanvas", size.w, size.h);


      // console.log(that.data.params)
      // ?_id=9a393e025e73347c000557d23a9171df&_openid=ojPam5M_PgK33CzcmYQWvmyaxOJA&base=郑州生产基地&company=钱大妈&contact=1&dateValue=2020-03-19&describe=翠绿，可生吃&license=1&origin=河南&pic=123&prodName=生菜&sellArea=1&seller=true&sellerName=1&specs=400g-500g
    })
    
  },
  // 测试
  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 350;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
    setTimeout(() => { this.canvasToTempImage(); }, 1000);
  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        that.setData({
          imagePath: tempFilePath,
          // canvasHidden:true
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  //点击图片进行预览，长按保存分享图片
  previewImg: function (e) {
    var img = this.data.imagePath;
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },

  // 下载二维码
  downloadCode: function (res) {
    var filePath = this.data.imagePath
    console.log('下载中' + filePath)
    wx.saveImageToPhotosAlbum({
      filePath: filePath,
      success: function (res) {
        wx.showToast({
          title: '图片保存成功',
          icon: 'success',
          duration: 2000 //持续的时间
        })
      },
      fail: function (err) {
        console.log(err)
        wx.showToast({
          title: '图片保存失败',
          icon: 'none',
          duration: 2000//持续的时间
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