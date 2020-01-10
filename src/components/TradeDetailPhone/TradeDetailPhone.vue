<!-- 地址搜索页面 -->
<template>
  <div class="detail-container">

    <div  class="phone-block-list-container" >
      <div style="font-size: 20px;font-weight: bolder;padding: 20px 10px">{{$t('header.Detail')}}</div>
      <div class="block-list-item-container">
        <div class="block-list-item-top">
          <div style="display: flex;">
            <img src="../../../static/homeImg/network.png" style="width: 17px;height: 17px;margin-top: 4px;">
            <div class="block-list-item-top-title">
              <div style="display: flex;justify-content: space-between;">
                <span>{{$t('common.tradeHash')}}</span>
                <!--<span style="color: white;">{{formatSecond(records.timestamp)}}</span>-->
              </div>
              <!--<div style="font-size: 14px;color:#666666;cursor:pointer;word-break: break-word;">{{records.hash}}</div>-->
              <div style="font-size: 14px;color:#1EA8FF;cursor:pointer;word-break: break-word;" @click="onClickHash(records.hash)">{{records.hash}}</div>
            </div>
          </div>
        </div>
        <div style="margin-top: 10px;width: 94%;display: flex;flex-direction: column;">
          <div style="font-size: 12px;color: #7782B1;display: flex;align-items: center;justify-content: space-between;height: 50px;">
            <div>{{$t("home.headerMenu.block")}}</div>
            <span style="font-size: 12px;color: #1EA8FF;max-width: calc(100vw * 0.74); text-overflow: ellipsis;overflow: hidden;display: inline-block;max-width: calc(100vw * 0.32);"  @click="onClickBlock(records.blockNumber)">{{records.blockNumber}}</span>
          </div>
          <div style="font-size: 12px;color: #7782B1;display: flex;align-items: center;justify-content: space-between;height: 50px;">
            <div>{{$t("home.headerMenu.age")}}</div>
            <span style="font-size: 12px;color: #666666;max-width: calc(100vw * 0.74); text-overflow: ellipsis;overflow: hidden;display: inline-block;max-width: calc(100vw * 0.32);">{{formatSecond(records.timestamp)}}</span>
          </div>

        </div>
      </div>

    </div>

    <div  class="phone-block-list-container" >

      <div class="block-list-item-container">
        <div class="trade-send-item-container">
          <div class="trade-send-item-title">{{$t('home.headerMenu.send')}}</div>
          <div style="color: #1EA8FF; cursor: pointer;word-break: break-word;height: 25px" @click="onClickReceiver(records.from)">{{records.from}}</div>
        </div>
        <div class="trade-send-item-container">
          <div class="trade-send-item-title">{{$t('home.headerMenu.receiver')}}</div>
          <div style="color: #1EA8FF; cursor: pointer;  word-break: break-word;" @click="onClickReceiver(records.to)">{{records.to}}</div>
        </div>
      </div>
    </div>

    <div  class="phone-block-list-container" >
      <div class="block-list-item-container">
        <div style="margin-top: 10px;width: 94%;display: flex;flex-direction: column;">
          <div style="font-size: 12px;color: #7782B1;display: flex;align-items: center;justify-content: space-between;height: 50px;">
            <div>{{$t('common.value')}}</div>
            <span style="font-size: 12px;color: #666666;max-width: calc(100vw * 0.74); text-overflow: ellipsis;overflow: hidden;display: inline-block;max-width: calc(100vw * 0.32);">{{records.value}}</span>
          </div>
          <div style="font-size: 12px;color: #7782B1;display: flex;align-items: center;justify-content: space-between;height: 50px;">
            <div>{{$t('common.gasPrice')}}</div>
            <span style="font-size: 12px;color: #666666;max-width: calc(100vw * 0.74); text-overflow: ellipsis;overflow: hidden;display: inline-block;max-width: calc(100vw * 0.32);">{{records.gasPrice}}</span>
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
        address: '',
        total: 0,
        balance: 0,
        tradeNum: 0,
        to: '',
        records: {},
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
      getData() {
        let url = `${BASE_URL}/block/browser/transactionDetail`;
        let params = {
          hash: this.id,
        }
        this.$jsonp(url, params).then(res=>{
          console.log("_---------根据hash获取交易详情", res);
          this.balance = res.code;
          this.tradeNum = res.msg || 0;
          this.records = res.obj || {};
          this.total = res.msg || 0;
        });
      },
      onClickHash(hash) {
        // TODO: 跳转到哈希值搜索界面
        this.$router.push({
          path: '/hashsearch',
          query: {
            id: hash
          }
        })
      },
      onClickReceiver(address) {
        // DONE: 跳转到地址搜索界面
        this.$router.push({
          path: '/addresssearch',
          query: {
            id: address
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
      this.address = options.address;
      this.getData();
      if(window.innerWidth < 1000) {
        this.phoneSize = true;
      } else {
        this.phoneSize = false;
      }
      this.$customEvent.$on('onresize',data=>{
        if(this.$route.path == '/tradedetailphone'){
          console.log("--onresize--, data", data);
          let phoneSize = data.phoneSize;
          this.phoneSize = phoneSize;
        }

      })
    },
  }
</script>

<style>
  .detail-container {
    width: 100%;
    /*min-height: calc(100vh - 40px);*/
    position: relative;
    /*background-color: rgb(29, 35, 58);*/
    background:rgba(248,249,250,1);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top:70px;
    padding-bottom: 10px;
  }
  .detail-container .detail-item-container {
    width: 94%;
    height: 350px;
    /*background-image: linear-gradient(-180deg, #384265 0%, #262D48 100%);*/
    border-radius: 1px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .detail-container .detail-item-container .top{
    width: 94%;
    border-bottom: 1px solid rgba(145,169,255,0.30);
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .detail-container .detail-item-container .top .list-item-top-title{
    font-size: 14px;
    color: #6E7594;
    font-family: PingFangHK-Medium;
    margin-left: 10px;
  }
  .detail-container .detail-item-container .top .trade-type-icon{
    font-family: PingFangHK-Medium;
    width: 44px;
    height: 22px;
    line-height: 22px;
    color: white;
    text-align: center;
    border-radius: 1px;
  }


  .phone-block-list-container {
    width: calc(100vw * 0.92);
    display: flex;
    flex-direction: column;
    margin-top: 15px;
  }
  .phone-block-list-container .block-list-item-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    padding-bottom: 15px;

    /*height: 124px;*/
    /*background-image: linear-gradient(-180deg, #374164 0%, #262D48 100%);*/
    background:rgba(252,253,254,1);
    border:1px solid rgba(226,230,241,1);
    border-radius:10px;
  }
  .phone-block-list-container .block-list-item-container .block-list-item-top{
    width: 94%;
    border-bottom: 1px solid rgba(145,169,255,0.30);
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .phone-block-list-container .block-list-item-container .block-list-item-top .block-list-item-top-title{
    font-size: 14px;
    color: #6E7594;
    font-family: PingFangHK-Medium;
    margin-left: 10px;
  }
  .phone-block-list-container .block-list-item-container .block-list-item-top .trade-type-icon{
    font-family: PingFangHK-Medium;
    width: 44px;
    height: 22px;
    line-height: 22px;
    color: white;
    text-align: center;
    border-radius: 1px;
  }

  .trade-send-item-container {
    display: flex;
    flex-direction: column;
    width: 94%;
    margin-top: 15px;
  }
  .trade-send-item-container .trade-send-item-title{
    color: white;
    background:rgba(33,151,236,1);
    width: 50px;
    height: 22px;
    line-height: 22px;
    border-radius: 1px;
    text-align: center;
    margin-bottom: 10px;
  }

</style>
