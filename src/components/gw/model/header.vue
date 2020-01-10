<template>
  <div class="gw-header">
    <div class="center-container" v-if="!phoneSize">
      <div class="top-container" >
        <div  class="logo" style="z-index: 10;width: 80px;height: 80px;border-radius: 100%;overflow: hidden">
          <!--<img src="../../../../static/homeImg/emtc.jpg" :style="logoStyle">-->
        </div>
        <div class="top-selector-container" :style="!phoneSize && $route.path != '/home' ? 'width:calc(100vw * 0.5)' : ''">
          <div style="cursor: pointer;" ><router-link to="/home">{{$t("common.home")}}</router-link></div>
          <div style="cursor: pointer;" ><router-link to="/allblocklist">{{$t("common.viewBlock")}}</router-link></div>
          <div style="cursor: pointer;" ><router-link to="/alltradelist">{{$t("common.viewTransaction")}}</router-link></div>
          <div style="cursor: pointer;position: relative;color:#6C757E" >{{$t('common.language')}}<img src="../../../../static/homeImg/select.png" class="language-icon">
            <div style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;">
              <el-select style="width: 100%;height: 100%;background: rgba(0, 0, 0, 0)"
                         @visible-change="onVisibleChange"
                         @change="onSelectChange"
                         v-model="curLanguage" placeholder="请选择">
                <el-option  style=" "
                  v-for="item in languageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <!-- 搜索框 -->
          <div class="header-search-container" v-if="!phoneSize && $route.path != '/home'">
            <input type="text" :placeholder="$t('common.searchHome')" v-model="searchData"
                   placeholder-style="color:red;opacity:0.5;"
                   style="padding-left: 10px;color: #999999;font-size: 12px;width: calc(90% - 10px);background: white;border:1px solid rgba(213,218,226,1);">
            <div style="width: 12%;cursor:pointer;height: 100%;background-color: #545F8C; text-align: center;display: flex;justify-content: center;align-items: center;background:rgba(52,152,219,1);" @click="onClickSearch(searchData)">
              <img src="../../../../static/images/icon_top_search@3x.png" style="width: 20px;height: 20px;">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="phone-center-container" v-else>
      <div class="phone-top-container" >
        <!--<div style="z-index: 10;">-->
          <!--<img src="../../../../static/images/icon_arrow@3x.png"-->
               <!--v-if="browserType == 'iphone' || browserType == 'android' || $route.path != '/home'"-->
               <!--@click="onClickBack"-->
               <!--:style="phoneBackIconStyle">-->
        <!--</div>-->
        <div class="top-selector-container">
          <!--<img src="../../../../static/images/logo-01@2x.png" style="width: 30px;height: 30px">-->
          <div  class="logo" style="z-index: 10;width: 40px;height: 32px;border-radius: 100%;overflow: hidden"></div>
          <div style="width: 100%;margin-left: 15px">{{$t('home.headerMenu.name')}}</div>
        </div>
        <div>
          <select  style="outline: none;height: 24px;line-height: 20px;border:1px solid rgba(191,191,191,1);" @change="onClickChangeLanguage($event.target.value)">
            <option  style="outline: none ;border:none"  v-for="item in languageOptions" :value="item.value">  {{item.label}}  </option>

          </select>
        </div>


        <div style="display: flex;width: 90px;flex-direction: row-reverse;z-index: 10;">
          <!--<img src="../../../../static/images/icon_top_search@3x.png"-->
               <!--style="margin-left: 18px;"-->
               <!--v-if="checkSearchIcon"-->
               <!--:style="phoneSearchStyle">-->
          <!--<img src="../../../../static/images/icon_filter@3x.png"-->
               <!--v-if="$route.path == '/addresssearch'"-->
               <!--@click="showFilter = !showFilter"-->
               <!--:style="phoneSearchStyle">-->
          <img src="../../../../static/homeImg/NavMenu.png"
               @click="onClickShowMenu"
               v-if="!showPhoneMenu"
               :style="phoneDirIconStyle">
          <!--v-if="$route.path == '/home' && !showPhoneMenu"-->
          <img src="../../../../static/homeImg/clos.png"
               @click="onClickShowMenu"
               v-if="showPhoneMenu"
               :style="phoneDirIconStyle">
          <!--v-if="$route.path == '/home' && showPhoneMenu"-->
        </div>
      </div>
      <div style="z-index: -111" v-show="$route.path !='/home' && !showPhoneMenu">
            <div style="display: flex;width: 100%;margin-top: 20px;">
              <input    v-model="searchData" type="text"  :placeholder="$t('common.searchHome') " style="width: 90%;box-sizing:border-box;border-radius:8px 0px 0px 8px;height:40px;border:1px solid rgba(227,231,241,1);padding-left: 10px">
              <div style="  cursor: pointer;text-align: center;line-height: 48px;  height: 40px;width: 10%;background:rgba(52,152,219,1);border-radius:0px 8px 8px 0px;" @click="onClickSearch(searchData)">
                <img src="../../../../static/images/icon_top_search@3x.png" alt="" style="width: 20px;height: 20px;">

              </div>
            </div>
      </div>
    </div>

    <div class="filter-container" v-if="phoneSize && showFilter" >
      <div style="position: relative;padding: 8px 0 10px 0px;">
        <div class="bg-9png">
          <div class="trade-type-item"
               v-for="(item, index) in tradeType"
               :key="index">{{$t("common." + item.str)}}</div>
        </div>
        <div class="trade-type-item"
             @click="onClickFilterTradeType(item)"
             v-for="(item, index) in tradeType"
             :key="index"
             style="opacity: 0;">{{$t("common." + item.str)}}</div>
      </div>
    </div>

    <div v-if="phoneSize" v-show="showPhoneMenu"
         class="phone-menu"
         @click="showPhoneMenu = false"
         @touchmove.prevent @mousemove.prevent>
      <div style="width: 100%;height: calc(100% - 40px);position: relative;margin-top: 40px;overflow: hidden;">
        <transition name="slide">
          <div class="phone-menu-container" v-show="showPhoneMenu" @click.stop.prevent>
            <div class="phone-menu-item"
                 :style="$route.path == '/home' ? 'color: #3498db;' : ''"
                 @click.stop="onClickJump('/')">
              <div>{{$t('common.home')}}</div>
              <span> ></span>
            </div>
            <div class="phone-menu-item"
                 :style="$route.path == '/allblocklist' ? 'color: #3498db;' : ''"
                 @click.stop="onClickJump('/allblocklist')">
              <div>{{$t('common.viewBlock')}}</div>
              <span> ></span>
            </div>
            <div class="phone-menu-item"
                 :style="$route.path == '/alltradelist' ? 'color: #3498db;' : ''"
                 @click.stop="onClickJump('/alltradelist')">
              <div>{{$t('common.viewTransaction')}}</div>
              <span> ></span>
            </div>
            <div class="phone-menu-item"
                 :style="$route.path == '/alltradelist' ? 'color: #3498db;' : ''"
                 @click="languageOptionShow = !languageOptionShow">
              <div>{{$t('header.switchLanguage')}}</div>
              <span :style="languageOptionShow ? 'transform: rotate(90deg)' : ''"> ></span>
            </div>
            <div class="phone-menu-item-language"
                 v-if="languageOptionShow"
                 :style="$route.path == '/alltradelist' ? 'color: #3498db;' : ''">

              <div class="phone-language"
                   v-for="(languageItem, languageIndex) in languageOptions"
                   :key="languageIndex"
                   :style="$i18n.locale == languageItem.code ? 'color: #3498db' : ''"
                   @click.stop="onClickChangeLanguage(languageItem.value)">{{languageItem.label}}</div>

            </div>

            <!--<div style="height: 50px;width: 94%;" @click="onClickJump('/')">首页</div>-->
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    browserType: {
      type: String,
      default: ''
    },
    phoneSize: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      searchData: '',
      showPhoneMenu: false,
      showFilter: false,
      curLanguage: 0,
      languageOptionShow: false,
      tradeType: [{
      //   str: 'all',
      //   value: 0,
      // },{
        str: 'income',
        value: 1,
      }, {
        str: 'outgoing',
        value: 2,
      }],
      languageOptions: [{
        value: 0,
        label: '中文',
        code: 'zh'
      },{
        value: 1,
        label: 'English',
        code: 'en'
      }]
    }
  },
  computed: {
    // ...mapState({
    //   loginState: state => state.user.account.mobile
    // }),
    checkTitle(path) {
      return path=>{
        let str = ''
        if(path == '/addresssearch' || path == '/hashsearch' || path == '/blocksearch') {
          str = this.$t("header.searchResult");
        } else if(path == '/tradedetailphone') {
          str = this.$t("header.tradeDetail");
        } else if(path == '/alltradelist') {
          str = this.$t('common.allTrade');
        } else if(path == '/allblocklist') {
          str = this.$t('common.allBlock');
        } else {
          str = this.$t("header.browser");
        }
        return str;
      }
    },
    logoStyle() {
      let style = `width: calc(100vw * (98 / 1920));vertical-align: middle !important;`;

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
              transition-duration:0.5s ;

              `;
      return style;
    },
    phoneSearchStyle() {
      let style = `width:20px;
              height:20px;
              vertical-align: middle;
              `;

      return style;
    },
    checkSearchIcon() {
      let path = this.$route.path;
      if(path == '/addresssearch'
        || path == '/blocksearch'
        || path == '/hashsearch'
        || path == '/tradedetailphone'
        || path == '/alltradelist'
        || path == '/allblocklist') {
        return true;
      }
      return false;
    },
  },

  mounted() {
    this.$i18n.locale = localStorage.getItem('language') || 'zh';

  },
  methods: {
    ...mapActions(['clearRoleAccountAction']),
    onVisibleChange(show) {
      console.log("show_-", show)
    },
    onSelectChange(e) {
      console.log("----e", e)
      if(e === 0) {

        this.$i18n.locale = 'zh';
      } else if(e === 1) {
        this.$i18n.locale = 'en'
      }
      localStorage.setItem('language', this.$i18n.locale)
    },
    onClickJump(path) {
      this.showPhoneMenu = false;
      this.$router.push({
        path: path,
      });
    },
    onClickChangeLanguage(e) {
      console.log(e);
      if(e == 0) {
        this.$i18n.locale = 'zh';
      } else if(e == 1) {
        this.$i18n.locale = 'en';
      }
      localStorage.setItem('language', this.$i18n.locale);
      this.languageOptionShow = false;
      this.showPhoneMenu = false;
    },
    async onClickSearch (searchData) {
      console.log(searchData);
      // 搜索的是什么
      console.log("onClickSearch", searchData);
      let len = searchData.length;
      console.log("-------searchData-----", searchData);
      console.log("-------len111-----", len);
      console.log("-------!isNaN(searchData)-----", isNaN(searchData));
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
        let code = await this.$web3.eth.getCode(searchData);
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
      this.searchData= '';
    },
    onClickBack() {
      console.log("------点击返回---")
      window.history.back();
    },
    onClickShowMenu() {
      this.showPhoneMenu = !this.showPhoneMenu;
      console.log(`${this.showPhoneMenu ? '展开' : '隐藏'}菜单`)
    },
    onClickFilterTradeType(filterItem) {
      console.log("--onClickFilterTradeType--")
      this.$customEvent.$emit('filterTrade', filterItem.value);
      this.showFilter = false;
    }
  },
  components: {
    // loginBlock
  }
}
</script>

<style lang="scss" scoped>
  .gw-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    padding-bottom: 15px;
  }
  .home-container {
    width: 100vw;
    min-height: 100vh;
    position: relative;
    background-color: rgb(29, 35, 58);
    /*display: flex;*/
    /*flex-direction: column;*/
    /*align-items: center;*/
    /*justify-content: center;*/
  }
  .center-container {
    width: calc(100vw * 0.8276);
    display: flex;
    flex-direction: column;
    justify-content: center;
    /*padding-left: 18.75%;*/
    /*padding-right: 18.75%;*/
    padding-top: 1px;
    align-items: center;
  }

  .phone-center-container {
    position: fixed;
    top: 0;
    z-index: 999;
    width: calc(100vw * .92);
    padding-left: calc(100vw * .04);
    padding-right: calc(100vw * .04);
    /*background-color: rgb(29, 35, 58);*/
    background: white;
  }
  .phone-top-container {
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
  }
.logo{
  background-image: url('../../../../static/homeImg/emtc.jpg');
  background-size: cover;
}
  .top-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: calc(100vw * (50 / 1920));
    position: relative;
  }

  .top-selector-container {
    color: black;
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

  .header-search-container {
    width: calc(100vw * 0.26);
    height: 40px;
    background-color: #3B4469;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
  }
  .phone-menu {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    background: rgba(29, 35, 58, 0.5);
    z-index: 10;
  }
  .phone-menu-container {
    position: absolute;
    background: white;
    width: 100%;
    height: auto;
    -webkit-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;

    .phone-menu-item {
      height: 50px;
      width: 94%;
      line-height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .phone-menu-item-language {
      height: 50px;
      width: calc(94% - 25px);
      line-height: 50px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;

      .phone-language {
        width: 100%;
        line-height: 20px;
      }
    }
  }

  .slide-enter-active {
    animation-name: slideInUp;
    animation-duration: 0.2s;
    animation-fill-mode: both;
  }
  @keyframes slideInUp {
    0% {
      transform: translate3d(0, -100%, 0);
      visibility: visible;
    }

    to {
      transform: translateZ(0);
    }
  }
  .delay-leave-active {
    -webkit-animation-delay: 0.2s;
    -moz-animation-delay: 0.2s;
    -o-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }

  .filter-container {
    position: fixed;
    top: 50px;
    right: 30px;
    z-index: 999;
    width: 70px;
    font-size: 14px;
    color: white;
    text-align: center;
    .trade-type-item {
      height: 30px;
      line-height: 30px;
    }
    .bg-9png {
      position: absolute;
      border: .1px solid;
      border-image-source: url(../../../../static/images/icon_screening@3x.png);
      border-image-slice: 60 190 45 104;
      border-image-width: 30px 80px 12px 50px;
      border-image-outset: 16px 11px 4px 11px;
      border-image-repeat: stretch;
      margin: auto;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 8px 0 10px 0px;
    }
  }
  input::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder {
    color: #999999;
  }
  .top-selector-container>div>a{
    color: #6C757E;
  }
  .router-link-exact-active{
    color: #1C8AEC !important;
  }

</style>
