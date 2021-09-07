// pages/pyq/final/final.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu:[],
    isShown:false,
    fileList: [],
    matFiles:[],
    matFileDetails:[],
    spiFiles:[],
    spiFileDetails:[],
    segFiles:[],
    setFileDetails:[],
    cookFiles:[],
    cookFileDetails:[],
    finFiles:[],
    finFileDetails:[],

    curMatDate:'',
    curMatName:'',
    curMatUse:'',
    curMatMark:'',
    currentIndex:0,

    spiDate:'',
    spiName:'',
    spiUse:'',
    spiMark:'',
    curSpiIndex:0,

    segDate:'',
    segName:'',
    segUse:'',
    segMark:'',
    curSetIndex:0,

    cookDate:'',
    cookName:'',
    cookUse:'',
    cookMark:'',
    curCookIndex:0,

    finDate:'',
    finName:'',
    finUse:'',
    finMark:'',
    curFinIndex:0,
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

  chooseImage1: function(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var rFileDetails = new Array();
        res.tempFilePaths.forEach(element => {
          rFileDetails.push({curMatName:'',curMatDate:'',curMatUse:'',curMatMark:''})
        });
        console.log("rFileDetails",rFileDetails)
        that.setData({
          matFiles: that.data.matFiles.concat(res.tempFilePaths),
          matFileDetails:that.data.matFileDetails.concat(rFileDetails)
        });
      }
    })
  },

  chooseImage2: function(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var rFileDetails = new Array();
        res.tempFilePaths.forEach(element => {
          rFileDetails.push({spiName:'',spiDate:'',spiUse:'',spiMark:''})
        });
        console.log("rFileDetails",rFileDetails)
        that.setData({
          matFiles: that.data.spiFiles.concat(res.tempFilePaths),
          matFileDetails:that.data.spiFileDetails.concat(rFileDetails)
        });
      }
    })
  },
  chooseImage3: function(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var rFileDetails = new Array();
        res.tempFilePaths.forEach(element => {
          rFileDetails.push({segName:'',segDate:'',segUse:'',segMark:''})
        });
        console.log("rFileDetails",rFileDetails)
        that.setData({
          matFiles: that.data.segFiles.concat(res.tempFilePaths),
          matFileDetails:that.data.setFileDetails.concat(rFileDetails)
        });
      }
    })
  },
  chooseImage4: function(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var rFileDetails = new Array();
        res.tempFilePaths.forEach(element => {
          rFileDetails.push({cookName:'',cookDate:'',cookUse:'',cookMark:''})
        });
        console.log("rFileDetails",rFileDetails)
        that.setData({
          matFiles: that.data.cookFiles.concat(res.tempFilePaths),
          matFileDetails:that.data.cookFileDetails.concat(rFileDetails)
        });
      }
    })
  },
  chooseImage5: function(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var rFileDetails = new Array();
        res.tempFilePaths.forEach(element => {
          rFileDetails.push({finName:'',finDate:'',finUse:'',finMark:''})
        });
        console.log("rFileDetails",rFileDetails)
        that.setData({
          matFiles: that.data.finFiles.concat(res.tempFilePaths),
          matFileDetails:that.data.finFileDetails.concat(rFileDetails)
        });
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
  changeSwiper2: function (e) {
    const fileDetails = this.data.spiFileDetails;
    const index = this.data.curSpiIndex;
    fileDetails[index] = {spiName:this.data.spiName,spiDate:this.data.spiDate,spiMark:this.data.spiMark,spiUse:this.data.spiUse};
    var detail = fileDetails[e.detail.current];
    this.setData({
      spiFileDetails: fileDetails,
      curSpiIndex: e.detail.current,
      spiName:detail.spiName,
      spiDate:detail.spiDate,
      spiMark:detail.spiMark,
      spiUse:detail.spiUse,
    })
  },
  changeSwiper3: function (e) {
    const fileDetails = this.data.segFileDetails;
    const index = this.data.curSegIndex;
    fileDetails[index] = {segName:this.data.segName,segDate:this.data.segDate,segMark:this.data.segMark,segUse:this.data.segUse};
    var detail = fileDetails[e.detail.current];
    this.setData({
      segFileDetails: fileDetails,
      curSegIndex: e.detail.current,
      segName:detail.segName,
      segDate:detail.segDate,
      segMark:detail.segMark,
      segUse:detail.segUse,
    })
  },
  changeSwiper4: function (e) {
    const fileDetails = this.data.cookFileDetails;
    const index = this.data.curCookIndex;
    fileDetails[index] = {cookName:this.data.cookName,cookDate:this.data.cookDate,cookMark:this.data.cookMark,cookUse:this.data.cookUse};
    var detail = fileDetails[e.detail.current];
    this.setData({
      cookFileDetails: fileDetails,
      currentIndex: e.detail.current,
      cookName:detail.cookName,
      cookDate:detail.cookDate,
      cookMark:detail.cookMark,
      cookUse:detail.cookUse,
    })
  },
  changeSwiper5: function (e) {
    const fileDetails = this.data.finFileDetails;
    const index = this.data.curFinIndex;
    fileDetails[index] = {curMatName:this.data.curMatName,curMatDate:this.data.curMatDate,curMatMark:this.data.curMatMark,curMatUse:this.data.curMatUse};
    var detail = matFileDetails[e.detail.current];
    this.setData({
      matFileDetails: matFileDetails,
      currentIndex: e.detail.current,
      curMatName:detail.curMatName,
      curMatDate:detail.curMatDate,
      curMatMark:detail.curMatMark,
      curMatUse:detail.curMatUse,
    })
    console.log(this.data);
  },
  changeSwiper1: function (e) {
    const matFileDetails = this.data.matFileDetails;
    const index = this.data.currentIndex;
    matFileDetails[index] = {curMatName:this.data.curMatName,curMatDate:this.data.curMatDate,curMatMark:this.data.curMatMark,curMatUse:this.data.curMatUse};
    var detail = matFileDetails[e.detail.current];
    this.setData({
      matFileDetails: matFileDetails,
      currentIndex: e.detail.current,
      curMatName:detail.curMatName,
      curMatDate:detail.curMatDate,
      curMatMark:detail.curMatMark,
      curMatUse:detail.curMatUse,
    })
    console.log(this.data);
  },

  publish: function (e) {


  }

})
