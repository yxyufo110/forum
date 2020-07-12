let gl = '';
Page({
  data: {
    points: [],
    brushState: 'p', //'p'-画笔；'c'-橡皮檫
    tinctList: ['#000000'],
    tinctCurr: 0, //当前画笔颜色
    tinctSize: 5, //画笔尺寸
  },

  onReady() {
    const query = wx.createSelectorQuery();
    query
      .select('#palette')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node;
        gl = canvas.getContext('2d');
      });
  },
  touchstart: function () {
    let tinct, lineWidth;
    if (this.data.brushState == 'p') {
      tinct = this.data.tinctList[this.data.tinctCurr];
      lineWidth = this.data.tinctSize;
    } else {
      tinct = '#ffffff';
      lineWidth = 20;
      gl.lineCap = 'round'; //设置线条端点的样式
      gl.lineJoin = 'round'; //设置两线相交处的样式
    }

    gl.strokeStyle = tinct; //设置描边颜色
    gl.lineWidth = lineWidth; //设置线条宽度
    // gl.beginPath();
    this.data.points.push({
      point: [],
      tinct: tinct,
      lineWidth: lineWidth,
    });
  },
  touchMove: function (e) {
    let pos = e.touches[0],
      da = this.data,
      po = da.points[da.points.length - 1].point;
    po.push({
      x: pos.x,
      y: pos.y,
    });
    this.bindDraw(po);
  },
  touchEnd: function (e) {
    console.log(this.data.points);
  },
  //绘制
  bindDraw: function (point) {
    gl.moveTo(point[0].x, point[0].y);
    for (var i = 1; i < point.length; i++) {
      gl.lineTo(point[i].x, point[i].y);
    }
    gl.stroke();
    // gl.draw(true);
  },
  //切换成画笔/橡皮檫
  switchBrush: function (e) {
    this.setData({
      brushState: e.currentTarget.dataset.state,
    });
  },
  //绘制回退
  drawBack: function () {
    if (this.data.points.length == 0) return false;
    gl.clearRect(0, 0, 400, 500);
    // gl.draw();
    this.data.points.pop();
    console.log(this.data.points);
    let po = this.data.points;
    for (let i = 0; i < po.length; i++) {
      gl.strokeStyle = po[i].tinct; //设置描边颜色
      gl.lineWidth = po[i].lineWidth; //设置线条宽度
      // gl.beginPath();
      this.bindDraw(po[i].point);
    }
  },
  //清空画布
  drawClear: function () {
    gl.clearRect(0, 0, 400, 500);
    // gl.draw();
    this.setData({ points: [] });
  },
  //更改画笔颜色
  tinColorChange: function (e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      tinctCurr: index,
    });
  },
  //画笔大小
  tinSizechange: function (e) {
    this.setData({
      tinctSize: e.detail.value,
    });
    console.log(this.data.tinctSize);
  },
});
