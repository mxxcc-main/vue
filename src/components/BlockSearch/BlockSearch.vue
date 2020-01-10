<!-- 地址搜索页面 -->
<template>
  <div class="home-container">
    <!--<div class="location-container" v-if="!phoneSize">-->
      <!--<img src="../../../static/images/icon_positioning@3x.png" class="position-icon">-->
      <!--<span style="color: white;font-size: calc(100vw * (22 / 1920));">{{$t("common.token")}} > {{$t("home.headerMenu.block")}}</span>-->
    <!--</div>-->
    <div class="location-container" v-if="!phoneSize">
      <img src="./../../../static/homeImg/value.png" alt="" style="width: 25px;height: 25px;margin-right: 5px">
      <span style="color: #6E7594;font-size: calc(100vw * (26 / 1920));font-family: PingFangHK-Medium;">{{$t("home.headerMenu.block")}} <span style="color: #333333;margin-left: 15px;font-size: calc(100vw * (28 / 1920));"># {{id}}</span> </span>
      <img src="../../../static/homeImg/pren.png" class="page-arror-icon"
           :style="id <= 1 ? 'opacity: 0.5;' : ''"
           @click="onClickLastBlock">
      <img src="../../../static/homeImg/next.png"
           :style="id >= lastBlockNumber ? 'opacity: 0.5;' : ''"
           class="page-arror-icon"
           @click="onClickNextBlock">
    </div>

    <div class="location-container" v-if="!phoneSize"
         style="justify-content: space-between;" >
      <div class="detail-item-container">
        <!--<img src="../../../static/images/short_background@3x.png" class="short-background">-->
        <div class="content-container">
          <div style="margin-right: calc(100vw *(25/1920))"><img src="./../../../static/homeImg/moneyGreen.png" alt="" style="width: calc(100vw * (50/1920));height: calc(100vw * (50/1920))"></div>
          <div class="content-title">
            <p style="font-size: calc(100vw * (19/1920))">{{$t("home.statistics.transactionNumber")}}</p>
            <p  style="cursor: pointer;color: #1ea8ff" @click="allTradeList(id)">{{records.txs}}</p>

          </div>

          <!--<div class="content-title">{{$t("home.headerMenu.age")}}</div>-->
          <!--<div class="content-detail">-->
            <!--<span style="display: inline-block;max-width: 530px;text-overflow: ellipsis;overflow: hidden;">{{records.timestamp}}</span>-->
          <!--</div>-->
        </div>
      </div>
      <div class="detail-item-container">
        <!--<img src="../../../static/images/short_background@3x.png" class="short-background">-->
        <div class="content-container">

          <div style="margin-right: calc(100vw *(25/1920))"><img src="./../../../static/homeImg/time.png" alt="" style="width: calc(100vw * (50/1920));height: calc(100vw * (50/1920))"></div>
          <div class="content-title">
            <p style="font-size: calc(100vw * (19/1920))">{{$t("home.headerMenu.timestamp")}}</p>
            <p>{{times}}</p>
          </div>

          <!--<div class="content-title">{{$t("common.transaction")}}</div>-->
          <!--<div class="content-detail">$ 52.53 {{tokenName}}</div>-->
        </div>
      </div>

    </div>

    <div class="block-detail-container" v-if="!phoneSize">
      <div class="block-detail-item">
        <div class="block-detail-item-title">{{$t("common.labelHash")}}</div>
        <div class="block-detail-item-content"
            >{{records.hash}}</div>
        <img class="block-copy-btn" src="../../../static/images/icon_copy@3x.png"
             @click="onClickclip(records.hash)">
      </div>
      <!--<div class="block-detail-item">-->
        <!--<div class="block-detail-item-title">{{$t('common.parentHash')}}</div>-->
        <!--<div class="block-detail-item-content" style="cursor:pointer;" @click="onClickJumpSearchHash(records.parentHash)">{{records.parentHash}}</div>-->
        <!--<img class="block-copy-btn" src="../../../static/images/icon_copy@3x.png"-->
             <!--@click="onClickclip(records.parentHash)">-->
      <!--</div>-->
      <!--<div class="block-detail-item">-->
        <!--<div class="block-detail-item-title">{{$t('home.headerMenu.from')}}</div>-->
        <!--<div class="block-detail-item-content" style="" >{{records.miner}}</div>-->
        <!--<img class="block-copy-btn" src="../../../static/images/icon_copy@3x.png"-->
             <!--@click="onClickclip(records.miner)">-->
      <!--</div>-->
      <div class="block-detail-item">
        <div class="block-detail-item-title">{{$t('common.blockSize')}}</div>
        <div class="block-detail-item-content" style="color:rgba(51,51,51,1);">{{records.size}} bytes</div>
      </div>
      <div class="block-detail-item">
        <div class="block-detail-item-title" >{{$t('common.totalDifficulty')}}</div>
        <div class="block-detail-item-content" style="color:rgba(51,51,51,1);">{{records.totalDifficulty}}</div>
      </div>
      <div class="block-detail-item">
        <div class="block-detail-item-title">{{$t('common.parentHash')}}</div>
        <div class="block-detail-item-content" style="color:rgba(51,51,51,1);">{{records.parentHash}}</div>
      </div>
      <!--<div class="block-detail-item">-->
        <!--<div class="block-detail-item-title">{{$t('home.statistics.transactionNumber')}}</div>-->
        <!--<div class="block-detail-item-content" style="color:#1ea8ff;cursor: pointer" @click="allTradeList(id)">{{records.txs}}</div>-->
      <!--</div>-->
    </div>

    <div v-if="phoneSize" class="block-container-phone">
      <div style="font-size: 20px;font-weight: bolder;padding: 20px 10px">{{$t('home.headerMenu.block')}}</div>


      <div class="detail-item-container">
        <div class="top">
          <div style="display: flex;align-items: center;">
            <img src="../../../static/homeImg/boxMun.png" style="width: 17px;height: 17px;">
            <div class="list-item-top-title">{{$t("home.headerMenu.block")}}#{{id}}</div>
          </div>
          <div style="display: flex;align-items: center;">
            <img src="../../../static/images/icon_previous_page@3x.png"
                 :style="id <= 1 ? 'opacity: 0.5;' : ''"
                 style="width: 16px;height: 16px;"
                 @click="onClickLastBlock">
            <img src="../../../static/images/icon_next_page@3x.png"
                 :style="id >= lastBlockNumber ? 'opacity: 0.5;' : ''"
                 style="width: 16px;height: 16px;margin-left: 20px;"  @click="onClickNextBlock">
          </div>
        </div>
        <div style="margin-top: 10px;width: 94%;display: flex;flex-direction: column;">
          <div>
            <div class="block-item-title">{{$t('home.headerMenu.timestamp')}}：<span style="font-size: 12px;color:#666666;max-width: calc(100vw * 0.61); text-overflow: ellipsis;overflow: hidden;display: inline-block;" >{{times}}</span> </div>
          </div>
          <div>
            <div class="block-item-title">{{$t('home.statistics.transactionNumber')}}<span @click="allTradeList(id)"style="font-size: 12px;color: #1ea8ff;max-width: calc(100vw * 0.61); text-overflow: ellipsis;overflow: hidden;display: inline-block;">{{records.txs}}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 发送、接收方 -->
      <div class="detail-item-container" style="margin-top: 10px;padding-top: 15px;">
        <div style="width: 94%;margin-bottom: 10px;">
          <div class="block-send-title">{{$t("common.labelHash")}}</div>
          <div class="block-send-detail" >{{records.hash}}</div>
        </div>
        <div style="width: 94%;margin-bottom: 10px;">
          <div class="block-send-title">{{$t('common.parentHash')}}</div>
          <div class="block-send-detail" style="color: #666666;">{{records.parentHash}}</div>
        </div>
        <!--<div style="width: 94%;margin-bottom: 10px;">-->
          <!--<div class="block-send-title">{{$t('home.headerMenu.from')}}</div>-->
          <!--<div class="block-send-detail" >{{records.miner}}</div>-->
        <!--</div>-->
      </div>

      <div class="detail-item-container" style="margin-top: 10px;">
        <div style="margin-top: 10px;width: 94%;display: flex;flex-direction: column;">
          <div>
            <div class="block-item-title">{{$t('common.blockSize')}}<span style="font-size: 12px;color:#666666;max-width: calc(100vw * 0.61); text-overflow: ellipsis;overflow: hidden;display: inline-block;" >{{records.size || records.blockSize}}</span> </div>
          </div>
          <div>
            <div class="block-item-title">{{$t('common.totalDifficulty')}}<span style="font-size: 12px;color:#666666;max-width: calc(100vw * 0.61); text-overflow: ellipsis;overflow: hidden;display: inline-block;">{{records.totalDifficulty}}</span> </div>
          </div>
          <!--<div>-->
            <!--<div class="block-item-title">{{$t('home.statistics.transactionNumber')}}<span @click="allTradeList(id)"style="font-size: 12px;color: #1ea8ff;max-width: calc(100vw * 0.61); text-overflow: ellipsis;overflow: hidden;display: inline-block;">{{records.txs}}</span> </div>-->
          <!--</div>-->

        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import {browser, formatSecond} from '@/common/js/utils'
  import pcChart from '@/components/chart/PC-chart-line'
  import phoneChart from '@/components/chart/Phone-chart-line'


  export default {
    name:'home',
    props: {
      browserType: {
        type: String,
        default: ''
      }
    },
    components:{

      phoneChart,
      pcChart
    },
    data(){
      return{
        phoneSize: false,
        // browserType: '',
        page: 1,
        times:'',
        pageSize: 10,
        type: 0,
        id: '',
        total: 0,
        balance: 0,
        tradeNum: 0,
        lastBlockNumber: 0,
        records: [],
        sectionShow: false,
        options: [{
          value: 0,
          label: this.$t("common.allTrade")
        },{
          value: 1,
          label: '进账交易'
        },{
          value: 2,
          label: '出账交易'
        }],
        tokenName: ''
      }
    },
    computed: {
      logoStyle() {
        let style = `width:98px;height:60px;`;

        return style;
      },
      phoneBackIconStyle() {
        let style = `width:16px;
              height:14.6px;
              vertical-align: middle;
              transform:rotate(-180deg)`;

        return style;
      },
      phoneDirIconStyle() {
        let style = `width:20px;
              height:20px;
              vertical-align: middle;
              `;

        return style;
      },
      handleImg() {
        let url = `111`
        return url;
      },
      formatSecond(time) {
        return time=>{
          let now = Math.floor(Date.now() / 1000);
          let second = now - time;
          return `${formatSecond(second, this)}`
        }
      }
    },
    methods:{

      //跳转到区块交易
      allTradeList(id){
        this.$router.push({
          path: '/alltradelist',
          query: {
            number: id
          }
        })
      },
      getData() {
        let url = `${BASE_URL}/block/browser/blockDetail`;
        let params = {
          param: this.id,
          // pageNo: this.page,
          // pageSize: this.pageSize,
          // type: this.type, // 全部交易
        }
        this.$jsonp(url, params).then(res=>{
          console.log("_---------根据地址获取交易列表", res);
          this.balance = res.code;
          // this.lastBlockNumber = res.lastBlockNumber || 0;
          this.tradeNum = res.msg || 0;
          this.records = res.obj || {};
          this.times=res.date;
          this.total = res.msg || 0;
        });
      },
      onVisibleChange(e) {
        this.sectionShow = e;
      },
      onSelectChange(e) {
        // console.log("---onSelectChange---", e)
        this.getData();
      },
      handleCurrentChange(page) {
        this.page = page;
        this.getData();
      },
      // 下一个区块
      onClickNextBlock(data) {
        if(this.id >= this.lastBlockNumber) {
          return;
        }
        this.id++;
        this.getData()
      },
      // 上一个区块
      onClickLastBlock(data) {
        if(this.id <= 1) {
          return;
        }
        this.id--;
        this.getData()
      },

      onClickJumpFirstPage() {
        this.page = 1;
        this.getData();
      },
      onClickJumpLastPage() {
        this.page = Math.ceil(this.total / 10);
        this.getData();
      },
      onClickclip(data) {
        this.$copyText(data).then(e=> {
          this.$message.success({
            showClose: true,
            message: '复制成功！',
            duration: 2000
          })
        }, function (e) {
          this.$message.error({
            showClose: true,
            message: '复制失败！',
            duration: 2000
          })
          console.log(e)
        })
      },
      onClickJumpSearchHash(hash) {
        // DONE: 跳转到哈希值搜索界面
        this.$router.push({
          path: '/hashsearch',
          query: {
            id: hash
          }
        })
      },
      onClickJumpSearchAddress(id) {
        // DONE: 跳转到地址搜索界面
        this.$router.push({
          path: '/addresssearch',
          query: {
            id: id
          }
        })
      }
    },
    mounted() {
      let options = this.$route.query;
      // 加载数据
      // console.log("----options-----", options)
      let id = options.id;
      this.id = id;
      this.lastBlockNumber=this.numberAll;
      this.getData();
      if(window.innerWidth < 1000) {
        this.phoneSize = true;
      } else {
        this.phoneSize = false;
      }
      this.$customEvent.$on('onresize',data=>{
        if(this.$route.path == '/home'){
          // console.log("--onresize--, data", data);
          let phoneSize = data.phoneSize;
          this.phoneSize = phoneSize;
        }

      })
      this.tokenName = TOKEN_NAME;
    },
  }
