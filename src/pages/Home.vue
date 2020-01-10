<template>
  <div class="home-container">
    <div v-if="!phoneSize">
      <!--<img src="../../static/images/decoration@3x.png" style="width: 271px;height: 67px;margin-top: 100px;">-->
    </div>
    <!-- 搜索框 -->
    <div class="home-search-container" v-if="!phoneSize">
      <div style="height: 10px;color: white;margin-top: 10px;margin-left: 10px;font-size: calc(100vw * (20/1920))">{{$t("home.headerMenu.name")}}</div>
      <div style="display: flex;justify-content: center;align-items: center;margin-top:calc(100vw * (10/1920))">
        <input type="text" :placeholder="$t('common.searchHome')" v-model="searchData" placeholder-style="color: red"
               style="padding-left: 10px;color:#00000087;font-size: 20px;width: calc(100% * 2.7);background: #FFFFFF;border:none; height:calc(100vw * (57/1920)) ;display: block;margin-top: calc(100vw * (20/1920));margin-left: 10px">
        <div style="width: 15%;cursor:pointer;height:calc(100vw * (60/1920));background-color:#3498DB;text-align: center;margin-top: calc(100vw * (20/1920));margin-right: 10px;line-height:calc(100vw * (70/1920))" @click="onClickSearch(searchData)">
          <img src="../../static/images/icon_top_search@3x.png" style="width: calc(100vw * (30/1920));height:calc(100vw * (30/1920))
        ;">
        </div>
      </div>
    </div>
    <!-- 移动端搜索框 -->
    <div class="home-phone-search-container" v-if="phoneSize">
      <input type="text" :placeholder="$t('common.searchHome')" v-model="searchData" placeholder-style="color:black;"
             style="padding-left: 10px;height:60%;color: black;font-size: 15px;width: 100%;background:rgba(251,252,252,1);border:none;">
      <div style=" cursor: pointer;width: 12%;height: 73%;background-color:#3498DB;text-align: center;display: flex;justify-content: center;align-items: center;" @click="onClickSearch(searchData)">
        <img src="../../static/images/icon_top_search@3x.png" style="width: 10px;height: 10px;">
      </div>
    </div>
    <!--pc数据统计-->
    <div class="sub-content-container1" v-if="!phoneSize">
      <div class="short-tips-container">
        <div class="short-tips-item" style="">
          <img src="../../static/homeImg/price.png" class="short-tips-icon">
          <div style="display: flex;flex-direction: column;margin-left: 10px;">
            <div style="color: #6E7594;">{{$t("home.statistics.curPrice")}}</div>
            <div style="color: #1E2022;">$0<span style="color: #6E7594;">@0.0123 EMTC</span> <span style="color: red;">(-1.9%)</span> </div>
          </div>
        </div>
        <div class="short-tips-item" style="">
          <img src="../../static/homeImg/Data.png"  style="width: 20px;height: 20px"  class="short-tips-icon">
          <div style="display: flex;flex-direction: column;margin-left: 10px;">
            <div style="color: #6E7594;">{{$t("common.qe")}}</div>
            <div style="color: #1E2022;">{{statistics.msg || 0}} TH </div>
          </div>
        </div>
        <div class="short-tips-item" style="">
          <img src="../../static/homeImg/weibiaoti--.png" class="short-tips-icon">
          <div style="display: flex;flex-direction: column;margin-left: 10px;">
            <div style="color: #6E7594;">{{$t('home.headerMenu.latestBlock')}}</div>
            <div style="color: #1E2022;">{{statistics.lastBlockNumber || 0}}</div>
            <!--<div style="color: white;">{{statistics.lastBlockNumber || 0}} <span style="color: #6E7594;">(13.4s)</span> </div>-->
          </div>
        </div>
        <div class="short-tips-item">
          <img src="../../static/homeImg/Transactionvolume.png" class="short-tips-icon">
          <div style="display: flex;flex-direction: column;margin-left: 10px;">
            <div style="color: #6E7594;">{{$t("home.statistics.transactionNumber")}}</div>
            <div style="color: #1E2022;">{{statistics.code || 0}} {{$t("home.statistics.transactionNumberUnit")}}</div>
          </div>
        </div>
      </div>
      <div class="chart-container">
        <!--pc图表-->
        <pc-chart></pc-chart>
      </div>
    </div>

    <!--移动端数据统计-->
    <div class="sub-phone-content-container1" v-if="phoneSize">
      <div class="short-tips-phone-container">
        <div class="short-tips-phone-item" >
          <img src="../../static/homeImg/price.png" class="short-tips-icon">
          <div style="display: flex;flex-direction: column;margin-left: 10px;">
            <div style="color: #6E7594;">{{$t("home.statistics.curPrice")}}</div>
            <div style="color: #1E2022;">$0 <span style="color: #6E7594;">@0.0123 EMTC</span> <span style="color: red;">(-1.9%)</span> </div>
          </div>
        </div>
        <div class="short-tips-phone-item" >
          <img src="../../static/homeImg/Transactionvolume.png" class="short-tips-icon">
          <div style="display: flex;flex-direction: column;margin-left: 10px;">
            <div style="color: #6E7594;">{{$t("common.qe")}}</div>
            <div style="color: #1E2022;">{{statistics.msg || 0}} TH </div>
          </div>
        </div>
        <div class="short-tips-phone-item" >
          <img src="../../static/homeImg/weibiaoti--.png" class="short-tips-icon">
          <div style="display: flex;flex-direction: column;margin-left: 10px;">
            <div style="color: #6E7594;">{{$t('home.headerMenu.latestBlock')}}</div>
            <div style="color: #1E2022;">{{statistics.lastBlockNumber || 0}} </div>
          </div>
        </div>
        <div class="short-tips-phone-item">
          <img src="../../static/homeImg/Transactionvolume.png" class="short-tips-icon">
          <div style="display: flex;flex-direction: column;margin-left: 10px;">
            <div style="color: #6E7594;">{{$t("home.statistics.transactionNumber")}}</div>
            <div style="color: #1E2022;">{{statistics.code || 0}} {{$t("home.statistics.transactionNumberUnit")}}</div>
          </div>
        </div>
      </div>
      <div class="chart-phone-container">
        <phone-chart></phone-chart>
      </div>
    </div>
   <!--pc区块-->
    <div class="sub-content-container1"   v-if="!phoneSize">
      <div class="pc-new-block-container" ref="from">
        <div class="pc-new-block-item">
          <div style="display: flex;align-items: center;">
            <!--<img src="../../static/homeImg/emtc.jpg" class="pc-new-block-icon">-->
            <div style="font-size: calc(100vw * (18 / 1920));color: black;margin-left: calc(100vw * (15 / 1920));">{{$t('home.headerMenu.latestBlock')}}</div>
          </div>
          <div style="font-size: calc(100vw * (18 / 1920));color:#1C8AEC;cursor:pointer" @click="onClickJumpToAllBlock">{{$t("home.headerMenu.all")}}>></div>
        </div>
        <div class="pc-new-block-scrollview" >
          <div class="scrollview-content" @scroll="onScroll" ref="pcScrollView">
            <div class="pc-new-block-item" v-for="(item, index) in newBlockList"
               >
              <div style="display: flex;align-items: center;">
                <img src="../../static/homeImg/emtc.jpg" class="pc-new-block-icon">
                <div style="font-size: calc(100vw * (18 / 1920));color: black;margin-left: 15px;">
                  <div>{{item.number}}</div>
                  <div style="display: flex;align-items: center;"><span style="color: #999999;">{{$t('common.labelHash')}}</span><span style="display:inline-block;color: #666666;max-width: calc(100vw * (220 / 1920));text-overflow:ellipsis;overflow: hidden;"   >{{item.hash}}</span></div>
                </div>
              </div>
              <div style="font-size: calc(100vw * (18 / 1920));color: #6E7594;">{{formatSecond(item.timestamp)}}</div>
            </div>
          </div>

          <div class="scroll-bar-custom">
            <div class="scroll-bar-thumb-custom"
                 :style="{marginTop: barScrollTop + 'px', height: barHeight + '%'}"></div>
          </div>
        </div>
      </div>
      <!--//移动端最新交易-->
      <div class="pc-new-block-container"  ref="fromTwo">
        <div class="pc-new-block-item">
          <div style="display: flex;align-items: center;">
            <!--<img src="../../static/images/icon_trading@3x.png" class="pc-new-block-icon">-->
            <div style="font-size: calc(100vw * (18 / 1920));color: black;margin-left: calc(100vw * (15 / 1920));">{{$t('home.headerMenu.latestTrade')}}</div>
          </div>
          <div style="font-size: calc(100vw * (18 / 1920));color: #1C8AEC;cursor: pointer" @click="onClickJumpToAllTrade">{{$t("home.headerMenu.all")}}>></div>
        </div>
        <div class="pc-new-block-scrollview">
          <div class="scrollview-content" @scroll="onTradeScroll" ref="pcTradeScrollView">
            <div class="pc-new-block-item" v-for="(item, index) in newTradeList" >
              <div style="display: flex;align-items: center;">
                <img src="../../static/homeImg/emtc.jpg" class="pc-new-block-icon">
                <div style="font-size: calc(100vw * (18 / 1920));color: black;margin-left: 15px;">
                  <div>{{item.value | danwei}}EMTC</div>
                  <div style="display: flex;align-items: center;">
                    <span class="trade-item-content" style="cursor:pointer;"@click="onClickHash(item.hash)">{{item.hash}}</span></div>
                </div>
              </div>
              <div style="display: flex;align-items: center;width: 168px">
                <div style="font-size: calc(100vw * (18 / 1920));color: black;margin-left: calc(100vw * (15 / 1920));">
                  <div style="display: flex;align-items: center;">
                    <span style="white-space: nowrap;">{{$t('home.headerMenu.send')}}</span>
                    <span class="trade-item-content" style="cursor:pointer;" @click.stop="onClickReceive(item.from)">{{item.from}}</span></div>
                  <div style="display: flex;align-items: center;">
                    <span style="white-space: nowrap;">{{$t('home.headerMenu.receiver')}}</span>
                    <span  v-if="item.contract==0" class="trade-item-content" style="cursor:pointer;" @click.stop="onClickReceive(item.to)">{{item.to}}</span>
                    <span  v-if="item.contract==1" class="trade-item-content" style="cursor:pointer;" @click.stop="onClickAddress(item.to)">{{item.to}}</span>
                    <span  v-if="item.contract==2" class="trade-item-content" style="cursor:pointer;" @click.stop="onClickAddress(item.realAddress)">{{item.realAddress}}</span>
                  </div>
                </div>
              </div>
              <div style=" width:120px;text-align: right; font-size: calc(100vw * (18 / 1920));color: #6E7594;margin-left: calc(100vw * (15 / 1920))">{{formatSecond(item.timestamp)}}</div>
            </div>
          </div>

          <div class="scroll-bar-custom">
            <div class="scroll-bar-thumb-custom"
                 :style="{marginTop: tradeBarScrollTop + 'px', height: barHeight + '%'}"></div>
          </div>

        </div>
      </div>
    </div>

    <div class="sub-phone-content-container1" style="border: none;background: none" v-if="phoneSize">
      <div class="phone-new-block-container">
        <div class="phone-new-block-item"style="height: 54px">
          <div style="display: flex;align-items: center;">
            <!--<img src="../../static/images/icon_block@3x.png" class="phone-new-block-icon">-->
            <div style="font-size: 15px;color: #333333;margin-left: 15px;font-weight: bolder">{{$t("home.headerMenu.latestBlock")}}</div>
          </div>
          <div style="font-size: 12px;color:#1C8AEC;cursor: pointer" @click="onClickJumpToAllBlock">{{$t("home.headerMenu.all")}}>></div>
        </div>
        <div class="pc-new-block-scrollview">
          <div class="phone-new-block-item" v-for="(item, index) in newBlockList"
              >
            <div style="display: flex;align-items: center;">
              <img src="../../static/images/icon_block@3x.png" class="phone-new-block-icon">
              <div style="font-size: 12px;color:#333333;margin-left: 15px;">
                <div>{{item.number}}</div>
                <div style="display: flex;align-items: center;">
                  <span>{{$t('common.labelHash')}}</span>
                  <span style="display:inline-block;color: #666666;  max-width: calc(100vw * 0.41);text-overflow:ellipsis;overflow: hidden;"
                       >{{item.hash}}</span></div>
              </div>
            </div>
            <div style="font-size: 12px;color: #6E7594;">{{formatSecond(item.timestamp)}}</div>
          </div>
        </div>
      </div>

      <div class="phone-new-block-container">
        <div class="phone-new-block-item" style="height: 54px">
          <div style="display: flex;align-items: center;">
            <!--<img src="../../static/images/icon_trading@3x.png" class="phone-new-block-icon">-->
            <div style="font-size: 15px;color: #333333;margin-left: 15px;font-weight: bolder">{{$t('home.headerMenu.latestTrade')}}</div>
          </div>
          <div style="font-size: 12px;color:#1C8AEC;cursor: pointer " @click="onClickJumpToAllTrade">{{$t("home.headerMenu.all")}}>></div>
        </div>
        <div class="pc-new-block-scrollview">
          <div class="phone-new-block-item" v-for="(item, index) in newTradeList">
            <div style="display: flex;align-items: center;">
              <img src="../../static/images/icon_trading@3x.png" class="phone-new-block-icon">
              <div style="font-size: 12px;color: #333333;margin-left: 15px;">
                <div>{{item.value | danwei}}EMTC</div>
                <div style="display: flex;align-items: center;" >
                  <span @click="onClickHash(item.hash)" style="display:inline-block;color: #1EA8FF; cursor: pointer; max-width: calc(100vw * 0.2);text-overflow:ellipsis;overflow: hidden;">{{item.hash}}</span></div>
              </div>
            </div>
            <div style="display: flex;align-items: center;">
              <div style="font-size: 12px;color: #666666;margin-left: 15px;">
                <div style="display: flex;align-items: center;">
                  <span style="width: 54px;">{{$t('home.headerMenu.send')}}</span>
                  <span style="display:inline-block;color: #1EA8FF;cursor: pointer;    max-width: calc(100vw * 0.2);text-overflow:ellipsis;overflow: hidden;" @click.stop="onClickReceive(item.from)">{{item.from}}</span></div>
                <div style="display: flex;align-items: center;">
                  <span style="width: 54px;">{{$t('home.headerMenu.receiver')}}</span>
                  <span  v-if="item.contract==0"  style="display:inline-block;color: #1EA8FF; cursor: pointer; max-width: calc(100vw * 0.2);text-overflow:ellipsis;overflow: hidden;" @click.stop="onClickReceive(item.to)">{{item.to}}</span>
                  <span  v-if="item.contract==1" style="display:inline-block;color: #1EA8FF; cursor: pointer; max-width: calc(100vw * 0.2);text-overflow:ellipsis;overflow: hidden;" @click.stop="onClickAddress(item.to)">{{item.to}}</span>
                  <span  v-if="item.contract==2" style="display:inline-block;color: #1EA8FF; cursor: pointer; max-width: calc(100vw * 0.2);text-overflow:ellipsis;overflow: hidden;" @click.stop="onClickAddress(item.realAddress)">{{item.to}}</span>

                </div>
              </div>
            </div>
            <div style="font-size: 18px;color: white;font-size: 12px;color: #6E7594;">{{formatSecond(item.timestamp)}}</div>
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
    components:{
      phoneChart,
      pcChart
    },
    data(){
      return{
        fromOneLoading:'',
        fromTwoLoading:'',
        tokenName: '',
        phoneSize: false,
        browserType: '',
        searchData: '',
        newBlockList: [],
        newTradeList: [],
        statistics: {},
        dateType: 3, // 折线图 1：日；2：周；3：月
        chartInfo: {},
        barScrollTop: 0,
        tradeBarScrollTop: 0,
        barHeight: '100',
        tradeBarHeight: '100',
        scrollViewHeight: 0,
        tradeScrollViewHeight: 0,
        scrollViewScrollHeight: 0,
        tradeScrollViewScrollHeight: 0,
        charts: '',
        loading: false,
        opinionData: ["100", "199", "199", "299", "99", '300', '350', '245', '222', '431', '360']
      }
    },
    computed: {
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
      formatSecond(time) {
        return time=>{
          let now = Math.floor(Date.now() / 1000);
          let second = now - time;
          return `>${formatSecond(second, this)}${this.$t('common.ago')}`
        }
      },
    },
    methods:{
      // 获取最新交易
      getNewTrade() {
        let url = BASE_URL + `/block/browser/transactionPage`;
        let params = {
          pageNo: 1,
          pageSize: 10
        }
        this.$jsonp(url, params).then(data=>{
          this.fromTwoLoading.close();
          console.log("最新交易--", data);
          // if(data.error != 0 || !data.obj) {
          //
          //   return;
          // }
          this.newTradeList = data.obj

          setTimeout(_=>{
            let innerHeight = this.$refs.pcTradeScrollView;
            if(innerHeight) {
              this.tradeBarHeight = (innerHeight.offsetHeight / innerHeight.scrollHeight) * 100;
              this.tradeScrollViewHeight = innerHeight.offsetHeight;
              this.tradeScrollViewScrollHeight = innerHeight.scrollHeight;
            }

            // console.log("----getNewBlock --innerHeight ============-----", innerHeight.scrollHeight)
            // console.log("----getNewBlock --innerHeight ============-----", innerHeight.style.height)
          }, 100)
        })
      },
      getNewBlock() {
        let url = BASE_URL + `/block/browser/blockPage`;
        let params = {
          pageNo: 1,
          pageSize: 10
        }
        this.$jsonp(url, params).then(data=>{
          console.log("获取最新区块数据--", data);
         this. fromOneLoading .close();
          if(data.error != 0 || !data.obj) {

            return;
          }
          this.newBlockList = data.obj

          setTimeout(_=>{
            let innerHeight = this.$refs.pcScrollView;
            if(innerHeight) {
              this.barHeight = (innerHeight.offsetHeight / innerHeight.scrollHeight) * 100;
              this.scrollViewHeight = innerHeight.offsetHeight;
              this.scrollViewScrollHeight = innerHeight.scrollHeight;
            }
          }, 100)
        })
      },

      getStatistics() {
        let url = BASE_URL + `/block/browser/statisticsBalance`;

        this.$jsonp(url,).then(data=>{
          console.log('---getStatistics 获取首页统计数据----', data);
          this.statistics = data
        })
      },
      subtouchStart(e) {
        // console.log("_-----eee", )
      },
      async onClickSearch (searchData) {
        // 搜索的是什么
        console.log("onClickSearch", searchData);
        let len = searchData.length;
        console.log(len);
        if(this.loading) {
          this.$message.warning({
            showClose: true,
            message: '正在搜索中,请稍后再试！',
            duration: 2000
          })
          return;
        }

        // 如果是纯数字，则搜索区块
        if (len == 66) { // 搜索的是交易哈希
          // TODO: 跳转到交易哈希搜索界面
          this.$router.push({
            path: 'hashsearch',
            query: {
              id: searchData
            }
          })
        } else if (len == 42) { // 搜索的是地址
          // TODO: 跳转到地址搜索界面
          console.log("-------len2222-----", len);
          this.loading = true;
          let code = await this.$web3.eth.getCode(searchData);
          this.loading = false;
          console.log("-------code-----", code);
          if(code === '0x') {
            console.log('账户地址')
            this.$router.push({
              path: 'addresssearch',
              query: {
                id: searchData
              }
            })
          } else {
            console.log('合约地址')

          }
          this.$router.push({
            path: 'addresssearch',
            query: {
              id: searchData
            }
          })
        } else {
          // TODO: 跳转到区块搜索界面
          this.$router.push({
            path: 'blocksearch',
            query: {
              id: searchData
            }
          })
        }
      },
      onClickJumpAddressSearch(id) {
        // TODO: 跳转到地址搜索页面
        this.$router.push({
          path: 'addresssearch',
          query: {
            id: id
          }
        })
      },
      onClickJumpToAllBlock() {
        // TODO: 跳转到全部区块页面
        console.log("--跳转到全部区块页面--")
        this.$router.push({
          path: 'allblocklist'
        })
      },
      onClickJumpToAllTrade() {
        // TODO: 跳转到全部交易页面
        console.log("--跳转到全部交易页面--")
        this.$router.push({
          path: 'alltradelist'
        })
      },
      onScroll(e) {
        // console.log('------e--', e.target.scrollTop)
        this.barScrollTop = this.scrollViewHeight * e.target.scrollTop / this.scrollViewScrollHeight ;
      },
      onTradeScroll(e) {
        // console.log('------e--', e.target.scrollTop)
        this.tradeBarScrollTop = this.scrollViewHeight * e.target.scrollTop / this.tradeScrollViewScrollHeight ;
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
      onClickReceive(id){
        this.$router.push({
          path: '/addresssearch',
          query: {
            id: id
          }
        })
      },

      onClickAddress(id) {
        // TODO: 跳转到地址搜索界面
        this.$router.push({
          path: '/receiver',
          query: {
            id: id
          }
        })
      }
    },
    mounted() {
      //最新区块加载
      let fromOne = this.$refs.from;//获取加载区域的dom对象
      let optionsOne={//设置加载参数
        target:fromOne,//加载区域dom
        fullscreen:false,//不全屏显示
      }
     this.fromOneLoading= this.$loading(optionsOne);//开启加载
     //最新交易加载
      let fromTwo = this.$refs.fromTwo;//获取加载动画dom
      let optionsTwo={//设置加载参数
        target:fromTwo,
        fullscreen:false,
      }
      this.fromTwoLoading= this.$loading(optionsTwo);//开启加载

      // let userInfo = localStorage.getItem('access-user');
      // this.userInfo = JSON.parse(userInfo);
      // console.log("=========>>>", userInfo)
      this.tokenName = TOKEN_NAME;
      this.browserType = browser();
      if(window.innerWidth < 1000) {
        this.phoneSize = true;
      } else {
        this.phoneSize = false;
      }
      this.getNewBlock();
      this.getNewTrade();
      this.getStatistics();

      this.$customEvent.$on('onresize',data=>{
        if(this.$route.path == '/home'){
          // console.log("--onresize--, data", data);
          let phoneSize = data.phoneSize;
          this.phoneSize = phoneSize;
        }

      })
    },
  }
