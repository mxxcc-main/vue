<!-- 地址搜索页面 -->
<template>
  <div class="home-container">
    <div class="location-container" v-if="!phoneSize">
      <img src="../../../static/homeImg/network.png" class="position-icon">
      <span style="color: black;font-size: calc(100vw * (22 / 1920));">
        <!--<span>#896566</span> {{$t('common.reach')}} <span>#{{total}}</span>-->
          <span style="font-size: 15px">{{$t('common.common')}}（ <span>{{total}}</span> ） {{$t('home.headerMenu.block')}}  </span>
      </span>
    </div>
<div v-if="!phoneSize" ref="allBlockList">
    <div class="form-container"  >
      <!--官网后台数据的展示-->
      <!--v-loading.fullscreen.lock="loading"-->
      <el-table :data="records"
                :empty-text="$t('common.emptyText')"
                :highlight-current-row="false"
                :cell-mouse-enter="onCellMouseEnter"
                :header-cell-style="{background:'rgba(0,0,0,0)', fontSize: 'calc(100vw * (15 / 1920))', color: '#696969', height: '51px', borderBottom: '1px solid rgba(145,169,255,0.30)',borderTop: '1px solid rgba(231,234,243,1)', padding: '0 5px',textAlign:'center'}"
                :cell-style="{borderBottom:'1px solid rgba(231,234,243,1)', height: '51px',textAlign:'center'}"
                :row-style="{borderBottom:'1px solid rgba(145,169,255,0.30)'}"
                style="width:100%; ">

        <el-table-column  :label="$t('home.headerMenu.block')" align="left">
          <template slot-scope="scope">
            <span style="max-width: 130px;  cursor: pointer; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #3498DB;display: inline-block;" @click="onClickBlock(scope.row.number)">{{ scope.row.number || ''}}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('common.labelHash')">
          <template slot-scope="scope">
            <span style="max-width: 100px; cursor: pointer; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color:#666666;display: inline-block;"   >{{ scope.row.hash || ''}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('home.headerMenu.age')">
          <template slot-scope="scope">
            <span style="max-width: 130px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #333333;display: inline-block;">{{ formatSecond(scope.row.timestamp)}}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('common.transaction')" >
          <template slot-scope="scope">
            <span style="max-width: 130px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color:#1ea8ff;display: inline-block; cursor: pointer"@click="allTradeList(scope.row.number)">{{ scope.row.txs || 0}}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('common.blockSize')":width="200">
          <template slot-scope="scope">
            <span style="max-width: 130px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color:  #333333;display: inline-block;margin-left: 10px;">{{ scope.row.size || 0}}</span>
          </template>
        </el-table-column>

      </el-table>
    </div>
      <div style="display: flex;justify-content: flex-end;width:calc(100vw*0.8278)">
        <div class="page-btn" style="border-right: 1px solid white;background:rgba(88,178,243,1);color: white"
             @click="onClickJumpFirstPage">{{$t('common.firstPage')}}</div>
        <el-pagination layout=" prev, pager, next"
                       background
                       @current-change="handleCurrentChange" :page-size="10" :total="total" :current-page="page"
                       :prev-text="$t('common.prevPage')"
                       :next-text="$t('common.nextPage')"
                       style="float:right;background:rgba(88,178,243,1);margin-top: 45px; color: white;">

        </el-pagination>
        <div class="page-btn" style="border-left: 1px solid white;background:rgba(88,178,243,1);color: white"
             @click="onClickJumpLastPage">{{$t('common.lastPage')}}</div>
      </div>
</div>

    <div v-if="phoneSize" class="phone-list-container" style="padding-top:67px;">

      <div style="font-size: 20px;font-weight: bolder;padding: 20px 10px">{{$t('common.allBlock')}}</div>
      <div   ref="phoneAllBlockList"   class="list-item-container" v-for="(item, index) in records" >
        <div class="list-item-top">
          <div style="display: flex;align-items: center;">
            <img src="../../../static/homeImg/boxMun.png" style="width: 17px;height: 17px;">
            <div @click="onClickShowDetail(item.number)"  style="color: #1ea8ff;cursor: pointer"  class="list-item-top-title">{{$t("home.headerMenu.block")}}#{{item.number}}</div>
          </div>
        </div>
        <div style="margin-top: 10px;width: 94%;display: flex;flex-direction: column;line-height: 20px">
          <div>
            <div style="font-size: 12px;color: #7782B1;display: flex;align-items: center;">{{$t('common.labelHash')}}：<span style="font-size: 12px;color: #666666;max-width: calc(100vw * 0.74); text-overflow: ellipsis;overflow: hidden;display: inline-block;">{{item.hash}}</span> </div>
          </div>
          <div>
            <div style="font-size: 12px;color: #7782B1;display: flex;align-items: center;">{{$t('home.headerMenu.age')}}：<span style="font-size: 12px;color:#333333;max-width: calc(100vw * 0.74); text-overflow: ellipsis;overflow: hidden;display: inline-block;">{{formatSecond(item.timestamp)}}</span> </div>
          </div>
          <div>
            <div style="font-size: 12px;color: #7782B1;display: flex;align-items: center;">{{$t('common.transaction')}}：<span @click="allTradeList(scope.row.number)" style="font-size: 12px;color: #1ea8ff; cursor: pointer;  max-width: calc(100vw * 0.74); text-overflow: ellipsis;overflow: hidden;display: inline-block;">{{item.txs}}</span> </div>
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
        fromOneLoading:'',
        phoneSize: false,
        // browserType: '',
         loading:'',//加载loading
        phoneLoading:'',
        page: 1,
        pageSize: 10,
        type: 0,
        id: '',
        total: 0,
        balance: 0,
        tradeNum: 0,
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
      firstPageFn() {
        let a = this.$t('common.firstPage');
        console.log("---------aaaa", a);
        return this.$t('common.firstPage');
      },
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
        let url = `${BASE_URL}/block/browser/blockPage`;
        let params = {
          pageNo: this.page,
          pageSize: this.pageSize,
        }
        this.$jsonp(url, params).then(res=>{
          console.log("_---------根据地址获取交易列表", res);

          if (window.innerWidth<1000){
            this.phoneLoading.close();
          } else {
            this.loading.close();
          }



          this.balance = res.code;
          this.tradeNum = res.msg || 0;
          this.records = res.obj;
          this.total = res.lastBlockNumber|| 0;
          this.loading=false;

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
        this.loading=this.$loadingData(this.$refs.allBlockList,this.loading);
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
        this.loading=this.$loadingData(this.$refs.allBlockList,this.loading);
        this.page = 1;
        this.getData();
      },
      onClickJumpLastPage() {
        this.loading=this.$loadingData(this.$refs.allBlockList,this.loading);
        this.page = Math.ceil(this.total / 10);
        this.getData();
      },
      onClickShowDetail(blockNumber) {
        this.$router.push({
          path: '/blocksearch',
          query: {
            id: blockNumber,
          }
        })
      },
      onClickShowMore() {
        this.page++;
        this.getData();
      },
      onCellMouseEnter() {
        console.log("----on cell mouse enter")
      },
      onClickBlock(blockNumber) {
        // TODO: 跳转到地址搜索界面
        console.log(blockNumber);
        this.$router.push({
          path: '/blocksearch',
          query: {
            id: blockNumber,
            numberAll:this.total,
          }
        })
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
        this.phoneLoading=this.$loadingData(this.$refs.phoneAllBlockList,this.loading);
        this.phoneSize = true;
      } else {
        this.loading=this.$loadingData(this.$refs.allBlockList,this.loading);
        this.phoneSize = false;
      }
      this.$customEvent.$on('onresize',data=>{
        if(this.$route.path == '/allblocklist'){
          console.log("--onresize--, data", data);
          let phoneSize = data.phoneSize;
          this.phoneSize = phoneSize;
        }

      })
    },
  }
