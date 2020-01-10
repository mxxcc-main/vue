<template>
  <div style="width: 100%;height: 100%;position: relative;">
    <div id="main" style="width: 100%;height: 100%;"></div>
    <div class="chart-model-container">
      <div class="chart-date-model">
        <div @click="onClickChangeDateMode(3)" :style="dateType == 3 ? 'color: black;' : ''">{{$t('common.year')}}</div>
        <div @click="onClickChangeDateMode(2)" :style="dateType == 2 ? 'color: black;' : ''">{{$t('common.week')}}</div>
        <div @click="onClickChangeDateMode(1)" :style="dateType == 1 ? 'color: black;' : ''">{{$t('common.day')}}</div>
      </div>
      <!--<div class="chart-date-model" style="width: 170px;">-->
        <!--<div class="hash-btn" @click="onClickChangeHashMode(1)"-->
             <!--:style="hashMode == 1 ? 'color: white;background-color:#1D233B;' : 'color: #1D233B;background-color:#56618D;'">哈希率</div>-->
        <!--<div class="history-btn" @click="onClickChangeHashMode(2)"-->
             <!--:style="hashMode == 2 ? 'color: white;background-color:#1D233B;' : 'color: #1D233B;background-color:#56618D;'">交易历史</div>-->
      <!--</div>-->
      <!--<div style="margin-top: 10px; min-width: 163px;margin-left: 10px" >-->
        <!--<el-row >-->
          <!--<el-button  style="border-radius:9px;"    size="mini">哈希率</el-button>-->
          <!--<el-button size="mini" style="border-radius:9px;"  >交易历史</el-button>-->
        <!--</el-row>-->
      <!--</div>-->

    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    props: {
      type: Object,
      default: ()=>{
        return {}
      }
    },
    data() {
      return {
        charts: '',
        hashMode: 1,
        dateType: 3, // 1: 日 2：周 3：月
        opinionData: [],
        xDate: [], // x轴展示出来的日期数组
        xRange: [],
      };
    },
    methods: {
      setChartOption(){
        var _this = this;
        this.charts.setOption({
          tooltip: {
            show: true,
            textStyle:{
              align:'left'
            },
            backgroundColor: '#0098F8',// 背景颜色（此时为默认色）
            trigger: 'axis',
            // position: function (p) {
            //   // 位置回调
            //   // console.log && console.log(p);
            //   return [p[0] + 10, p[1] - 10];
            // },
            formatter: function (params, ticket, callback) {
              // console.log(params)
              let dataIndex = params[0].dataIndex;
              let item = _this.opinionData[dataIndex];
              let date = _this.xDate[dataIndex];
              let res = '';
              date = date.split('-');
              if(_this.dateType == 1) { // 日
                date = `${date[0]}${_this.$t('common.year_time')}${Number(date[1])}${_this.$t('common.month_time')}${Number(date[2])}${_this.$t('common.day_time')}`
              } else if(_this.dateType == 2) {
                date = `${date[0]}${_this.$t('common.year_time')}${Number(date[1])}${_this.$t('common.weeks')}`;
              } else if(_this.dateType == 3) {
                date = `${date[0]}${_this.$t('common.year_time')}${Number(date[1])}${_this.$t('common.month_time')}`;
              }
              if(date.endsWith('-')) {
                date = date.substring(0, date.length - 1);
              }
              res = date + "<br/>";

              res += `${_this.$t('common.transaction')}：` + item + "<br/>";
              res += `${_this.$t('common.price')}：` + item + "<br/>";
              // for (var i = 0, l = params.length; i < l; i++) {
              //   res += '<br/>' + params[i].seriesName + ' : ' + params[i].value + '<%=ViewState["unit"]%>';//鼠标悬浮显示的字符串内容
              // }
              callback(ticket, res);
              // setTimeout(function () {
              //   // 仅为了模拟异步回调
              //   callback(ticket, res);
              // }, 1000)
              return res;
            }
          },
          legend: {
            data: ['近七日收益']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          // tooltip : {
          //   textStyle:{
          //     align:'left'
          //   },
          // },
          xAxis: { // x轴信息
            type: 'category',
            // boundaryGap: false,
            boundaryGap: ['2%', '2%',],//坐标轴两边留白
            data: _this.xRange,
            axisLine: {//坐标轴
                lineStyle:{
                // opacity: 0.01,//设置透明度就可以控制显示不显示,
                fontFamily: 'PingFangHK-Regular',
                color: '#6E7594',
                textAlign: 'center',
              },
            },
            axisTick: {//刻度线
              show: false,//去掉刻度线
            },
            // splitLine: {//网格线
            //   show: true,//网格线
            //   interval: 0.5, // 显示间隔
            //   lineStyle:{
            //     color: '#eeeeee',
            //   },
            // },

          },
          yAxis: { // y轴信息
            // min:0,//最小刻度
            // max:100000,//最大刻度
            type: 'value',
            axisLine: {//坐标轴
              lineStyle:{
                opacity: 0,//设置透明度就可以控制显示不显示,
                fontFamily: 'PingFangHK-Regular',
                fontSize: '14px',
                color: '#6E7594',
              },
            },
            axisTick: {//刻度线
              show: false,//去掉刻度线
            },
            splitLine: {//网格线
              show: true,//网格线
              interval: 1, // 显示间隔
              lineStyle:{
                fontFamily: 'PingFangHK-Regular',
                fontSize: '14px',
                color: '#6E7594',
              },
            },
          },
          toolbox: {
            show : false,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          series: [{
            // name: '近七日收益',
            // color: '#009BF4',
            width: '1px',
            type: 'line',
            // stack: '总量',
            data: this.opinionData,
            lineStyle: { // 折线样式
              color: "#009BF4",
              width: 1
            },
            itemStyle: {
              color: "rgb(255, 70, 131)",
              opacity: 0 //为0不会绘制图形拐点消失
            }, //拐点的样式

            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0.3, color: "rgba(0,155,244,0.50)" },
                  { offset: 0.77, color: "rgba(0,155,244,0.04)" },
                  { offset: 0.87, color: "rgba(0,155,244,0.00) " }
                ])
              }
            }, //填充区域样式
          }]
        })
      },
      drawLine(id) {
        var _this = this;
        this.charts = echarts.init(document.getElementById(id))
        this.setChartOption();
      },

      getChartStatistics() {
        var _this = this;
        let url = BASE_URL + `/block/browser/statisticsTransaction`;
        let params = {
          dateType: this.dateType,
        }
        this.$jsonp(url, params).then(data =>{
          console.log('---getChartStatistics----', data);
          this.xRange = [];
          // console.log(data.obj.count);
          this.opinionData = data.obj.count || [];
          let date = data.obj.date || [];
          this.xDate = date;
          // 根据查询日期类型判断x轴显示内容
          if(this.dateType == 1) {
            // 获取日的数据
            // date ["2019-08-23", "2019-08-24"]
            date.forEach(ele=>{
              let arr = ele.split('-');
              this.xRange.push(`${Number(arr[1])}${_this.$t('common.month')}${Number(arr[2])}${_this.$t('common.day')}`);
            })
          } else if (this.dateType == 2) {
            // 获取周的数据
            // date ["2019-34", "2019-35"]
            // let dateDetail = getWeekDate("2019", "36");
            // let yearWeek = getYearWeek(1567814400);
            date.forEach(ele=>{
              let arr = ele.split('-');
              this.xRange.push(Number(arr[1]));
            })

          } else if (this.dateType == 3) {
            // 获取月的数据
            // date ["2019-08", "2019-09"]
            date.forEach(ele=>{
              // console.log("----------", ele);
              let arr = ele.split('-');
              // console.log("=========arr====", arr);
              this.xRange.push(Number(arr[1]));
            })
          }
          this.setChartOption();
        })
      },
      onClickChangeDateMode(mode) {
        this.dateType = mode;
        this.getChartStatistics();
      },
      onClickChangeHashMode(hashMode) {
        this.hashMode = hashMode;
      }
    },
    mounted: function () {
      this.$nextTick(function() {
        this.drawLine('main')
      })

      this.getChartStatistics();
    }
  }
</script>
<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .chart-container {
    width: 100%;
  }
  .chart-container .el-col {
    padding: 30px 20px;
  }

  .chart-container {
    width: 540px;
    height: 250px;
    background-image: linear-gradient(-180deg, #394367 0%, #242B46 100%);
    border-radius: 2px;
    margin-left: 10px;
    position: relative;
  }
  .chart-model-container {
    width: calc(100% - 59px);
    height: 50px;
    /*background-color: #00C1DE;*/
    position: absolute;
    top: 0;
    padding: 0 17px 0 42px;
    display: flex;
    justify-content: space-between;
  }
  .chart-date-model {
    display: flex;
    justify-content: space-between;
    width: 130px;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #6E7594;
    align-items: center;
    cursor: pointer;
    /*margin-left: 42px;*/
  }
  .hash-btn {
    border-radius: 20px;
    height: 24px;
    width: 70px;
    line-height: 24px;
    text-align: center;
    background-color: #1D233B;
    color: white;
    font-size: 12px;
  }
  .history-btn {
    border-radius: 20px;
    height: 24px;
    width: 80px;
    line-height: 24px;
    text-align: center;
    background-color: #56618D;
    font-size: 12px;
    color: #1D233B;
  }
</style>
