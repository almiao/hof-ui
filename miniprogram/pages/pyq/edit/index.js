const app = getApp();

const utilApi = require('../../../utils/util.js')

Page({
  data: {
    openid: undefined,
    adminOpenid: "oOmqu4pDpN-1db4Ms_U0fjmCfBAw", //管理员openid
    textareaTxt: undefined,
    article: undefined,
    maxDate: new Date().getTime(),
    minDate: new Date(2018, 1, 1).getTime(),
    currentDate: new Date().getTime(),

    files: [],
    adminInfo: {
      avatarUrl: "cloud://zhku-01.7a68-zhku-01-1258022644/home/logo1.jpg", //官方账号头像 
      nickName: "仲恺微校园" //官方账号名称
    },
    userInfo: undefined,
    sendList: [{
      name: "默认",
      isSelect: true
    }, {
      name: "官方",
      isSelect: false
    }],
    options: [{
      city_id: '001',
      city_name: '北京'
    }, {
      city_id: '002',
      city_name: '上海'
    }, {
      city_id: '003',
      city_name: '深圳'
    }],
    selected: {},
    menu:[],
    isShown:false

  },
  change (e) {
    let that = this;
    console.log(that.data.menu),
    this.setData({
      selected: { ...e.detail }
    })
    wx.showToast({
      title: `${this.data.selected.id} - ${this.data.selected.name}`,
      icon: 'success',
      duration: 1000
    })
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
      currentDateStr: utilApi.formatDate(event.detail)
    });
  },  
  close () {
    // 关闭select
    this.selectComponent('#select').close()
  },

  bindChangeUser(e) {
    console.log(e.currentTarget.dataset.index)
    var tab = this.data.sendList
    var that = this
    for (var i = 0; i < tab.length; i++) {
      tab[i].isSelect = false
    }
    tab[e.currentTarget.dataset.index].isSelect = true


    if (e.currentTarget.dataset.index === 1) {
      this.setData({
        userInfo: {
          avatarUrl: "cloud://zhku-01.7a68-zhku-01-1258022644/home/logo1.jpg",
          nickName: "仲恺微校园"
        }
      })
    }
    if (e.currentTarget.dataset.index === 0) {
      wx.getUserInfo({
        success(res) {
          that.setData({
            userInfo: res.userInfo
          })
        }
      })
    }
    this.setData({
      sendList: tab
    })
  },

  bindChangeTab(e) {
    console.log(e.currentTarget.dataset.index)
    var tab = this.data.tabList
    for (var i = 0; i < tab.length; i++) {
      tab[i].isSelect = false
    }
    tab[e.currentTarget.dataset.index].isSelect = true
    this.setData({
      tabList: tab
    })
  },
  onLoad() {
    // 查看是否授权
    var that = this;
    wx.request({
      url:"https://www.tangle.ink:9200/menu/list/my?userId=1",
      method:"GET",
      success: function(res) {
          //这样直接赋值并不会把数据渲染到页面上的    不过 0.9版本的时候这样做是可以的  
          that.setData({
            menu:res.data.dishes,
            isShown:true,
          })
      }
    });
    console.log("hahah",this.data.menu);
  },  
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
  },

  getInputGzh(e) {
    wx.showToast({
      title: '仅支持认证用户',
      icon: 'none'
    })
    var that = this
    if (e.detail.value.includes("https://mp.weixin.qq.com/s/")) {
      wx.showToast({
        title: '正在解析链接',
        icon: 'none'
      })
      console.log("从")
      wx.cloud.callFunction({
        name: 'wxparse',
        data: {
          url: e.detail.value
        }
      }).then(res => {
        if (res.result.data.code !== 0) {
          wx.showToast({
            title: '文章解析失败,请确认链接无误',
            icon: 'none'
          })
        }
        var title = res.result.data.data.msg_title
        var msg_cover = res.result.data.data.msg_cover
        that.setData({
          article: {
            title: title,
            url: e.detail.value,
            msg_cover: msg_cover
          }
        })
        console.log(res)
      })
    }
  },

  saveEditOrNot(e) {
    wx.switchTab({
      url: '../circle/index',
    })
    // wx.showModal({
    //   title: '将此次编辑保留',
    //   content: '',
    //   cancelText: '不保留',
    //   confirmText: '保留',
    //   success(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       wx.navigateBack({
    //         delta: 1
    //       })
    //     }
    //   }
    // })
  },

  deleteImg(e) {
    var that = this
    wx.vibrateShort({

    })
    wx.showModal({
      title: '确认删除',
      content: '',
      cancelText: '取消',
      confirmText: '确认',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var data = that.data.files
          data.splice(e.currentTarget.dataset.index, 1)
          that.setData({
            files: data
          })
        } else if (res.cancel) {

        }
      }
    })



  },

  getInputValue(e) {
    this.setData({
      textareaTxt: e.detail.value
    })
  },



  formSubmit: function(e) {
    var that = this
    var num = 0
    var tabList = that.data.tabList
    var tab = undefined
    for (let i = 0; i < tabList.length; i++) {
      if (tabList[i].isSelect) {
        tab = tabList[i].name
      }
    }
    if (!tab) {
      wx.showToast({
        title: '请选择一个标签',
        icon: 'none',
      })
      return
    }
    console.log(tab)
    if (!this.data.userInfo) {
      wx.showToast({
        title: '未授权,2秒后跳转授权页面',
        icon: 'none',
      })
      setTimeout(() => {
        wx.reLaunch({
          url: '../circle/index',
        })
      }, 2000)
      return
    }
    if (!that.data.textareaTxt && that.data.files.length <= 0) {
      wx.showToast({
        title: '内容为空',
        icon: 'none',
      })
    } else {
      wx.showNavigationBarLoading()
      wx.showLoading({
        title: '正在提交数据',
      })
      var tempIds = [];
      const db = wx.cloud.database()
      if (that.data.files.length === 0) {
        //内容安全检测
        wx.cloud.callFunction({
          name: 'msgCheck',
          //87014 违规 0成功
          data: {
            type: 'text',
            content: that.data.textareaTxt,
          },
        }).then(res => {
          console.log(that.data.textareaTxt)
          console.log(res)
          //检测到内容违规 标记
          if (res.result.errCode !== 0) {
            wx.showToast({
              title: '内容违规!发布违法违规内容将被永久封禁',
              icon: 'none',
              duration: 5000
            })
          } else {
            //继续
            db.collection('circle').add({
              data: {
                userInfo: this.data.userInfo,
                createTime: db.serverDate(),
                content: this.data.textareaTxt,
                time: new Date().getTime(),
                zans: [],
                images: [],
                comments: [],
                tab: tab,
                isTop: false,
                article: this.data.article,
              },
              success: res => {
                wx.hideLoading()
                wx.showToast({
                  title: '提交成功',
                  icon: 'success'
                })
                wx.reLaunch({
                  url: '../circle/index',
                })
              }
            })
          }
        })
      }

      if (that.data.files.length > 0) {
        var tempIds = [];
        for (var i = 0; i < that.data.files.length; i++) {
          const filePath = that.data.files[i]
          var rn = Math.floor(Math.random() * 10000 + 1) //随机数
          var name = Date.parse(new Date()) / 1000; //时间戳
          const cloudPath = 'circle/' + that.data.userInfo.nickName + "/" + rn + name + filePath.match(/\.[^.]+?$/)[0]
          wx.cloud.uploadFile({
            cloudPath: cloudPath,
            filePath: filePath,
            success: res => {
              console.log(res)
              tempIds.push(res.fileID)
              num = num + 1
              if (num === that.data.files.length) {
                console.log(that.data.textareaTxt)
                var con = that.data.textareaTxt
                if (!con) {
                  con = 123
                }
                //内容安全检测
                wx.cloud.callFunction({
                  name: 'msgCheck',
                  //87014 违规 0成功
                  data: {
                    type: 'text',
                    content: con,

                  },
                }).then(res => {
                  console.log(res.result)
                  //检测到内容违规 标记
                  if (res.result.errCode !== 0) {
                    wx.showToast({
                      title: '内容违规!发布违法违规内容将被永久封禁',
                      icon: 'none',
                      duration: 5000
                    })
                  } else {
                    db.collection('circle').add({
                      data: {
                        userInfo: this.data.userInfo,
                        content: this.data.textareaTxt,
                        createTime: db.serverDate(),
                        time: new Date().getTime(),
                        zans: [],
                        images: tempIds,
                        comments: [],
                        tab: tab,
                        isTop: false,
                        article: this.data.article,


                      },
                      success: res => {
                        wx.hideLoading()
                        wx.showToast({
                          title: '提交成功',
                          icon: 'success'
                        })
                        wx.reLaunch({
                          url: '../circle/index',
                        })
                      },
                    })
                  }
                })
              }
            },
          })
        }
      }
    }
  },

  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
    console.log(that.data.files)
  },

  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  }
})