</script>

<style  scoped>
  input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: white;
    /* placeholder字体大小  */
    font-size: 12px;
  }
  .number {
    border-right: 1px solid white!important;
  }

  .home-container {
    width: 100%;
    min-height: 100vh;
    position: relative;
    background:rgba(248,249,250,1);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 68px;
  }
  .location-container {
    width: calc(100vw * 0.8278);
    display: flex;
    align-items: center;
    margin-top: 19px;
  }
  .position-icon {
    width: 23px;
    height: 23px;
    margin-right: 10px;
  }

  .form-container {
    width: calc(100vw * 0.8278);
    margin-top: 40px;
    background:rgba(248,249,250,1);
    box-shadow:0px 0px 8px 0px rgba(102,102,102,0.11);
    border-radius:10px;
    border:1px solid rgba(231,234,243,1);
  }

  .page-btn {
    color: white;
    font-size: 13px;
    text-align: center;
    -webkit-font-smoothing: antialiased;
    margin-top: 45px;
    line-height: 32px;
    background-color: #58B2F3;
    width: calc(100vw * (64 / 1920));
    cursor: pointer;
  }
  /*.page-btn:hover {*/
    /*background: none;*/
  /*}*/

  .phone-list-container {
    width: calc(100vw * 0.92);
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
  .phone-list-container .list-item-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    height: 124px;
    background:rgba(253,254,254,1);
    border:1px solid rgba(226,230,241,1);
    box-shadow:0px 0px 8px 0px rgba(102,102,102,0.11);
    border-radius:8px;
  }
  .phone-list-container .list-item-container .list-item-top{
    width: 94%;
    border-bottom: 1px solid rgba(145,169,255,0.30);
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .phone-list-container .list-item-container .list-item-top .list-item-top-title{
    font-size: 14px;
    color: #6E7594;
    font-family: PingFangHK-Medium;
    margin-left: 10px;
  }
  .phone-list-container .list-item-container .list-item-top .trade-type-icon{
    font-family: PingFangHK-Medium;
    width: 44px;
    height: 22px;
    line-height: 22px;
    color: white;
    text-align: center;
    border-radius: 1px;
  }


</style>
