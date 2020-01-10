<!-- 地址搜索页面 -->
<template>
  <div class="home-container">
    <div class="location-container" v-if="!phoneSize">
      <img src="../../../static/homeImg/network.png" class="position-icon">
      <span style="color: black;font-size: calc(100vw * (22 / 1920));">{{$t("common.token")}} > {{$t("common.allTrade")}}</span>
    </div>
<div v-if="!phoneSize" ref="pcAllTradeList">
    <div class="form-container" >
      <!--官网后台数据的展示-->
      <el-table :data="records"
                :empty-text="$t('common.emptyText')"
                :header-cell-style="{background:'rgba(0,0,0,0)',textAlign:'center', fontSize: 'calc(100vw * (18 / 1920))', color: '#7782B1', height: '65px', borderBottom: '1px solid rgba(145,169,255,0.30)', padding: '0 5px'}"
                :cell-style="{borderBottom:'1px solid rgba(145,169,255,0.30)',textAlign:'center', height: '65px', padding: '0 5px'}"
                :row-style="{borderBottom:'1px solid rgba(145,169,255,0.30)'}"
                style="width:100%;">

        <el-table-column :label="$t('common.tradeHash')" align="left">
          <template slot-scope="scope">
            <span style="max-width: calc(100vw * (130 / 1920)); cursor: pointer;  overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #1EA8FF;display: inline-block;"@click="onClickHash(scope.row.hash)">{{ scope.row.blockHash || ''}}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('home.headerMenu.block')">
          <template slot-scope="scope">
            <span style="max-width: calc(100vw * (100 / 1920)); cursor: pointer; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #1EA8FF;display: inline-block;" @click="onClickBlock(scope.row.blockNumber)">{{ scope.row.blockNumber || ''}}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('home.headerMenu.age')">
          <template slot-scope="scope">
            <span style="max-width: calc(100vw * (130 / 1920));overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #333333;display: inline-block;">{{ formatSecond(scope.row.timestamp)}}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('home.headerMenu.send')" >
          <template slot-scope="scope">
            <span style="max-width: calc(100vw * (130 / 1920));overflow: hidden;text-overflow: ellipsis; cursor: pointer; white-space: nowrap;color: #1EA8FF;display: inline-block;" @click="onClickAddressSearch(scope.row.from)">{{ scope.row.from || ''}}</span>

          </template>
        </el-table-column>

        <el-table-column  style="width: 50px" >
          <template slot-scope="scope">
            <img src="./../../../static/homeImg/Arrow.png" alt="">
          </template>
        </el-table-column>

        <el-table-column :label="$t('home.headerMenu.receiver')":width="200">
          <template slot-scope="scope">
            <span  v-if="scope.row.contract==0" style="max-width: calc(100vw * (130 / 1920)); cursor: pointer;   overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #1EA8FF;display: inline-block;margin-left: 10px;"@click.stop="onClickAddressSearch(scope.row.to)">{{ scope.row.to || ''}}</span>
            <span  v-if="scope.row.contract==1" style="max-width: calc(100vw * (130 / 1920)); cursor: pointer;   overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #1EA8FF;display: inline-block;margin-left: 10px;"@click.stop="onClickAddress(scope.row.to)">{{ scope.row.to || ''}}</span>
            <span  v-if="scope.row.contract==2"  style="max-width: calc(100vw * (130 / 1920)); cursor: pointer;   overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #1EA8FF;display: inline-block;margin-left: 10px;"@click.stop="onClickAddress(scope.row.realAddress)">{{ scope.row.to || ''}}</span>
          </template>
        </el-table-column>




        <el-table-column :label="$t('common.NumBer')">
          <template slot-scope="scope">
            <span style="max-width: 130px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #333333;display: inline-block;">{{scope.row.value | danwei}}EMTC</span>
          </template>
        </el-table-column>


        <el-table-column :label="$t('common.fee')">
          <template slot-scope="scope">
            <span style="max-width: 130px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #333333;display: inline-block;">{{scope.row.gasPrice * scope.row.gasUsed | danwei }}</span>
          </template>
        </el-table-column>

      </el-table>
    </div>
      <div style="display: flex;justify-content: flex-end;width: calc(100vw * 0.8278);">
        <div class="page-btn" style="border-right: 1px solid white;"
             @click="onClickJumpFirstPage">{{$t('common.firstPage')}}</div>
        <el-pagination layout=" prev, pager, next"
                       background
                       @current-change="handleCurrentChange" :page-size="10" :total="total" :current-page="page"
                       :prev-text="$t('common.prevPage')"
                       :next-text="$t('common.nextPage')"
                       style="float:right;background:rgba(88,178,243,1);margin-top: 45px;">

        </el-pagination>
        <div class="page-btn" style="border-left: 1px solid white;"
             @click="onClickJumpLastPage">{{$t('common.lastPage')}}</div>
    </div>
