// miniprogram/pages/user/user.js
const app = getApp()
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast.js';
Page({
// 用户权限设置
/**
 * 点击登录：1、选择某个身份，登录改变全局变量identity。登录时把用户的userInfo保存到全局变量。
 *          2、登录后跳转到登录页面，页面重新加载，拿到更新的全局变量中的openId和indentity。渲染到页面，
 *          同时，van-cell单元格根据不同的identity显示对应的权限
 * 修改密码：1、只有管理员和企业可以修改密码
 *          2、修改密码后，将新密码更新到数据库，跳转到登录页面，用户需要重新登录
 * 退出账号：1、小程序本身不提供退出登录接口，所以这里将user页面更新为未登录状态。
 *          2、设置isLogin为false，全局变量全部清空。
 */
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    myOpenId: '',
    identity: '',
    phoneNum: '',
    identityNum: '',
    prodOrSell: '',
    array: ['企业', '管理员', '普通游客']
  },
  // 身份选择
  bindPickerChange: function (e) {
    // 企业注册,跳转到企业注册页面
    if (e.detail.value === '0') {
      app.globalData.identity = 2
      wx.navigateTo({
        url: '../subPages/enterprise/login/login',
      })
    }
    // 管理员登录
    if (e.detail.value === '1') {
      app.globalData.identity = 3
      wx.navigateTo({
        url: '../subPages/admin/login/login',
      })
    }
    // 普通游客登录
    if (e.detail.value === '2') {
      app.globalData.identity = 5
      wx.navigateTo({
        url: '../subPages/login/login',
        success: function () {
          Toast('跳转到普通游客登录页面')
        },
        fail: function () {
          Toast('页面跳转失败')          
        }
      })
    }
  },
  // 企业信息管理
  enterpriseInfoFunc: function () {
    wx.navigateTo({
      url: '../subPages/enterprise/enterpriseInfo/enterpriseInfo',
    })
  },
  // 修改密码
  modifyPwdFunc: function () {
    wx.navigateTo({
      url: '../subPages/modifyPwd/modifyPwd',
    })
  },
  /**
  *关于小程序
  */
  showMyProgram() {
    wx.navigateTo({
      url: '../subPages/about/about',
    })
  },
  // 退出账号
  logoutFunc: function () {
    var that = this
    // 此处出现对话框，提示用户是否退出。
    wx.showActionSheet({
      itemList: ['确定退出', '取消'],
      success(res) {
        if (res.tapIndex === 0) {
          // 退出账号后跳转到没有登录时候的user页面
          app.globalData.identity = 0
          app.globalData.myOpenId = '',
          app.globalData.phoneNum = '',
          app.globalData.prodOrSell = '',
          that.setData({
            isLogin: false
          })
          that.onShow()
        } else{
          return
        }
      },
      fail(res) {
        Toast.fail(res.errMsg)
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   * 从二级页面返回该页面时，onLoad不会再次加载，而onshow会重新加载。
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
    // 页面加载时，获取全局变量
    this.setData({
      myOpenId: app.globalData.myOpenId,
      identityNum: app.globalData.identity,
      prodOrSell: app.globalData.prodOrSell,
      phoneNum: app.globalData.phoneNum
    })
    // console.log("openid:" + this.data.myOpenId)
    // console.log("identityNum:" + this.data.identityNum)

    // 用户登录,切换isLogin
    if (this.data.phoneNum !== '') {
      // 插入代码
      this.setData({
        isLogin: true
      });
      if (this.data.identityNum !== 0) {
        if (this.data.identityNum === 4) {
          if (this.data.prodOrSell === 'prodRadio') {
            this.setData({
              identity: "生产商"
            })
          } else if (this.data.prodOrSell === 'sellRadio') {
            this.setData({
              identity: "经销商"
            })
          }
        }
        else if (this.data.identityNum === 9) {
          this.setData({
            identity: "管理员"
          })
        }
        else if (this.data.identityNum === 25) {
          this.setData({
            identity: "普通游客"
          })
        }
      }
      else {
        this.setData({
          identity: "普通游客"
        })
      }
    }
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