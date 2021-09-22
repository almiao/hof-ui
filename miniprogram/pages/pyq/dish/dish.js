// pages/pyq/dish/dish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      fileList:[
        ],
      files:[],
      mainFile:null,
      list: [{depName:"投资",depIntro:"信息"}], //部门相关信息的列表
      array:[0],//默认显示一个
      inputVal:[{name:"",use:""}],
      spiArray:[0],
      spiInputVal:[{name:"",use:""}],
      stepArray:[0],
      stepInputVal:[
        {
          files:[],
          desc:""
        }
      ]
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

  afterRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    var that = this;
    wx.uploadFile({
      url: 'http://www.tangle.ink:9200/file/upload', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { },
      success(res) {
        // 上传完成需要更新 fileList
        console.log(res);
        that.setData({
          fileList : that.data.fileList.concat({url:"http://www.tangle.ink:9200/file/download?fileId="+res.data,isImage:true})
          });
        console.log(that.data);
      },
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

    chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          mainFile: res.tempFilePaths
        });
      }
    })
    console.log(that.data.files)
  },
  chooseStepImage: function(e) {
    var nowIdx=e.currentTarget.dataset.idx;//获取当前索引
    var oldVal=this.data.stepInputVal;
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log(res.tempFilePaths)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        oldVal[nowIdx].files =  oldVal[nowIdx].files.concat(res.tempFilePaths)
        that.setData({
          stepInputVal:oldVal,
        });
        console.log(that.data)
      }
    })

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
          that.setData({
            mainFile: null
          })
        } else if (res.cancel) {

        }
      }
    })
  },

  getNameVal:function(e){
    var nowIdx=e.currentTarget.dataset.idx;//获取当前索引
    var val=e.detail.value;//获取输入的值
    var oldVal=this.data.inputVal;
    oldVal[nowIdx].name=val;//修改对应索引值的内容
    this.setData({
        inputVal:oldVal
    })
  },
  getSpiNameVal:function(e){
    var nowIdx=e.currentTarget.dataset.idx;//获取当前索引
    var val=e.detail.value;//获取输入的值
    var oldVal=this.data.spiInputVal;
    oldVal[nowIdx].name=val;//修改对应索引值的内容
    this.setData({
        spiInputVal:oldVal
    })
  },

  getUseVal:function(e){
    var nowIdx=e.currentTarget.dataset.idx;//获取当前索引
    var val=e.detail.value;//获取输入的值
    var oldVal=this.data.inputVal;
    oldVal[nowIdx].use=val;//修改对应索引值的内容
    this.setData({
        inputVal:oldVal
    })
  },

  getSpiUseVal:function(e){
    var nowIdx=e.currentTarget.dataset.idx;//获取当前索引
    var val=e.detail.value;//获取输入的值
    var oldVal=this.data.spiInputVal;
    oldVal[nowIdx].use=val;//修改对应索引值的内容
    this.setData({
        spiInputVal:oldVal
    })
  },

  getStepUseVal:function(e){
    var nowIdx=e.currentTarget.dataset.idx;//获取当前索引
    var val=e.detail.value;//获取输入的值
    var oldVal=this.data.stepInputVal;
    oldVal[nowIdx].use=val;//修改对应索引值的内容
    this.setData({
        spiInputVal:oldVal
    })
  },

  //添加input
  addSpiInput:function(){
      var old=this.data.spiArray;
      old.push(1);//这里不管push什么，只要数组长度增加1就行
      var oldInputVal=this.data.spiInputVal;//所有的input值
      oldInputVal.push({name:"",use:""});
      this.setData({
          spiArray: old
      })
  },

    //添加input
    addStepInput:function(){
      var old=this.data.stepArray;
      old.push(1);//这里不管push什么，只要数组长度增加1就行
      var oldInputVal=this.data.stepInputVal;//所有的input值
      oldInputVal.push({files:[],desc:""});
      this.setData({
          stepArray: old
      })
      console.log(this.data)
  },

//添加input
addInput:function(){
  var old=this.data.array;
  old.push(1);//这里不管push什么，只要数组长度增加1就行
  var oldInputVal=this.data.inputVal;//所有的input值
  oldInputVal.push({name:"",use:""});
  this.setData({
      array: old
  })
  console.log(this.data)
},
//删除input
delInput:function(e){
    var nowidx=e.currentTarget.dataset.idx;//当前索引
    var oldInputVal=this.data.inputVal;//所有的input值
    var oldarr=this.data.array;//循环内容
    oldarr.splice(nowidx,1);    //删除当前索引的内容，这样就能删除view了
    oldInputVal.splice(nowidx,1);//view删除了对应的input值也要删掉
    if (oldarr.length < 1) {
        oldarr = [0]  //如果循环内容长度为0即删完了，必须要留一个默认的。这里oldarr只要是数组并且长度为1，里面的值随便是什么
    }
    this.setData({
        array:oldarr,
        inputVal: oldInputVal
    })
},
//删除input
delSpiInput:function(e){
  var nowidx=e.currentTarget.dataset.idx;//当前索引
  var oldInputVal=this.data.spiInputVal;//所有的input值
  var oldarr=this.data.spiArray;//循环内容
  oldarr.splice(nowidx,1);    //删除当前索引的内容，这样就能删除view了
  oldInputVal.splice(nowidx,1);//view删除了对应的input值也要删掉
  if (oldarr.length < 1) {
      oldarr = [0]  //如果循环内容长度为0即删完了，必须要留一个默认的。这里oldarr只要是数组并且长度为1，里面的值随便是什么
  }
  this.setData({
      spiArray:oldarr,
      spiInputVal: oldInputVal
  })
}


})