// miniprogram/pages/subPages/enterprise/register/register.js
import Toast from '../../../../miniprogram_npm/vant-weapp/toast/toast.js';
import Dialog from '../../../../miniprogram_npm/vant-weapp/dialog/dialog';
const db = wx.cloud.database()
const checking = db.collection('checking')
const user = db.collection('user-record')
const sms = db.collection('sms-record')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 第一个字段的身份选择
    identityRadio: 'sellRadio',
    phoneNum: '',
    pwd: '',
    name: '',
    identityID: '',
    trade: '',
    email: '',
    address: ''
  },
  // 判断是否为有效邮箱号码
  isEmailAvailable: function (email) {
    var myreg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if (!myreg.test(email)) {
      return false;
    } else {
      return true;
    }
  },
    // 判断是否为有效手机号码
  isPoneAvailable: function (pone) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(pone)) {
      return false;
    } else {
      return true;
    }
  },
  // 提交审核按钮
  registerFunc: function() {
    let that = this
    let flag = false    // phoneNum是否存在
    // 调用isPoneAvailable判断手机号码是否有效
    if (this.isPoneAvailable(this.data.phoneNum) === false) {
      Toast('手机号码无效')
      return
    }
    // 调用isEmailAvailable判断邮箱是否有效
    if (this.isEmailAvailable(this.data.email) === false) {
      Toast('邮箱无效')
      return
    }
    // 判断手机号是否已经被注册
    user.get({
      success: (res) => {
        let userList = res.data
        for (let i = 0; i < userList.length; i++) {
          if (that.data.phoneNum === userList[i].phoneNum) {
            flag = true
            break
          }
        }
        if (flag === true) {
          Toast('该手机号已经被注册了')
        } else {
          that.saveUserInfo()
        }
      },
      fail: (res) => {
        Toast(res)
      }
    })
  },
  // 将注册的数据添加到checking审核列表的数据库中
  saveUserInfo: function () {
    let that = this
    // add添加checking数据
    checking.add({
      data: {
        identity: that.data.identityRadio,
        phoneNum: that.data.phoneNum,
        pwd: that.data.pwd,
        name: that.data.name,
        identityID: that.data.identityID,
        trade: that.data.trade,
        email: that.data.email,
        address: that.data.address
      }
    }).then((res) => {
      Dialog.alert({
        title: '提示',
        message: '已提交审核'
      }).then(() => {
        wx.switchTab({
          url: '../../../index/index',
        })
      });
    }).catch((e) => {
      Toast(e);
    });
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
  // 身份单选框
  identityRadioChange: function (event) {
    this.setData({
      identityRadio: event.detail
    });
  },
  // 各个字段的输入事件
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
  nameChange: function (event) {
    this.setData({
      name: event.detail.value
    })
  },
  identityIDChange: function (event) {
    this.setData({
      identityID: event.detail.value
    })
  },
  tradeChange: function (event) {
    this.setData({
      trade: event.detail.value
    })
  },
  emailChange: function (event) {
    this.setData({
      email: event.detail.value
    })
  },
  addressChange: function (event) {
    this.setData({
      address: event.detail.value
    })
  }
})