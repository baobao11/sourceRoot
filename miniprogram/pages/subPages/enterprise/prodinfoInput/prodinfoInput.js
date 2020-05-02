// miniprogram/pages/subPages/enterprise/prodinfoInput/prodinfoInput.js
const db = wx.cloud.database()
const prodRecord = db.collection('prod-record')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    itemId: '',
    update: false,
    producer: {
      prodName: "",
      prodorigin: "",
      proddate: "年/月/日",
      proddescribe: '',
      prodspecs: '',
      prodcompany: '',
      prodbase: '',
      prodcontact: '',
      prodlicense: '',
      prodpic: ''
    }
    
  },
  // 提交，生成二维码
  submitFunc: function () {
    let that = this
    let producer = this.data.producer
    // 每个字段都应该填写
    if (producer.prodName === '' || producer.prodorigin === '' || producer.proddate === '年/月/日' || producer.proddescribe === '' || producer.prodspecs === '' || producer.prodcompany === '' || producer.prodbase === '' || producer.prodcontact === '' || producer.prodlicense === '') {
      wx.showToast({
        title: '有字段未填写',
        icon: 'none'
      })
      return
    }
    // 从“添加产品信息”进入此页面
    // 如果update是true，调用云函数producerUpdate更新数据库
    if (this.data.update === true) {
      wx.cloud.callFunction({
        name: 'producerUpdate',
        data: {
          itemId: that.data.itemId,
          producer: that.data.producer
        }
      }).then( (res) => {
        wx.showToast({
          title: '添加成功',
        })
        }).catch((e) => {
          wx.showToast({
            title: '提交失败',
            icon: 'none'
          })
        });
    } else {
    // 从“生产商信息编辑”进入此页面
    //  将各个字段添加到prod-record数据库  
      prodRecord.add({
        data: {
          prodName: that.data.producer.prodName,
          prodorigin: that.data.producer.prodorigin,
          proddate: that.data.producer.proddate,
          proddescribe: that.data.producer.proddescribe,
          prodspecs: that.data.producer.prodspecs,
          prodcompany: that.data.producer.prodcompany,
          prodbase: that.data.producer.prodbase,
          prodcontact: that.data.producer.prodcontact,
          prodlicense: that.data.producer.prodlicense,
          prodpic: that.data.producer.prodpic
        }
      }).then((res) => {
        wx.showToast({
          title: '添加产品成功',
        })
        that.setData({
          'producer.prodName': '',
          'producer.prodorigin': '',
          'producer.proddate': '年/月/日',
          'producer.proddescribe': '',
          'producer.prodspecs': '',
          'producer.prodcompany': '',
          'producer.prodbase': '',
          'producer.prodcontact': '',
          'producer.prodlicense': '',
          'producer.prodpic': ''
        })
      }).catch((e) => {
        wx.showToast({
          title: e,
          icon: 'none'
        })
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (JSON.stringify(options) !== '{}') {
      let itemId = JSON.parse(options.itemId)
      let update = JSON.parse(options.update)   // update记录是要往prod-record增加数据还是更新数据
      this.setData({
        itemId: itemId,
        update: update
      })
      // 如果update为true，从数据库取数据，van-field填初始数据
    }
    
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
  // 各个输入字段的输入事件
  datePickerBindchange: function (e) {
    this.setData({
      'producer.proddate': e.detail.value
    })
  },
  // van-field 生产名称
  prodNameChange: function (event) {
    this.setData({
      'producer.prodName': event.detail.value
    })
  },
  // van-field 生产地区
  originChange: function (event) {
    this.setData({
      'producer.prodorigin': event.detail.value
    })
  },
  describeChange: function (event) {
    this.setData({
      'producer.proddescribe': event.detail.value
    })
  },
  specsChange: function (event) {
    this.setData({
      'producer.prodspecs': event.detail.value
    })
  },
  companyChange: function (event) {
    this.setData({
      'producer.prodcompany': event.detail.value
    })
  },
  baseChange: function (event) {
    this.setData({
      'producer.prodbase': event.detail.value
    })
  },
  contactChange: function (event) {
    this.setData({
      'producer.prodcontact': event.detail.value
    })
  },
  licenseChange: function (event) {
    this.setData({
      'producer.prodlicense': event.detail.value
    })
  },
  picChange: function (event) {
    this.setData({
      'producer.prodpic': event.detail.value
    })
  }
})