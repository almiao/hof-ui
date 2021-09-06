// pages/pyq/final/final.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu:[],
    isShown:false,
    fileList: [],
    files:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
          console.log(res.data.dishes)
      }
    });
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

  close () {
    // 关闭select
    this.selectComponent('#select').close()
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
        console.log("选择图片成功",that.files)
      }
    })

  },
  afterRead(event) {
    const that = this;
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://www.tangle.ink:9200/file/upload', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = that.data.fileList;
        fileList.push({ ...file, url: res.data });
        that.setData({ fileList });
        console.log("upload picture success")
      },
      fail(e){
        console.log("eeeeeeeee",e)
      }
    });
  },
})