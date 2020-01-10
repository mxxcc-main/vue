<!-- 地址搜索页面 -->
<template>
  <div class="home-container">
    <div v-if="phoneSize" class="block-container-phone">
      <div style="font-size: calc(100vw * (100/1920));font-weight: bolder;padding: 20px 10px">{{$t('header.Detail')}}</div>
      <div class="detail-item-container">
        <div class="top">
          <div style="display: flex;align-items: center;">
            <img src="../../../static/homeImg/boxMun.png" style="width: 17px;height: 17px;">
            <div class="list-item-top-title">{{$t("home.headerMenu.block")}} <span  style="color: #1ea8ff" @click="onClickBlock(records.blockNumber)">#{{records.blockNumber}}</span></div>

            <!--<div v-if="item.to == id" class="trade-type-icon" style="background-color: #20BA05;">进</div>-->
            <!--<div v-else class="trade-type-icon" style="background-color: #E58335;">出</div>-->
          </div>
        </div>
        <div style="margin-top: 10px;width: 94%;display: flex;flex-direction: column;">
          <div>
            <div class="block-item-title">{{$t('common.labelHash')}}：<span  @click="onhashsearch(records.hash)"  style="font-size: 12px;color:#1ea8ff; cursor: pointer; max-width: calc(100vw * 0.61); text-overflow: ellipsis;overflow: hidden;display: inline-block;" >{{records.hash}}</span> </div>
          </div>
          <div>
            <div class="block-item-title">{{$t('home.headerMenu.age')}}：<span style="font-size: 12px;color:#666666;max-width: calc(100vw * 0.61); text-overflow: ellipsis;overflow: hidden;display: inline-block;">{{formatSecond(records.timestamp)}}</span> </div>
          </div>
          <div>
            <div class="block-item-title">
              {{$t('home.headerMenu.send')}}：
              <span   @click="onClickReceive(records.from)" style="font-size: 12px;color: #1ea8ff;max-width: calc(100vw * 0.61); text-overflow: ellipsis;overflow: hidden;display: inline-block;">{{records.from}}
            </span>
            </div>
          </div>
          <!--<div>-->
          <!--<div class="block-item-title">{{$t('common.parentHash')}}：<span style="font-size: 12px;color: #FFF;max-width: calc(100vw * 0.61); text-overflow: ellipsis;overflow: hidden;display: inline-block;">{{records.parentHash}}</span> </div>-->
          <!--</div>-->
          <div>
            <!--<div v-if="records.to == id">-->
              <!--<div   class="block-item-title">{{$t('home.headerMenu.receiver')}}：<span style="font-size: 12px;color:#666666; cursor: pointer; max-width: calc(100vw * 0.61); text-overflow: ellipsis;overflow: hidden;display: inline-block;">{{records.to}}</span> </div>-->
            <!--</div>-->
            <!--<div v-else>-->
            <div  v-if="records.contract==1"    class="block-item-title">{{$t('home.headerMenu.receiver')}}：<span  style="font-size: 12px;color:#1ea8ff; cursor: pointer; max-width: calc(100vw * 0.61); text-overflow: ellipsis;overflow: hidden;display: inline-block;" @click.stop="receive(records.to)">{{records.to}}</span> </div>
            <div  v-if="records.contract==0"      class="block-item-title">{{$t('home.headerMenu.receiver')}}：<span style="font-size: 12px;color:#1ea8ff; cursor: pointer; max-width: calc(100vw * 0.61); text-overflow: ellipsis;overflow: hidden;display: inline-block;" @click.stop="onClickReceive(records.to)">{{records.to}}</span> </div>
            <div  v-if="records.contract==2"   class="block-item-title">{{$t('home.headerMenu.receiver')}}：<span style="font-size: 12px;color:#1ea8ff; cursor: pointer; max-width: calc(100vw * 0.61); text-overflow: ellipsis;overflow: hidden;display: inline-block;" @click.stop="receive(records.realAddress)">{{records.to}}</span> </div>
            <!--</div>-->
          </div>
          <div v-if="records.contract>0">
            <div class="block-item-title">{{$t('common.value')}}：<span style="font-size: 12px;color:#666666;max-width: calc(100vw * 0.61); text-overflow: ellipsis;overflow: hidden;display: inline-block;">{{records.realValue}}</span> </div>
          </div>
          <div v-if="records.contract<1">
            <div class="block-item-title">{{$t('common.NumBer')}}：<span style="font-size: 12px;color:#666666;max-width: calc(100vw * 0.61); text-overflow: ellipsis;overflow: hidden;display: inline-block;">{{records.value | danwei}}EMTC</span> </div>
          </div>
          <div>
            <div class="block-item-title">{{$t('common.fee')}}：<span style="font-size: 12px;color:#666666;max-width: calc(100vw * 0.61); text-overflow: ellipsis;overflow: hidden;display: inline-block;">{{records.gasPrice * records.gasUsed | danwei }}</span> </div>
          </div>
          <div v-if="records.contract==1">
            <div class="block-item-title">{{$t('common.Tokenname')}}：<span style="font-size: 12px;color:#666666;max-width: calc(100vw * 0.61); text-overflow: ellipsis;overflow: hidden;display: inline-block;">  {{records.tokenName||"无"}}</span> </div>
          </div>

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
        }]
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
      //跳转到hash详情
      onhashsearch(hash){
        this.$router.push({
          path: '/hashsearch',
          query: {
            id: hash
          }
        })
      },
      //跳转到add
      onClickReceive(id){
        this.$router.push({
          path: '/addresssearch',
          query: {
            id: id
          }
        });
        // this.$router.go(0);
      },
      receive(id) {
        // TODO: 跳转到地址搜索界面
        this.$router.push({
          path: '/receiver',
          query: {
            id: id
          }
        })
      },
      onClickBlock(blockNumber) {
        // TODO: 跳转到地址搜索界面
        this.$router.push({
          path: '/blocksearch',
          query: {
            id: blockNumber
          }
        })
      },

      getData() {
        let url = `${BASE_URL}/block/browser/transactionDetail`;
        let params = {
          hash: this.id,
          // pageNo: this.page,
          // pageSize: this.pageSize,
          // type: this.type, // 全部交易
        }
        this.$jsonp(url, params).then(res=>{
          console.log("_---------根据地址获取交易列表", res);
          this.balance = res.code;
          this.lastBlockNumber = res.lastBlockNumber || 0;
          this.tradeNum = res.msg || 0;
          this.records = res.obj || {};
          this.total = res.msg || 0;
        });
      },
      onClickHash(hash) {
        // DONE: 跳转到哈希值搜索界面
        this.$router.push({
          path: '/hashsearch',
          query: {
            id: hash
          }
        })
      },
      onClickAddress(id) {
        // TODO: 跳转到地址搜索界面
        this.$router.push({
          path: '/addresssearch',
          query: {
            id: id
          }
        })
      }
    },
    mounted() {
      // let userInfo = localStorage.getItem('access-user');
      // this.userInfo = JSON.parse(userInfo);
      // console.log("=========>>>", userInfo)
      let options = this.$route.query;
      // 加载数据
      console.log("----options-----", options)
      let id = options.id;
      this.id = id;
      this.getData();
      if(window.innerWidth < 1000) {
        this.phoneSize = true;
      } else {
        this.phoneSize = false;
      }
      this.$customEvent.$on('onresize',data=>{
        if(this.$route.path == '/home'){
          console.log("--onresize--, data", data);
          let phoneSize = data.phoneSize;
          this.phoneSize = phoneSize;
        }

      })
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
  /*.el-table th, .el-table tr {*/
  /*background: rgba(0,0,0,0);*/
  /*}*/
  .el-input--suffix .el-input__inner {
    height: 44px;
    opacity: 0;
  }
  .home-container {
    width: 100vw;
    position: relative;
    background-color: rgba(248,249,250,1);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 50px;
  }
  .location-container {
    width: calc(100vw * 0.625);
    display: flex;
    align-items: center;
    margin-top: 60px;
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
    width: 24px;
    height: 23px;
    margin-left: 20px;
  }
  .detail-item-container {
    width: calc(100vw * 0.2);
    height: 132px;
    position: relative;
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
    flex-direction: column;
    justify-content: center;
  }
  .content-title {
    font-family: PingFangHK-Regular;
    font-size: 22px;
    color: #6E7594;
    text-align: center;
  }
  .content-detail {
    font-family: PingFangHK-Regular;
    font-size: 30px;
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
  }

  .block-detail-container {
    width: calc(100vw * 0.625);
    margin-top: 40px;
    background-image: linear-gradient(-180deg, #394367 0%, #242B46 100%);
    border-radius: 2px;
    height: 460px;
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
    font-size: 22px;
    color: #7782B1;
    width: 200px;
  }
  .block-detail-item-content {
    font-family: PingFangHK-Regular;
    font-size: 22px;
    color: #1EA8FF;
  }

  .block-container-phone {
    width: calc(100vw * 0.92);
    margin-top: 78px;
  }
  .block-container-phone .detail-item-container {
    width: 100%;
    height: auto;
    /*background-image: linear-gradient(-180deg, #384265 0%, #262D48 100%);*/
    display: flex;
    flex-direction: column;
    align-items: center;
    background:rgba(253,254,254,1);
    border:1px solid rgba(226,230,241,1);
    border-radius:8px;
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
    background: rgba(30, 168, 255, 0.2);
  }
  .block-send-detail {
    font-size: 14px;
    color: #1EA8FF;
    word-break: break-all;
    margin-top: 5px;
    margin-bottom: 10px;
  }
</style>
