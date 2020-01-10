<!-- 地址搜索页面 -->
<template>
  <div class="home-container">
    <!--<div v-if="!phoneSize" class="location-container">-->
      <!--<img src="../../../static/images/icon_positioning@3x.png" class="position-icon">-->
      <!--<span style="color: white;font-size: calc(100vw * (22 / 1920));">{{$t("common.token")}} > {{$t("common.address")}}</span>-->
    <!--</div>-->
    <div v-if="!phoneSize" class="location-container">
      <img src="../../../static/homeImg/network.png" alt="" style="margin-right: 5px">
      <span style="color: black;font-size: calc(100vw * (26 / 1920));">{{$t("common.address")}} <span style="color: #666666;margin-left: calc(100vw * (15 / 1920));">{{id}}</span> </span>
      <div type="button"class="copy-btn"
              @click="onClickCopy(id)"><img src="../../../static/homeImg/capy.png"   style="width: 20px;height: 20px" alt="">   {{$t('common.copy')}}</div>

    </div>

    <div v-if="!phoneSize" class="location-container" style="justify-content: space-between;">
      <div class="centerTop">
        <div>
          <div><img   style="width:calc(100vw * 0.026) ;height: calc(100vw * 0.026)" src="./../../../static/homeImg/priceDai.png" alt=""></div>
          <div> <p style="color: #999999 ;font-size: calc(100vw * (16/1920))">{{$t('common.balance')}}</p>
            <p style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap; width: 100px; font-weight: bolder;font-size:  calc(100vw * (23/1920))">{{balance}}</p>
          </div>
        </div>
        <div>
          <div><img   style="width:calc(100vw * 0.026) ;height: calc(100vw * 0.026)" src="./../../../static/homeImg/value.png" alt=""></div>
          <div> <p style="color: #999999;font-size: calc(100vw * (16/1920))">IDDI{{$t('common.value')}}</p>
            <p style="font-weight: bolder;font-size:  calc(100vw * (23/1920))">$0</p>
          </div>
        </div>
        <div>
          <div><img   style="width:calc(100vw * 0.026) ;height: calc(100vw * 0.026)" src="./../../../static/homeImg/volume.png" alt=""></div>
          <div> <p style="color: #999999;font-size: calc(100vw * (16/1920))">{{$t('home.statistics.transactionNumber')}}</p>
            <p style="font-weight: bolder;font-size:  calc(100vw * (23/1920))">{{lastBlockNumber}}</p>
          </div>
        </div>
        <div style="position: relative;">
          <div></div>
          <div style="margin-top: -18px;"> <p style="color: #999999;font-size: calc(100vw * (16/1920))">{{$t('common.Tokenonth')}}</p>

           <div @click="isshow()" style="cursor: pointer; align-items: center; height: 30px; display:flex;justify-content: space-between;width:calc(100vw * (250/1920));border:1px solid rgba(220,217,217,1);padding: 3px">
             <div >{{$t('common.Pleasechoose')}}</div>  <img src="../../../static/homeImg/selectBlue.png" class="icon-language" :style="isShow ? 'transform:rotate(-180deg)' : ''">
           </div>
             <div v-show="isShow"  style="z-index: 99999; position: absolute;top:95px ; border-radius: 5px; width:calc(100vw * (350/1920));border:1px solid rgb(232,229,229);background: white">
                 <div  @click="add(item.address)" class="selectItem" style="margin-top: 5px;padding: 5px 0px"  v-for="item in tokenAll">
                   <div style="text-align: left; padding: 0 10px; overflow: hidden;text-overflow: ellipsis;white-space: nowrap">{{item.address}} </div>
                   <div style="margin-top: 5px; display: flex;padding: 0px 10px;justify-content: space-between;align-items: center"><div>{{item.balance}} </div> <div>{{item.symbol}} </div>
                   </div>
                 </div>
             </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!phoneSize" ref="addRessList">
      <div style="width:calc(100vw * (621/1920));height: 50px; border-radius: 20px; margin: 30px auto;   display: flex;background:rgba(251,252,253,1);box-shadow:0px 2px 10px 1px rgba(0,160,233,0.16);justify-content: space-between">
         <div  @click="transaction()" class="buttonRadius" :class="isactive ? 'active':' '"> <span>{{$t('common.transactio')}}</span></div>
         <div   @click="transactionCCM()" class="buttonRadius" :class="isactive ? ' ':'active'"><span>EMTC{{$t('common.TokenTrading')}}</span></div>
      </div>

    <div  class="form-container" >
      <div style="width: 100%;display: flex; align-items: center;justify-content: space-between;margin-top: 20px;margin-left: 20px">

        <div style="font-size: calc(100vw * (20/1920))"><p>{{$t('common.Findout')}}  <span>{{lastBlockNumber}}</span>{{$t('common.PenTrading')}}</p>  </div>

        <div style=";height: calc(100vw * (42/1920));border-radius: 4px;border: 1px solid #7782B1;position:relative;overflow: hidden;margin-right: 50px">
          <div style="position: absolute;width: 100%;height: 100%;display: flex;justify-content: space-between;align-items: center;color: #2F93ED;">
            <span style="margin-left: 20px;" v-if="type == 0">{{$t("common.allTrade")}}</span>
            <span style="margin-left: 20px;" v-if="type == 1">{{$t("common.Incoming")}}</span>
            <span style="margin-left: 20px;" v-if="type == 2">{{$t("common.Account")}}</span>
            <img src="../../../static/homeImg/selectBlue.png" class="icon-language" :style="sectionShow ? 'transform:rotate(-180deg)' : ''">
          </div>
          <el-select style="width: 153px;height: 42px;background: rgba(0, 0, 0, 0)"
                     @visible-change="onVisibleChange"
                     @change="onSelectChange"
                     v-model="type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <!--官网后台数据的展示-->
      <el-table  v-show="isactive"   :data="records"
                :empty-text="$t('common.emptyText')"
                :header-cell-style="{background:'rgba(0,0,0,0)', fontSize: 'calc(100vw * (18 / 1920))', color: '#787878', height: '65px', borderBottom: '1px solid rgba(145,169,255,0.30)',textAlign:'center'}"
                :cell-style="{borderBottom:'1px solid rgba(145,169,255,0.30)', height: '65px', textAlign:'center'}"
                :row-style="{borderBottom:'1px solid rgba(145,169,255,0.30)'}"
                style="width:100%;">

        <el-table-column  :label="$t('common.tradeHash')" align="left">
          <template slot-scope="scope">
            <span style="max-width: calc(100vw * (130 / 1920));overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #1EA8FF;display: inline-block;cursor:pointer;" @click="onClickHash(scope.row.hash)">{{ scope.row.hash || ''}}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('home.headerMenu.block')">
          <template slot-scope="scope">
            <span style="max-width: calc(100vw * (100 / 1920));overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #1EA8FF;display: inline-block;cursor:pointer;" @click="onClickBlock(scope.row.blockNumber)">{{ scope.row.blockNumber || ''}}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('home.headerMenu.age')">
          <template slot-scope="scope">
            <span style="max-width: calc(100vw * (130 / 1920));overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color:#333333  ;display: inline-block;">{{ formatSecond(scope.row.timestamp)}}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('home.headerMenu.send')" >
          <template slot-scope="scope">
            <!--<span v-html="1>2? 0:1"></span>-->
            <span  v-if="scope.row.from == id" style="max-width: calc(100vw * (130 / 1920));overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #333333;display: inline-block;" >{{ scope.row.from || ''}}</span>
            <span  v-else style=" cursor: pointer; max-width: calc(100vw * (130 / 1920));overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #1ea8ff;display: inline-block;" @click="onClickReceive(scope.row.from )" >{{ scope.row.from || ''}}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('home.headerMenu.receiver')":width="200">
          <template slot-scope="scope">

            <div  v-if="scope.row.to == id"  style="display: flex;align-items: center;">
              <div style=" background: #0fc63e ;width: 50px;hv-elseeight: 20px;color: white">{{$t('common.enter')}}</div>
              <span style="max-width: calc(100vw * (130 / 1920));overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #666666;display: inline-block;margin-left: 10px;">{{ scope.row.to || ''}}</span>
            </div>
            <div  v-else  style="display: flex;align-items: center;">
              <div style="   background: #e99327 ; width: 50px;height: 20px;color: white">{{$t('common.Out')}}</div>
              <span  v-if="scope.row.contract==1" style="max-width: calc(100vw * (130 / 1920));overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #1EA8FF;display: inline-block;margin-left: 10px;cursor:pointer;" @click="onClickAddress(scope.row.to)">{{ scope.row.to || ''}}</span>

              <span v-if="scope.row.contract==0" style="max-width: calc(100vw * (130 / 1920));overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #1EA8FF;display: inline-block;margin-left: 10px;cursor:pointer;" @click="onClickReceive(scope.row.to)">{{ scope.row.to || ''}}</span>
              <span v-if="scope.row.contract==2" style="max-width: calc(100vw * (130 / 1920));overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #1EA8FF;display: inline-block;margin-left: 10px;cursor:pointer;" @click="onClickAddress(scope.row.realAddress)">{{ scope.row.to || ''}}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('common.NumBer')">
          <template slot-scope="scope">
            <span style="max-width: calc(100vw * (130 / 1920));overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #333333;display: inline-block;">{{scope.row.value | danwei}}EMTC</span>
          </template>
          <!--scope.row.realValue ? scope.row.realValue : (scope.row.realValue || 0)-->
        </el-table-column>


        <el-table-column :label="$t('common.fee')">
          <template slot-scope="scope">
            <span style="max-width: 130px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #333333;display: inline-block;">{{ scope.row.gasPrice * scope.row.gasUsed | danwei }}</span>
          </template>
        </el-table-column>

      </el-table>
      <!--代币交易-->
      <el-table   v-show="!isactive" :data="recordstoken"
                 :empty-text="$t('common.emptyText')"
                 :header-cell-style="{background:'rgba(0,0,0,0)', fontSize: 'calc(100vw * (18 / 1920))', color: '#787878', height: '65px', borderBottom: '1px solid rgba(145,169,255,0.30)',textAlign:'center'}"
                 :cell-style="{borderBottom:'1px solid rgba(145,169,255,0.30)', height: '65px', textAlign:'center'}"
                 :row-style="{borderBottom:'1px solid rgba(145,169,255,0.30)'}"
                 style="width:100%;">

        <el-table-column  :label="$t('common.tradeHash')" align="left">
          <template slot-scope="scope">
            <span style="max-width: calc(100vw * (130 / 1920));overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #1EA8FF;display: inline-block;cursor:pointer;" @click="onClickHash(scope.row.hash)">{{ scope.row.hash || ''}}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('home.headerMenu.block')">
          <template slot-scope="scope">
            <span style="max-width: calc(100vw * (100 / 1920));overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #1EA8FF;display: inline-block;cursor:pointer;" @click="onClickBlock(scope.row.blockNumber)">{{ scope.row.blockNumber || ''}}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('home.headerMenu.age')">
          <template slot-scope="scope">
            <span style="max-width: calc(100vw * (130 / 1920));overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color:#333333  ;display: inline-block;">{{ formatSecond(scope.row.timestamp)}}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('home.headerMenu.send')" >
          <template slot-scope="scope">
            <!--<span v-html="1>2? 0:1"></span>-->
            <span  v-if="scope.row.from == id" style="max-width: calc(100vw * (130 / 1920));overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #333333;display: inline-block;" >{{ scope.row.from || ''}}</span>
            <span  v-else style=" cursor: pointer; max-width: calc(100vw * (130 / 1920));overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #1ea8ff;display: inline-block;" @click="onClickReceive(scope.row.from )" >{{ scope.row.from || ''}}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('home.headerMenu.receiver')":width="200">
          <template slot-scope="scope">
            <div  v-if="scope.row.to == id"  style="display: flex;align-items: center;">
              <div style=" background: #0fc63e ;width: 50px;hv-elseeight: 20px;color: white">{{$t('common.enter')}}</div>
              <span style="max-width: calc(100vw * (130 / 1920));overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #666666;display: inline-block;margin-left: 10px;">{{ scope.row.to || ''}}</span>
            </div>

            <div  v-else  style="display: flex;align-items: center;">
              <div style="   background: #e99327 ; width: 50px;height: 20px;color: white">{{$t('common.Out')}}</div>
              <span  v-if="scope.row.contract==1" style="max-width: calc(100vw * (130 / 1920));overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #1EA8FF;display: inline-block;margin-left: 10px;cursor:pointer;" @click="onClickReceive(scope.row.realAddress)">{{ scope.row.realAddress || ''}}</span>

              <span v-if="scope.row.contract==0" style="max-width: calc(100vw * (130 / 1920));overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #1EA8FF;display: inline-block;margin-left: 10px;cursor:pointer;" @click="onClickReceive(scope.row.to)">{{ scope.row.to || ''}}</span>
            </div>

          </template>
        </el-table-column>
        <el-table-column :label="$t('common.value')">
          <template slot-scope="scope">
            <span style="max-width: calc(100vw * (130 / 1920));overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #333333;display: inline-block;">{{ scope.row.realValue ? scope.row.realValue : (scope.row.realValue || 0)}}</span>
          </template>
        </el-table-column>


        <el-table-column :label="$t('common.NumBer')">
          <template slot-scope="scope">
            <span style="max-width: 130px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;color: #333333;display: inline-block;"> {{scope.row.realValue}}  ({{scope.row.tokenName}})</span>
          </template>
        </el-table-column>

      </el-table>
    </div>
      <div v-if="isactive" style="display: flex;justify-content: flex-end;">
        <div class="page-btn" style="border-right: 1px solid white;"
             @click="onClickJumpFirstPage">{{$t('common.firstPage')}}</div>
        <el-pagination layout=" prev, pager, next"
                       background
                       @current-change="handleCurrentChange" :page-size="10" :total="total" :current-page="page"
                       :prev-text="$t('common.prevPage')"
                       :next-text="$t('common.nextPage')"
                       style="float:right;background-color: rgba(88,178,243,1);margin-top: 45px;">

        </el-pagination>
        <div class="page-btn" style="border-left: 1px solid white;"
             @click="onClickJumpLastPage">{{$t('common.lastPage')}}</div>
      </div>



    </div>
    <!-- 移动端 -->
    <div v-if="phoneSize" class="address-detail-container">

      <div style="font-size: 20px;font-weight: bolder;padding: 20px 10px">{{$t('common.mining')}}
        <img src="./../../../static/homeImg/screen.png" alt="" style="float: right">
        <el-select style="width: 52px;height: 27px;background: rgba(0, 0, 0, 0);position: absolute;right:10px"
                   @visible-change="onVisibleChange"
                   @change="onSelectChange"
                   v-model="type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="address-detail-top">
        <div class="top">
          <img src="../../../static/homeImg/network.png" style="width: 14px; height: 14px;">
          <div style="margin-left: 12px;width: calc(100% - 28px);">
            <div style="color: #6E7594;font-size: 14px;line-height: 14px;">{{$t("common.address")}}</div>
            <div class="top-id-content">{{id}}</div>
          </div>
        </div>

        <div class="top2">
          <div class="top2-item-container" style="width:50%;padding-bottom: 10px;box-sizing: border-box">
            <div style="color: #6E7594;font-size: 10px;"><img  style="width:calc(100vw * 0.046) ;height: calc(100vw * 0.046);vertical-align: middle;margin-right: 5px" src="./../../../static/homeImg/priceDai.png" alt="">{{$t('common.balance')}}</div>
            <div style="margin-top: 5px;color: #333333;font-size: 11px;width:100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis; "><span>{{balance}}</span> EMTC</div>
          </div>
          <div class="top2-item-container" style="width:50%;padding-bottom: 10px;box-sizing: border-box;border-left: 1px solid #dedede">
            <div style="color: #6E7594;font-size: 10px;"><img  style="width:calc(100vw * 0.046) ;height: calc(100vw * 0.046);vertical-align: middle;margin-right: 5px" src="./../../../static/homeImg/value.png" alt="">{{tokenName}}{{$t('common.value')}}</div>
            <div style="margin-top: 5px; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;color: #333333;font-size: 11px;width:100% ;word-wrap: break-word;">$0 EMTC</div>
          </div>
          <div class="top2-item-container" style="width:50%;padding-top: 10px;border-top: 1px solid #dedede ">
            <div style="color: #6E7594;font-size: 10px;"><img  style="width:calc(100vw * 0.046) ;height: calc(100vw * 0.046);vertical-align: middle;margin-right: 5px" src="./../../../static/homeImg/volume.png" alt="">{{$t('common.transaction')}}</div>
            <div style="margin-top: 5px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;color: #333333;font-size: 11px;width:100%;word-wrap: break-word; ">{{lastBlockNumber}} {{$t("home.statistics.transactionNumberUnit")}}</div>
          </div>
          <div  class="top2-item-container" style="position: relative; width: 50%;padding-top: 10px;border-top: 1px solid #dedede ;border-left: 1px solid #dedede;box-sizing: border-box" >
            <div style="color: #6E7594;font-size: 10px;">{{$t('common.Tokenonth')}}</div>

            <div @click="isshow()" style="cursor: pointer; align-items: center; height: 20px; display:flex;justify-content: space-between;width:calc(100vw * (250/759));border:1px solid rgba(220,217,217,1);padding: 3px">
              <div >{{$t('common.Pleasechoose')}}</div>  <img src="../../../static/homeImg/selectBlue.png" class="icon-language" :style="isShow ? 'transform:rotate(-180deg)' : ''">
            </div>
            <div v-show="isShow"  style="z-index: 99999; position: absolute;top: 60px; border-radius: 5px; width:calc(100vw * (350/750));border:1px solid rgb(232,229,229);background: white">
              <div  @click="add(item.address)" class="selectItem" style="margin-top: 5px;padding: 5px 0px"  v-for="item in tokenAll">
                <div style="text-align: left; padding: 0 10px; overflow: hidden;text-overflow: ellipsis;white-space: nowrap">{{item.address}} </div>
                <div style="margin-top: 5px; display: flex;padding: 0px 10px;justify-content: space-between;align-items: center"><div>{{item.balance}} </div> <div>{{item.symbol}} </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
    <div  v-if="phoneSize" style="width:80%;height: 40px; border-radius: 20px; margin: 30px auto;   display: flex;background:rgba(251,252,253,1);box-shadow:0px 2px 10px 1px rgba(0,160,233,0.16);justify-content: space-between">
      <div  style="line-height: 40px" @click="transaction()" class="buttonRadius" :class="isactive ? 'active':' '"> <span>{{$t('common.transactio')}}</span></div>
      <div   style="line-height: 40px"  @click="transactionCCM()" class="buttonRadius" :class="isactive ? ' ':'active'"><span>EMTC{{$t('common.TokenTrading')}}</span></div>
    </div>
    <div    v-show="isactive" v-if="phoneSize" class="phone-list-container " ref="iphoneList">
      <div    class="list-item-container" v-for="(item, index) in records" >
        <div class="list-item-top">
          <div style="display: flex;align-items: center;">
            <img src="../../../static/homeImg/boxMun.png" style="width: 17px;height: 17px;">
            <div   @click="onClickShowDetail(item.hash)" style="width:calc(100vw * 0.74); overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color: #1ea8ff"  class="list-item-top-title">{{$t('common.labelHash')}}{{item.hash}}</div>
          </div>
          <div v-if="item.to == id" class="trade-type-icon" style="background-color: #20BA05;">进</div>
          <div v-else class="trade-type-icon" style="background-color: #E58335;">出</div>
        </div>
        <div style="margin-top: 10px;width: 94%;display: flex;flex-direction: column;line-height:21px">
          <div>
            <div   @click="onClickBlock(item.blockNumber)" style="font-size: 12px;color: #7782B1;display: flex;align-items: center;">{{$t("home.headerMenu.block")}}：<span style="font-size: 12px;color: #1EA8FF;max-width: calc(100vw * 0.74); text-overflow: ellipsis;overflow: hidden;display: inline-block;">{{item.blockNumber}}</span> </div>
          </div>
          <div>
            <div style="font-size: 12px;color: #7782B1;display: flex;align-items: center;">{{$t('home.headerMenu.age')}}：<span style="font-size: 12px;color:#666666;max-width: calc(100vw * 0.74); text-overflow: ellipsis;overflow: hidden;display: inline-block;">{{formatSecond(item.timestamp)}}</span> </div>
          </div>
          <div>
            <div style="font-size: 12px;color: #7782B1;display: flex;align-items: center;">{{$t('common.fee')}}：<span style="font-size: 12px;color: #666666;max-width: calc(100vw * 0.74); text-overflow: ellipsis;overflow: hidden;display: inline-block;">{{ item.gasPrice * item.gasUsed | danwei}}</span> </div>
          </div>
        </div>
      </div>
      <div v-if="records.length == 0" style="width: 100%;color: #1EA8FF;text-align: center;">暂无数据</div>
      <div v-if="!nomore && records.length > 0" style="width: 100%;color: #1EA8FF;text-align: center;" @click="onClickShowMore">{{$t('common.clickForMore')}}</div>
    </div>
  <!--移动端代币交易-->
    <div   v-show="!isactive" v-if="phoneSize" class="phone-list-container " ref="iphoneList">
      <div    class="list-item-container" v-for="(item, index) in recordstoken" >
        <div class="list-item-top">
          <div style="display: flex;align-items: center;">
            <img src="../../../static/homeImg/boxMun.png" style="width: 17px;height: 17px;">
            <div   @click="onClickShowDetail(item.hash)" style="width:calc(100vw * 0.74); overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color: #1ea8ff"  class="list-item-top-title">{{$t('common.labelHash')}}{{item.hash}}</div>
          </div>
          <div v-if="item.to == id" class="trade-type-icon" style="background-color: #20BA05;">进</div>
          <div v-else class="trade-type-icon" style="background-color: #E58335;">出</div>
        </div>
        <div style="margin-top: 10px;width: 94%;display: flex;flex-direction: column;line-height:21px">
          <div>
            <div   @click="onClickBlock(item.blockNumber)" style="font-size: 12px;color: #7782B1;display: flex;align-items: center;">{{$t("home.headerMenu.block")}}：<span style="font-size: 12px;color: #1EA8FF;max-width: calc(100vw * 0.74); text-overflow: ellipsis;overflow: hidden;display: inline-block;">{{item.blockNumber}}</span> </div>
          </div>
          <div>
            <div style="font-size: 12px;color: #7782B1;display: flex;align-items: center;">{{$t('home.headerMenu.age')}}：<span style="font-size: 12px;color:#666666;max-width: calc(100vw * 0.74); text-overflow: ellipsis;overflow: hidden;display: inline-block;">{{formatSecond(item.timestamp)}}</span> </div>
          </div>
          <div>
            <div style="font-size: 12px;color: #7782B1;display: flex;align-items: center;">{{$t('common.fee')}}：<span style="font-size: 12px;color: #666666;max-width: calc(100vw * 0.74); text-overflow: ellipsis;overflow: hidden;display: inline-block;">{{item.gasPrice * item.gasUsed | danwei}}</span> </div>
          </div>
        </div>
      </div>
      <div v-if="records.length == 0" style="width: 100%;color: #1EA8FF;text-align: center;">暂无数据</div>
      <div v-if="!nomore && records.length > 0" style="width: 100%;color: #1EA8FF;text-align: center;" @click="onClickShowMore">{{$t('common.clickForMore')}}</div>
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

    },
    components:{
      phoneChart,
      pcChart
    },
    data(){
      return{
        // phoneSize: false,
        // browserType: '',
        lastBlockNumber:'',
        isShow:false,
        tokenAll:[],
        isactive:true,
        iphoneListDate:'',
        loading:"",
        tokenName: '',
        page: 1,
        pageSize: 10,
        type: 0,
        id: '',
        total: 0,
        balance: 0,
        status: 0, // 代币转换率
        tradeNum: 0,
        records: [],
        recordstoken:[],
        sectionShow: false,
        phoneSize: false,
        nomore: false,
        options: [{
          value: 0,
          label: this.$t("common.allTrade")
        },{
          value: 1,
          label:this.$t("common.Incoming")
        },{
          value: 2,
          label: this.$t("common.Account")
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
      isshow(){
        this.isShow=! this.isShow;
      },

      onClickReceive(id){
        this.$router.push({
          path: '/addresssearch',
          query: {
            id: id
          }
        });
        this.$router.go(0);
      },
     //跳转代币交易
      add(hash){
        this.$router.push({
          path: '/receiver',
          query: {
            id: hash
          }
        })
      },
      tokenData(){
        let url = `${BASE_URL}/block/browser/tokenBalance`;
        let params={
          address: this.id,
        }
        this.$jsonp(url, params).then(res=>{
          this.tokenAll=res.obj;
        })
      },

      // 代币交易接口
      tokenDataAll(){
        let url = `${BASE_URL}/block/browser/tokenPageByAddress`;
        let params = {
          address: this.id,
          pageNo: this.page,
          pageSize: this.pageSize,
          type: this.type, // 0 全部交易 1: 进 2：出
        }
        this.$jsonp(url, params).then(res=>{
          console.log( '代币交易',res);
          this.recordstoken = res.obj
        })
      },
       // 全部交易接口
      getData() {
        let url = `${BASE_URL}/block/browser/transactionPageByAddress`;
        let params = {
          address: this.id,
          pageNo: this.page,
          pageSize: this.pageSize,
          type: this.type, // 0 全部交易 1: 进 2：出

        }
        this.$jsonp(url, params).then(res=>{
          this.loading.close();
          console.log("_---------根据地址获取交易列表", res);
          // this.iphoneListDate.close();
          this.balance = res.code; // 改地址的余额
          this.status = res.status; // 改地址的余额
          this.tradeNum = res.msg || 0; // 该地址的交易数量
          this.lastBlockNumber=res.lastBlockNumber||0;
          if(this.page == 1) {
            this.records = res.obj
          } else {
            this.records = res.obj;
          }
          this.total = res.lastBlockNumber || 0;
        });
      },

      transaction(){
        this.isactive=!this.isactive;
      },
      transactionCCM(){
        this.isactive=!this.isactive;

        // this.$router.go(0)
      },
      onVisibleChange(e) {
        this.sectionShow = e;
      },
      onSelectChange(e) {
        console.log("---onSelectChange---", e);
        this.loading=this.$loadingData(this.$refs.addRessList,this.loading);
        this.getData();
      },
      handleCurrentChange(page) {
        this.loading=this.$loadingData(this.$refs.addRessList,this.loading);
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
        this.loading=this.$loadingData(this.$refs.addRessList,this.loading);
        this.page = 1;
        this.getData();
      },
      onClickJumpLastPage() {
        this.loading=this.$loadingData(this.$refs.addRessList,this.loading);
        this.page = Math.ceil(this.total / 10);
        this.getData();
      },
      onClickShowDetail(hash) {
        this.$router.push({
          path: '/toFromPhone',
          query: {
            id: hash,
            // address: this.id
          }
        })
      },
      onClickShowMore() {
        this.page++;
        this.getData();
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
          path: '/receiver',
          query: {
            id: id
          }
        })
        // this.getData();
        // this.$router.go(0)
      },
      onClickBlock(blockNumber) {
        // TODO: 跳转到地址搜索界面
        this.$router.push({
          path: '/blocksearch',
          query: {
            id: blockNumber
          }
        })
      }
    },
    mounted() {

      this.loading=this.$loadingData(this.$refs.addRessList,this.loading);
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
      this.tokenData()
      this.tokenDataAll();
      if(window.innerWidth < 1000) {
        this.phoneSize = true;
      } else {
        this.phoneSize = false;
      }
      this.$customEvent.$on('onresize',data=>{
        if(this.$route.path == '/addresssearch'){
          console.log("--onresize--, data", data);
          let phoneSize = data.phoneSize;
          this.phoneSize = phoneSize;
        }

      })

      this.$customEvent.$on('filterTrade',data=>{
        if(this.$route.path == '/addresssearch'){
          console.log("--onFilterTrade--, data", data);
          this.type = data;
          this.page = 1;
          this.getData();
        }

      })
    },
  }