</script>

<style scoped>
  ::-webkit-input-placeholder { /* WebKit browsers */
    color: white;
    opacity: 0.5;
  }


  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: white;
    opacity: 0.5;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: white;
    opacity: 0.5;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: white;
    opacity: 0.5;
  }

  /*input::-webkit-input-placeholder {*/
  /*!* placeholder颜色  *!*/
  /*color: white;*/
  /*!* placeholder字体大小  *!*/
  /*font-size: 12px;*/
  /*}*/
  .home-container {
    width: 100%;
    min-height: 100vh;
    position: relative;
    /*background-color: rgb(29, 35, 58);*/
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 50px;
    background: white;
  }
  .center-container {
    width: calc(100vw * ( 1- 0.1875 * 2));
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 18.75%;
    padding-right: 18.75%;
    padding-top: 1px;
    align-items: center;
  }

  .top-container {
    width: 80%;
    display: flex;
    justify-content: space-between;
    margin-top: 97px;
  }

  .top-selector-container {
    color: white;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 410px;
  }
  .language-icon {
    width: 12px;
    height: 7px;
    vertical-align: middle !important;
    margin-left: 6px;
  }

  .home-search-container {
    width: calc(100vw * 0.8276);
    height: calc(100vw * (136/1920));
    background-color:#1C8AEC;
    margin-top: 30px;
    padding-bottom: 5px;
    overflow: hidden;
  }
  .home-phone-search-container {
    width: 92%;
    height: 57px;
    display: flex;
    justify-content: space-between;
    background:rgba(33,151,236,1);
    border-radius: 8px;
    overflow: hidden;
    align-items: center;
    margin-top: 50px;
    padding: 5px;
    box-sizing: border-box;
  }

  .sub-content-container1 {
    margin-top: 31px;
    display: flex;
    justify-content: space-between;
    width: calc(100vw * 0.8276);
    overflow: hidden;
    background:rgba(248,249,250,1);
    border:1px solid rgba(231,234,243,1);
    box-shadow:0px 0px 7px 1px rgba(102,102,102,0.11);
    border-radius:4px;
  }

  .sub-phone-content-container1 {
    display: flex;
    flex-direction: column;
    width: calc(100vw * 0.92);
    background:rgba(251,252,252,1);
    border:1px solid rgba(231,234,242,1);
    border-radius:10px;
    margin-top: 15px;
    padding: 10px 0px;
  }

  .short-tips-container {
    width: calc(100vw * 0.53);
    min-width: 560px;
    display: flex;
    flex-wrap: wrap;
    background: #F8F9FA;
    padding-left: 25px;
  }

  .short-tips-phone-container {
    display: flex;
    width: 100%;
    flex-direction: column;
  }
  .short-tips-item:nth-of-type(1),.short-tips-item:nth-of-type(3){
    border-right:1px solid #bdc0c7;
  }
  .short-tips-item:nth-of-type(3),.short-tips-item:nth-of-type(4){
    border-top:1px solid #bdc0c7;
  }

  .short-tips-item:nth-of-type(2),.short-tips-item:nth-of-type(4){
    padding-left: 20px;
  }
  .short-tips-item {
    box-sizing: border-box;

    background: #F8F9FA;
    width: calc(100vw * (0.27 - 0.015));
    height: 97px;
    border-radius: 3px;
    padding-left:  calc(100vw * 0.015);
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 0 10px;
  }
  .short-tips-phone-item {
    width: calc(100% - 10px);
    height: 60px;
    border-radius: 2px;
    padding-left: 10px;
    display: flex;
    align-items: center;
    font-size: 14px;
    border-bottom: 1px solid rgba(234,236,244,1);
  }
  .short-tips-icon {
  }

  .chart-container {
    width: calc(100vw * 0.28125);
    height: 192px;
    border-radius: 2px;
    position: relative;
    background:#F8F9FA;
    border-left: 1px solid #bdc0c7;
    padding-left: 20px;
  }

  .chart-phone-container {
    height: 192px;
    border-radius: 2px;
    position: relative;
    margin-top: 10px;
  }


  .pc-new-block-container {
    width: calc(100vw * 0.4078);
    height: 500px;
    overflow: hidden;
    background:rgba(251,252,252,1);
    border:1px solid rgba(231,234,243,1);
    box-shadow:0px 0px 7px 1px rgba(102,102,102,0.11);
    border-radius:4px
  }
  .phone-new-block-container {
    width: 100%;
    margin-top: 10px;
    background:rgba(251,252,252,1);
    border:1px solid rgba(231,234,242,1);
    border-radius:10px;
    overflow: hidden;
    height: 378px;
  }
  .pc-new-block-item {
    width: calc(100% - 100vw * (40 / 1920));
    height: calc(100vw * (80 / 1920));
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: calc(100vw * (20 / 1920));
    padding-right: calc(100vw * (20 / 1920));
    border-bottom: 1px solid rgba(145,169,255,0.30);
  }
  .phone-new-block-item {
    width: calc(100% - 20px);
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom: 1px solid rgba(145,169,255,0.30);
  }
  .pc-new-block-icon {
    width: calc(100vw * (40 / 1920));
    height: calc(100vw * (40 / 1920));
  }
  .phone-new-block-icon {
    width: 25px;
    height: 25px;
  }

  .pc-new-block-scrollview {
    width: 100%;
    height: calc(100% - 100vw * (80 / 1920));
    position: relative;
  }
  .pc-new-block-scrollview .scrollview-content{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .pc-new-block-scrollview .scroll-bar-custom{
    width: 8px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    background: rgba(0, 0, 0 , 0);
    padding: 0 2px;
    overflow: hidden;
  }
  .pc-new-block-scrollview .scroll-bar-custom .scroll-bar-thumb-custom{
    width: 5px;
    height: 30px;
    border-radius: 8px;
    background:rgba(33,151,236,1);
  }
  .pc-new-block-scrollview .scrollview-content::-webkit-scrollbar{
    width:8px;
    display: none;

  }
  /*.pc-new-block-scrollview::-webkit-scrollbar-track {*/
  /*!*display: none;*!*/
  /*background: rgba(0,0,0,0);*/
  /*}*/

  /*.pc-new-block-scrollview::-webkit-scrollbar-thumb {!*滚动条里面小方块*!*/
  /*!*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*!*/
  /*background: #495378;*/
  /*border-radius: 6px;*/
  /*width: 28px;*/
  /*}*/
  /*.pc-new-block-scrollview::-webkit-scrollbar-track{*/
  /*background: #213147;*/
  /*border-radius:2px;*/
  /*width: 28px;*/
  /*}*/

  input::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder {
    color: #999999;
    font-size:15px;
  }


  .trade-item-content {
    display:inline-block;
    color: #1EA8FF;
    max-width: calc(100vw * (125 / 1920));
    text-overflow:ellipsis;
    overflow: hidden;
  }
</style>