</script>

<style scoped>
  input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: white;
    /* placeholder字体大小  */
    font-size: 12px;
  }
  .el-input__inner {
    width: 100%;
  }
  .el-input__suffix {
    opacity: 0;
  }

  .el-input--suffix .el-input__inner {
    height: 44px;
    opacity: 0;
  }
  .el-table__body-wrapper {
    border-bottom: 1px solid rgba(145,169,255,0.30);
  }
  .home-container {
    width: 100%;
    min-height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f8f9fa;
    padding-bottom: 15px;
  }
  .location-container {
    width: calc(100vw * 0.8278);
    display: flex;
    align-items: center;
    margin-top: 25px;
  }
  .position-icon {
    width: 23px;
    height: 23px;
    margin-right: 10px;
  }
  .block-copy-btn {
    width: 18px;
    height: 18px;
    margin-left: 20px;
    cursor:pointer;
  }

  .page-arror-icon {
    margin-left: 20px;
    cursor: pointer;
  }
  .detail-item-container {
    width: calc(100vw * (780 / 1920));
    height: calc(100vw * (132 / 1920));
    position: relative;
    background:rgba(251,252,253,1);
    border:1px solid rgba(231,234,243,1);
    box-shadow:0px 0px 8px 0px rgba(102,102,102,0.11);
    border-radius:4px;
  }
  .short-background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
  }
  .content-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content-title {
    font-family: PingFangHK-Regular;
    font-size: calc(100vw * (22 / 1920));
    color: #6E7594;
    text-align: center;
  }
  .content-detail {
    font-family: PingFangHK-Regular;
    font-size: calc(100vw * (30 / 1920));
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
  }

  .block-detail-container {
    width: calc(100vw * 0.8275);
    margin-top: 40px;
    background:rgba(248,249,250,1);
    border:1px solid rgba(231,234,243,1);
    box-shadow:0px 0px 8px 0px rgba(102,102,102,0.11);
    border-radius:10px;
    height: 259px;
  }

  .block-detail-item {
    width: calc(100% - 30px);
    height: 64px;
    border-bottom: 1px solid rgba(145,169,255,0.30);
    padding-left: 30px;
    display: flex;
    align-items: center;
  }

  .block-detail-item-title {
    font-family: PingFangHK-Regular;
    font-size: calc(100vw * (22 / 1920));
    color: rgba(51,51,51,1);
    width: calc(100vw * (200 / 1920));
  }
  .block-detail-item-content {
    font-family: PingFangHK-Regular;
    font-size:calc(100vw * (22 / 1920));

  }

  .block-container-phone {
    width: calc(100vw * 0.92);
    margin-top: 79px;
  }
  .block-container-phone .detail-item-container {
    width: 100%;
    height: auto;
    background:rgba(252,253,254,1);
    border:1px solid rgba(226,230,241,1);
    border-radius:10px;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .block-container-phone .detail-item-container .top {
    width: 94%;
    border-bottom: 1px solid rgba(145,169,255,0.30);
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .block-container-phone .detail-item-container .top .list-item-top-title{
    font-size: 14px;
    color: #6E7594;
    font-family: PingFangHK-Medium;
    margin-left: 10px;
  }
  .block-container-phone .detail-item-container .top .trade-type-icon{
    font-family: PingFangHK-Medium;
    width: 44px;
    height: 22px;
    line-height: 22px;
    color: white;
    text-align: center;
    border-radius: 1px;
  }

  .block-item-title {
    font-size: 12px;
    color: #7782B1;
    display: flex;
    align-items: center;
    height: 48px;
    justify-content: space-between;
  }


  .block-send-title {
    width: 100px;
    height: 25px;
    line-height: 25px;
    border-radius: 2px;
    color: white;
    font-size: 12px;
    text-align: center;
    background:rgba(33,151,236,1);

  }
  .block-send-detail {
    font-size: 14px;
    /*color: #1EA8FF;*/
    word-break: break-all;
    margin-top: 5px;
    margin-bottom: 10px;
  }
</style>