</script>

<style scoped>
  /*.el-select-dropdown{*/
    /*top: 150px!important;*/

  /*}*/
  .selectItem:hover{
    background: #f5f5f5;
    color: #1ea8ff;
  }
  .el-select{
    -webkit-tap-highlight-color: transparent!important;
  }
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
    margin: 0 0 !important;
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
    width: calc(100vw * 0.8278);
    display: flex;
    align-items: center;
    margin-top: calc(100vw * (40 / 1920));
  }
  .position-icon {
    width: calc(100vw * (23 / 1920));
    height: calc(100vw * (23 / 1920));
    margin-right: calc(100vw * (10 / 1920));
  }
  .copy-btn {
    width: calc(100vw * (180 / 1920));
    height: calc(100vw * (26 / 1920));
    line-height: calc(100vw * (28 / 1920));
    font-size: calc(100vw * (16 / 1920));
    color: #2F94ED;
    margin-left: 20px;
    text-align: center;
    cursor: pointer;
  }

  .qr-code-icon {
    width: 22px;
    height: 22px;
    margin-left: 20px;
  }
  .detail-item-container {
    width: calc(100vw * (780/1920));
    height: calc(100vw * (132 / 1920));
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

  .form-container {
    width: calc(100vw * 0.8278);
    margin-top: calc(100vw * (40 / 1920));
    background:rgba(248,249,250,1);
    border:1px solid rgba(231,234,243,1);
    box-shadow:0px 0px 8px 0px rgba(102,102,102,0.11);
    border-radius:10px;
  }

  .trade-icon {
    width: calc(100vw * (30 / 1920));
    vertical-align: middle !important;
  }
  .page-btn {
    color: white;
    font-size: 13px;
    text-align: center;
    -webkit-font-smoothing: antialiased;
    margin-top: 45px;
    line-height: 32px;
    cursor: pointer;
    background-color: rgba(88,178,243,1);
    width: calc(100vw * (64 / 1920))
  }

  .icon-language {
    margin-right: 10px;
    transition-duration:0.5s ;
    width: 8px;
    height: 8px;
  }

  .address-detail-container {
    width: calc(100vw * 0.92);
    margin-top: 79px;
  }

  .address-detail-top {
    width: 100%;
    /*height: 191px;*/
    /*padding-bottom: 10px;*/
    background:rgba(252,253,254,1);
    border:1px solid rgba(226,230,241,1);
    border-radius:10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: PingFangHK-Regular;
  }

  .address-detail-top .top {
    width: 94%;
    border-bottom: 1px solid rgba(145,169,255,0.30);
    margin-top: 15px;
    height: 70px;
    display: flex;
    padding-bottom: 10px;
  }
  .address-detail-top .top2 {
    width: 91%;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    text-align: center;
    padding-bottom: 10px;
    flex-wrap: wrap;
  }
  .address-detail-top .top .top-id-content{
    font-family: PingFangHK-Regular;
    font-size: 14px;
    color: #666666;
    text-align: justify;
    margin-top: 5px;
    word-break: break-word;
  }
  .address-detail-top .top2 .top2-item-container{
    display: flex;
    flex-direction: column;
    align-items: center;

  }
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    background: rgba(25, 124, 212, 0.5)
  }
  .phone-list-container {
    width: calc(100vw * 0.92);
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    cursor: pointer;
  }
  .phone-list-container .list-item-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    height: 124px;
    background:rgba(252,253,254,1);
    border:1px solid rgba(226,230,241,1);
    border-radius:10px;
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
  .centerTop{
    width:calc(100vw * 0.8278);
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  .centerTop>div{
    width:calc(100vw * 0.2);
    background:rgba(251,252,253,1);
    border:1px solid rgba(231,234,243,1);
    box-shadow:0px 0px 8px 0px rgba(102,102,102,0.11);
    border-radius:4px;
    height: 131px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .centerTop>div>div:nth-of-type(1){
    margin-right: calc(100vw * (20/1920));
  }
  .buttonRadius{
    width: 45%;
    border-radius:20px;
    text-align: center;
    line-height: 50px;
    font-size: 17px;
    cursor: pointer;
    overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
  }
  .active{
    background: #2F93ED;
    color: white;
  }
</style>
