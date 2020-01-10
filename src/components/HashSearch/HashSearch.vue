<!-- 地址搜索页面 -->
<template>
  <div class="home-container">
    <!--<div class="location-container" v-if="!phoneSize">-->
      <!--<img src="../../../static/images/icon_positioning@3x.png" class="position-icon">-->
      <!--<span style="color: white;font-size: calc(100vw * (22 / 1920));">{{$t("common.token")}} > {{$t("common.labelHashValue")}}</span>-->
    <!--</div>-->
    <div class="location-container" v-if="!phoneSize">
      <img src="../../../static/homeImg/network.png" alt="" style="margin-right: 5px">
      <span style="color: #6E7594;font-size: calc(100vw * (26 / 1920));font-family: PingFangHK-Medium;">{{$t("common.labelHashValue")}} <span style="color: #666666;margin-left: 15px;font-size: calc(100vw * (20 / 1920));">{{id}}</span> </span>
      <div type="button"class="copy-btn"
           @click="onClickclip(id)"> <img src="../../../static/homeImg/capy.png"   style="width: 20px;height: 20px" alt="">   {{$t('common.copy')}}</div>
      <!--<img src="../../../static/images/icon_qr_code@3x.png" class="qr-code-icon">-->
    </div>

    <div class="location-container" v-if="!phoneSize"
         style="justify-content: space-between;">
      <div class="detail-item-container">
        <!--<img src="../../../static/images/short_background@3x.png" class="short-background">-->
        <div class="content-container">
          <div style="margin-right: calc(100vw *(25/1920))"><img src="./../../../static/homeImg/money.png" alt="" style="width: calc(100vw * (50/1920));height: calc(100vw * (50/1920))"></div>
          <div class="content-title">
            <p style="font-size: calc(100vw * (19/1920))">{{$t('common.tradeStatus')}}</p>
            <p style="color: #00c200" v-if="records.status=='0x1'">成功</p>
            <p  style="color: red" v-else>失败</p>
          </div>
          <!--<div class="content-detail">-->
            <!--<span style="display: inline-block;max-width: 530px;text-overflow: ellipsis;overflow: hidden;"></span>-->
          <!--</div>-->
        </div>
      </div>
      <div class="detail-item-container">
        <!--<img src="../../../static/images/short_background@3x.png" class="short-background">-->
        <div class="content-container">
          <div style="margin-right: calc(100vw *(25/1920))"><img src="./../../../static/homeImg/value.png" alt="" style="width: calc(100vw * (50/1920));height: calc(100vw * (50/1920))"></div>
          <div class="content-title">
            <p style="font-size: calc(100vw * (19/1920))">{{$t('common.blockHeight')}}</p>
            <p  @click="onClickBlock(records.blockNumber)" style="cursor: pointer;color: #1ea8ff;"> {{records.blockNumber}}</p>
          </div>
          <!--<div class="content-title"></div>-->
          <!--<div class="content-detail"></div>-->
        </div>
      </div>
      <div class="detail-item-container">
        <!--<img src="../../../static/images/short_background@3x.png" class="short-background">-->
        <div class="content-container">
          <div style="margin-right: calc(100vw *(25/1920))"><img src="./../../../static/homeImg/time.png" alt="" style="width: calc(100vw * (50/1920));height: calc(100vw * (50/1920))"></div>
          <div class="content-title">
            <p style="font-size: calc(100vw * (19/1920))">{{$t('home.headerMenu.timestamp')}}</p>
            <p>{{times}}</p>
          </div>
          <!--<div class="content-title"></div>-->
          <!--<div class="content-detail">{{records.timestamp}}</div>-->
        </div>
      </div>

    </div>

    <div class="block-detail-container" v-if="!phoneSize">
      <div class="block-detail-item">
        <div class="block-detail-item-title">{{$t('common.labelHash')}}</div>
        <div class="block-detail-item-content" style="color:#333333;">{{records.hash}}</div>
      </div>
      <div class="block-detail-item">
        <div class="block-detail-item-title">{{$t('home.headerMenu.send')}}</div>
        <div class="block-detail-item-content" style="cursor:pointer;" @click="onClickJumpSearchHash(records.from)">{{records.from}}</div>
        <img class="block-copy-btn" src="../../../static/homeImg/capy.png"
             @click="onClickclip(records.hash)">
      </div>
      <div class="block-detail-item" v-if="records.contract<=0">
        <div class="block-detail-item-title">{{$t('home.headerMenu.receiver')}}</div>
        <div class="block-detail-item-content" style="cursor:pointer;" @click="onClickJumpSearchHash(records.to)">{{records.to}}</div>
        <img class="block-copy-btn" src="../../../static/homeImg/capy.png"
             @click="onClickclip(records.parentHash)">
      </div>



         <!--合约地址-->
      <div class="block-detail-item" v-if="records.contract>0">
        <div class="block-detail-item-title" >{{$t('common.Contractaddress')}}</div>
        <div  v-if="records.contract==1" class="block-detail-item-content" style="color:#1EA8FF;cursor: pointer" @click="receiver(records.to)">{{records.to}}</div>
        <div  v-if="records.contract== '创建合约'" class="block-detail-item-content" style="color:#1EA8FF;cursor: pointer" @click="receiver(records.realAddress)">{{records.to}}</div>
      </div>
       <!--数量-->
      <div class="block-detail-item">
        <div class="block-detail-item-title">{{$t('common.NumBer')}}</div>
        <div class="block-detail-item-content" style="color:#333333;">{{records.value | danwei}}EMTC</div>
      </div>



    </div>
   <!--代币-->
    <div  v-show="records.contract>0"  class="block-detail-container" v-if="!phoneSize"
         style="width:calc(100vw * 0.8276);box-sizing: border-box">
      <div class="block-detail-item-input-container">
        <div class="block-detail-item-title" style="font-weight: bolder;font-size: 15px;padding: 5px"><img src="../../../static/homeImg/DataInput.png" style="vertical-align: middle;margin-right: 10px;" alt="">{{$t('common.token')}}</div>
        <!--<div class="block-detail-item-input-box">{{records.size}} bytes</div>-->
       <div>
        <!--<div class="block-detail-item">-->
          <!--<div class="block-detail-item-title" >{{$t('home.headerMenu.send')}}</div>-->
          <!--<div style="cursor: pointer" class="block-detail-item-content" @click="onClickJumpSearchHash(records.from)">{{records.from}}</div>-->
        <!--</div>-->
        <div class="block-detail-item">
          <div   class="block-detail-item-title" >{{$t('home.headerMenu.receiver')}}</div>
          <div style="cursor: pointer" class="block-detail-item-content"  @click="onClickJumpSearchHash(records.realAddress)">{{records.realAddress}}</div>
        </div >
        <div class="block-detail-item">
          <div class="block-detail-item-title" >{{$t('common.NumBer')}}</div>
          <div class="block-detail-item-content" style="color: black">{{records.realValue}}  ({{records.tokenName}})</div>
        </div>
       </div>
      </div>
    </div>

    <!-- 移动端 -->
    <div v-if="phoneSize" class="hash-detail-container">
      <div style="font-size: 20px;font-weight: bolder;padding: 20px 10px">{{$t('header.searchResult')}}</div>
      <div class="hash-detail-item-container">
        <div class="top">
          <img src="../../../static/homeImg/network.png" style="width: 16px; height: 16px;">
          <div style="margin-left: 12px;width: calc(100% - 28px);">
            <div style="color: #333333;font-size: 14px;line-height: 20px;">{{$t("common.labelHashValue")}}</div>
            <div class="top-id-content">{{id}}</div>
          </div>
        </div>

        <div class="top2">
          <div class="top2-item-container">
            <div style="color: #6E7594;font-size: 10px;">{{$t('common.transactionStatus')}}</div>
            <div style="color: #666666;font-size: 11px;">
              <p style="color: #00c200" v-if="records.status=='0x1'">成功</p>
              <p  style="color: red" v-else>失败</p>
            </div>
          </div>
          <div class="top2-item-container">
            <div style="color: #6E7594;font-size: 10px;">{{$t('common.blockHeight')}}</div>
            <div @click="onClickBlock(records.blockNumber)"style="cursor: pointer;color: #1ea8ff;font-size: 11px;">{{records.blockNumber}}</div>
          </div>
          <div class="top2-item-container">
            <div style="color: #6E7594;font-size: 10px;">{{$t('home.headerMenu.timestamp')}}</div>
            <div style="color: #666666;font-size: 11px;">{{times}}</div>
          </div>
          <div class="top2-item-container">
            <div style="color: #6E7594;font-size: 10px;width: 52px">{{$t('home.headerMenu.send')}}</div>
            <div style="font-size: 11px;color: #1ea8ff ;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"@click="onClickJumpSearchHash(records.from)">{{records.from}}</div>
          </div>
          <div class="top2-item-container"  v-if="records.contract<=0">
            <div style="color: #6E7594;font-size: 10px;">{{$t('home.headerMenu.receiver')}}</div>
            <div style="color: #1ea8ff;font-size: 11px; " @click="onClickJumpSearchHash(records.to)">{{records.to}}</div>
          </div>

          <div class="top2-item-container">
            <div style="color: #6E7594;font-size: 10px;">{{$t('common.NumBer')}}</div>
            <div style="color: #666666;font-size: 11px; " >{{records.value | danwei}}EMTC</div>
          </div>



          <div class="top2-item-container" v-if="records.contract>0">
            <div style="" class="block-detail-item-title" >{{$t('common.Contractaddress')}}</div>
            <div v-if="records.contract==1" class="block-detail-item-content" style="    overflow:hidden;text-overflow:ellipsis;white-space:nowrap;  color:#1EA8FF;cursor: pointer" @click="receiver(records.to)">{{records.to}}</div>
            <div v-if="records.to=='创建合约'" class="block-detail-item-content" style="color:#1EA8FF;cursor: pointer" @click="receiver(records.realAddress)">{{records.to}}</div>
          </div>
        </div>
      </div>

      <!-- 发送、接收方 -->
      <div  v-if="records.contract>0" class="hash-detail-item-container" style="margin-top: 10px;padding-top: 15px;">
        <div style="font-size:15px; width: 94%;margin-bottom: 10px;color: #7782b1">{{$t('common.token')}}:</div>
        <!--<div style="width: 94%;height: 90px;">-->
          <!--<div class="send-title">{{$t('home.headerMenu.send')}}</div>-->
          <!--<div class="send-detail" @click="onClickJumpSearchHash(records.from)">{{records.from}}</div>-->
        <!--</div>-->
        <div style="width: 94%;height: 90px;">
          <div class="send-title">{{$t('home.headerMenu.receiver')}}</div>
          <div class="send-detail" @click="onClickJumpSearchAddress(records.realAddress)">{{records.realAddress}}</div>
        </div>
        <div style="width: 94%;height: 90px;">
          <div class="send-title">{{$t('common.NumBer')}}</div>
          <div style="color: #666666" class="send-detail">{{records.realValue}}  ({{records.tokenName}})</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script  >
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
        times:'',
        tokenName: '',
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

      receiver(id){
        this.$router.push({
          path: '/receiver',
          query: {
            id: id
          }
        })

      },

      getData() {
        let url = `${BASE_URL}/block/browser/transactionDetail`;
        let params = {
          hash:this.id,
          // pageNo: this.page,
          // pageSize: this.pageSize,
          // type: this.type, // 全部交易
        }
        this.$jsonp(url, params).then(res=>{
          console.log("_---------根据hash获取交易列表", res);
          this.times=res.date;
          this.balance = res.code;
          this.lastBlockNumber = res.lastBlockNumber || 0;
          this.tradeNum = res.msg || 0;
          this.records = res.obj || {};
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
        this.id--;
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
      onClickJumpFirstPage() {
        this.page = 1;
        this.getData();
      },
      onClickJumpLastPage() {
        this.page = Math.ceil(this.total / 10);
        this.getData();
      },

      onClickJumpSearchAddress(address) {
        // DONE: 跳转到地址搜索界面
        this.$router.push({
          path: '/addresssearch',
          query: {
            id: address,
          }
        })
      },
      onClickJumpSearchHash(hash) {
        // DONE: 跳转到哈希值搜索界面
        this.$router.push({
          path: '/addressSearch',
          query: {
            id: hash
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
      this.tokenName = TOKEN_NAME;
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
        if(this.$route.path == '/hashsearch'){
          console.log("--onresize--, data", data);
          let phoneSize = data.phoneSize;
          this.phoneSize = phoneSize;
        }

      })
    },
  }
</script >

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
    padding-bottom: 50px;
    background: #f8f9fa;
  }
  .location-container {
    width: calc(100vw * 0.8276);
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
    margin-left: 20px;
  }
  .detail-item-container {
    width: calc(100vw * (516 / 1920));
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
    justify-content: center;
    align-items: center;

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
    width: calc(100vw * 0.8276);
    margin-top: 40px;
    background:rgba(248,249,250,1);
    border:1px solid rgba(231,234,243,1);
    box-shadow:0px 0px 8px 0px rgba(102,102,102,0.11);
    border-radius:10px;
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
    color: #7782B1;
    width: 200px;
  }
  .block-detail-item-content {
    font-family: PingFangHK-Regular;
    font-size: calc(100vw * (22 / 1920));
    color: #1EA8FF;
  }

  .block-detail-item-input-container {
    display: flex;
    flex-direction: column;
  }
  .block-detail-item-input-box {
    color:#333333;
    padding: 10px;
    margin-top: 20px;
    width: 100%;
    height: 151px;
    border: 1px solid rgba(145,169,255,0.30);
  }


  .copy-btn {
    width: calc(100vw * (180 / 1920));
    cursor: pointer;
    height: calc(100vw * (26 / 1920));
    line-height: calc(100vw * (30 / 1920));
    font-size: calc(100vw * (16 / 1920));
    color: #2F94ED;
    margin-left: 20px;
    text-align: center;
  }

  .qr-code-icon {
    width: 22px;
    height: 22px;
    margin-left: 20px;
  }

  .hash-detail-container {
    width: calc(100vw * 0.92);
    margin-top: 78px;
  }
  .hash-detail-container .hash-detail-item-container{
    width: 100%;
    background:rgba(252,253,254,1);
    border:1px solid rgba(226,230,241,1);
    border-radius:10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: PingFangHK-Regular;
    padding-bottom: 10px;
  }
  .hash-detail-container .hash-detail-item-container .top{
    width: 94%;
    border-bottom: 1px solid rgba(145,169,255,0.30);
    margin-top: 15px;
    height: 70px;
    display: flex;
  }
  .hash-detail-container .hash-detail-item-container .top .top-id-content{
    font-size: 14px;
    color: #666666;
    text-align: justify;
    word-break: break-word;
  }

  .hash-detail-container .hash-detail-item-container .top2 {
    width: 94%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
  .hash-detail-container .hash-detail-item-container .top2 .top2-item-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
  }
  .send-title {
    width: 50px;
    height: 25px;
    line-height: 25px;
    border-radius: 2px;
    color: white;
    font-size: 12px;
    text-align: center;
    background:rgba(33,151,236,1);
  }
  .send-detail {
    font-size: 14px;
    color: #1EA8FF;
    word-break: break-all;
    margin-top: 5px;
  }
</style>