</div>
    <div v-if="phoneSize" class="phone-block-list-container" style="padding-top: 29px;" >
      <div style="font-size: 20px;font-weight: bolder;padding: 20px 10px">{{$t('common.allTrade')}}</div>

      <div   ref="phoneAllTradeList"  class="block-list-item-container"       v-for="(item, index) in records" >
        <div class="block-list-item-top">
          <div style="display: flex;">
            <img src="../../../static/homeImg/network.png" style="width: 17px;height: 17px;margin-top: 4px;">
            <div class="block-list-item-top-title">
              <div style="display: flex;justify-content: space-between;">
                <span style="font-weight: bolder">{{$t("common.tradeHash")}}</span>
                <span style="color: white;">{{formatSecond(item.timestamp)}}</span>
              </div>
              <div style="cursor: pointer; font-size: 14px;color: #1ea8ff;word-break: break-word;" @click="onClickHash(item.hash)">{{item.hash}}</div>
            </div>
          </div>
        </div>
        <div style="margin-top: 10px;width: 94%;display: flex;justify-content: space-between;align-items: center;">
          <div style="width: 40%">
            <div style="font-size: 12px;color: #7782B1;display: flex;align-items: center;flex-direction: column;">
              <div>{{$t('home.headerMenu.send')}}</div>
              <span  @click="onClickAddressSearch(item.from)" style="font-size: 12px;color: #1EA8FF;max-width: calc(100vw * 0.74); cursor: pointer; text-overflow: ellipsis;overflow: hidden;display: inline-block;max-width: calc(100vw * 0.32);">{{item.from}}</span>
            </div>
          </div>
          <div style="width: 50px;text-align: center"><img src="../../../static/homeImg/Arrow.png" style="width: 20px;height: 20px;"></div>
          <div style="width: 40%">
            <div style="font-size: 12px;color: #7782B1;display: flex;align-items: center;flex-direction: column;">
              <div>{{$t('home.headerMenu.receiver')}}</div>
              <span  v-if="item.contract==0"   @click.stop=" onClickAddressSearch(item.to)" style="cursor: pointer;  font-size: 12px;color: #1EA8FF;max-width: calc(100vw * 0.74); text-overflow: ellipsis;overflow: hidden;display: inline-block;max-width: calc(100vw * 0.32);">{{item.to}}</span>
              <span  v-if="item.contract==1"   @click.stop="   onClickAddress(item.to)" style="cursor: pointer;  font-size: 12px;color: #1EA8FF;max-width: calc(100vw * 0.74); text-overflow: ellipsis;overflow: hidden;display: inline-block;max-width: calc(100vw * 0.32);">{{item.to}}</span>
              <span  v-if="item.contract==2" @click.stop="  onClickAddress(item.realAddress)" style=" cursor: pointer; font-size: 12px;color: #1EA8FF;max-width: calc(100vw * 0.74); text-overflow: ellipsis;overflow: hidden;display: inline-block;max-width: calc(100vw * 0.32);">{{item.to}}</span>


            </div>
          </div>

        </div>
      </div>

      <div style="width: 100%;color: #1EA8FF;text-align: center;" @click="onClickShowMore">{{$t('common.clickForMore')}}</div>
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
        loading:'',
        phoneLoading:'',
        // browserType: '',
        page: 1,
        pageSize: 10,
        type: 0,
        id: '',
        total: 0,
        balance: 0,
        tradeNum: 0,
        records: [],
        sectionShow: false,
        number:'',
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
        let url = `${BASE_URL}/block/browser/transactionPage`;
        let params;
        if (this.number!=''){
           params = {
            blockNumber:this.number,
            pageNo: this.page,
            pageSize: this.pageSize,
          }
        }else {
           params = {
            pageNo: this.page,
            pageSize: this.pageSize,
          }
        }
        this.$jsonp(url, params).then(res=>{
          console.log("_---------根据地址获取交易列表", res);
          if (window.innerWidth<1000){
            this.phoneLoading.close();
          }else {
            this.loading.close();
          }

          this.balance = res.code;
          this.tradeNum = res.msg || 0;
          this.records = res.obj;
          this.total = res.lastBlockNumber || 0;
        });
      },
      onVisibleChange(e) {
        this.sectionShow = e;
      },
      onSelectChange(e) {
        console.log("---onSelectChange---", e)
        this.getData();
      },
      handleCurrentChange(page) {
        this.loading=this.$loadingData(this.$refs.pcAllTradeList,this.loading);
        this.page = page;
        this.getData();
      },
      onClickCopy(data) {
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
        this.loading=this.$loadingData(this.$refs.pcAllTradeList,this.loading);
        this.page = 1;
        this.getData();
      },
      onClickJumpLastPage() {
        this.loading=this.$loadingData(this.$refs.pcAllTradeList,this.loading);
        this.page = Math.ceil(this.total / 10);
        this.getData();
      },
      onClickShowDetail(blockNumber) {
        this.$router.push({
          path: '/tradedetailphone',
          query: {
            id: blockNumber,
          }
        })
      },
      onClickShowMore() {
        this.page++;
        this.getData();
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
      onClickAddressSearch(id) {
        // TODO: 跳转到地址搜索界面

        this.$router.push({
          path: '/addresssearch',
          query: {
            id: id
          }
        })
        // this.getData();
        // this.$router.go(0)
      },
      onClickAddress(id) {
        // TODO: 跳转到地址搜索界面
        this.$router.push({
          path: '/receiver',
          query: {
            id: id
          }
        })
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
    },
    mounted() {
      // this.loading=this.$loadingData(this.$refs.pcAllTradeList,this.loading);
      // this.phoneLoading=this.$loadingData(this.$refs.phoneAllTradeList,this.loading);
      // let userInfo = localStorage.getItem('access-user');
      // this.userInfo = JSON.parse(userInfo);
      // console.log("=========>>>", userInfo)
      let options = this.$route.query;
      // 加载数据
      console.log("----options-----", options)
      let id = options.id;
      this.id = id;
      this.number=options.number || '';
      this.getData();
      if(window.innerWidth < 1000) {
        this.phoneLoading=this.$loadingData(this.$refs.phoneAllTradeList,this.loading);
        this.phoneSize = true;
      } else {
        this.loading=this.$loadingData(this.$refs.pcAllTradeList,this.loading);
        this.phoneSize = false;
      }
      this.$customEvent.$on('onresize',data=>{
        if(this.$route.path == '/alltradelist'){
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
    padding-bottom: 80px;
    background: #f8f9fa;
  }
  .location-container {
    width: calc(100vw * 0.8278);
    display: flex;
    align-items: center;
    margin-top: 15px;
  }
  .position-icon {
    width: 23px;
    height: 23px;
    margin-right: 10px;
  }

  .form-container {
    width: calc(100vw * 0.8278);
    margin-top: 40px;
    border:1px solid rgba(231,234,243,1);
    box-shadow:0px 0px 8px 0px rgba(102,102,102,0.11);
    border-radius:0px 0px 10px 10px;
  }

  .page-btn {
    color:white;
    font-size: 13px;
    text-align: center;
    -webkit-font-smoothing: antialiased;
    margin-top: 45px;
    line-height: 32px;
    background:rgba(88,178,243,1);
    width: calc(100vw * (64 / 1920));
    cursor: pointer;
  }

  .phone-block-list-container {
    width: calc(100vw * 0.92);
    display: flex;
    flex-direction: column;
    margin-top: 50px!important;
  }
  .phone-block-list-container .block-list-item-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    padding-bottom: 15px;
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
</style>
