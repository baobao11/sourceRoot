// miniprogram/pages/subPages/admin/check/check.js
// 获取数据库
import Dialog from '../../../../miniprogram_npm/vant-weapp/dialog/dialog';
const db = wx.cloud.database()
const user = db.collection('user-record')
const checking = db.collection('checking')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkList:[]
  },
  // 查看详情
  applyDetailFunc: function (event) {
    let item = event.currentTarget.dataset.set
    // 传递某个企业item
    wx.navigateTo({
      url: '../checkDetail/checkDetail?item=' + JSON.stringify(item),
    })
  },
  // 审核
  decideFunc: function (event) {
    let item = event.currentTarget.dataset.item
    var that = this
    // 此处出现对话框，审核是否通过。
    wx.showActionSheet({
      itemList: ['通过审核', '不通过'],
      success(res) {
        if (res.tapIndex === 0) {
          // 把该申请人的手机号码和密码加入数据库
          let userExist = false
          user.get({
            success: (res) => {
              let userList = res.data
              for (let i = 0; i < userList.length; i++) {
                if (item.phoneNum === userList[i].phoneNum) {
                  userExist = true
                  break
                }
              }
              if (userExist === false) {
                user.add({
                  data: {
                    phoneNum: item.phoneNum,
                    pwd: item.pwd,
                    identityID: item.identityID,
                    identity: item.identity,
                    address: item.address,
                    email: item.email,
                    trade: item.trade,
                    name: item.name
                  }
                }).then((res) => {
                  wx.showToast({
                    title: '审核通过',
                  })
                  // checkRemoveFunc中调用云函数checkRemove
                  // 将该企业从审核列表移除
                  that.checkRemoveFunc(item)
                }).catch((e) => {
                  wx.showToast({
                    title: e,
                    icon: 'none'
                  })
                });   
              }
            }
          })
        } else if (res.tapIndex === 1) {
          that.checkRemoveFunc(item)
        } else {
          return
        }
      }
    });
  },
  // 删除当前操作审核的数据项（checking删除某个数据项）
  checkRemoveFunc: function (item) {
    let that =this
    wx.cloud.callFunction({
      name: 'checkRemove',
      data: {
        phoneNum: item.phoneNum
      }
    }).then((res) => {
      wx.showToast({
        title: '操作成功',
      })
      that.checkListUpdate()
    })
  },
  // 更新checkList
  checkListUpdate: function() {
    let that = this
    checking.get({
      success: (res) => {
        that.setData({
          checkList: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    checking.get({
      success: (res) => {
        that.setData({
          checkList : res.data
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