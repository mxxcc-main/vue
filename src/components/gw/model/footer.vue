<!--页脚-->
<template>
  <div class="">
    <div class="home-footer"  style="padding: calc(100vw  * (15/1920)) 0px" v-if="!phoneSize">
    <div class="home-content">
      <div class="product" style="width: calc(100vw * (500 / 1920));overflow: hidden;">
        <div class="bgImg"   style="text-align: center;height: 100%; width: calc(100vw * (346/ 1920));float: right;background-size: cover">
        <div  class="logo" v-if="$route.path!='/home'" >   </div>
          <p   v-if="$route.path!='/home'" style="font-size:calc(100vw * (20/ 1920));color: white "> {{$t("common.Brm")}}</p>
        </div>
      </div>

      <div class="product" style="width: calc(100vw * (750 / 1920));">

           <ul    class="linkList" style="list-style: none;color: white">
             <li style="border-bottom: 1px solid #4B76CA;margin-top:0" >{{$t("common.link")}}</li>
             <li style="font-size: 12px"> <img src="../../../../static/homeImg/ctq.png" alt="" style="width: calc(100vw * (18/1920));height: calc(100vw * (18/1920));vertical-align:middle;">
               <a href="">{{$t("common.Ctq")}}</a>
             </li>
             <li style="font-size: 12px"> <img src="../../../../static/homeImg/network.png" alt="" style=";vertical-align:middle;">  <a href="">EMTC GitHub</a></li>
             <li style="font-size: 12px"> <img src="../../../../static/homeImg/CCMwebsite.png" alt="" style=";vertical-align:middle;"> <a href="">{{$t("common.ccmWebsite")}}</a> </li>
           </ul>
      </div>
    </div>
    <div style="width: 100% ;margin-top: 39px ;border-top:1px solid #4B76CA;text-align: center ;color: white">
             <p>copyright©2019 hml.com ALL Rights Rwsened</p>
    </div>
    </div>

    <!--移动端-->
     <div class="iphoneFooter" style="padding: 10px" v-if="phoneSize">
              <div style="display: flex;padding-top: 20px;height: calc(100vw  * (350/1920));">
                   <div class="bgImg" style="flex: 1;text-align: center;" >     <div  style="width: 50px;height: 50px" class="logo" v-if="$route.path!='/home'" >   </div></div>
                   <div style="flex: 1;color: white ;font-size: 16px; "><p>{{$t("common.Brm")}}</p></div>
              </div>
             <div style="margin-top: 40px">
               <ul    class="linkList" style="list-style: none;color: white;margin: 0px">
                 <li style="border-bottom: 1px solid #4B76CA;margin-top:0;font-size: 14px" >{{$t("common.link")}}</li>
                 <li style="font-size: 13px"> <img src="../../../../static/homeImg/ctq.png" alt="" style="width: 18px ;height: 18px;  vertical-align:middle;">
                   <a href="">{{$t("common.Ctq")}}</a>
                 </li>
                 <li style="font-size: 13px"> <img src="../../../../static/homeImg/network.png" alt="" style=";vertical-align:middle;">  <a href="">EMTC GitHub</a></li>
                 <li style="font-size:13px"> <img src="../../../../static/homeImg/CCMwebsite.png" alt="" style=";vertical-align:middle;"> <a href="">{{$t("common.ccmWebsite")}}</a> </li>
               </ul>
             </div>
       <div  style="width: 100% ; ;border-top:1px solid #4B76CA;text-align: center ;color: white;margin-top: 15px;padding: 20px 0px">
         <span >copyright©2019 hml.com ALL Rights Rwsened</span>

       </div>
     </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      phoneSize: false,
    }
  },
  mounted() {
    if(window.innerWidth < 1000) {
      this.phoneSize = true;
    } else {
      this.phoneSize = false;
    }
    this.$customEvent.$on('onresize',data=>{
      // if(this.$route.path == '/home'){
        console.log("--onresize--, data", data);
        let phoneSize = data.phoneSize;
        this.phoneSize = phoneSize;
      // }

    })
  }
}
</script>

<style scoped>
  .bgImg{
    background: url("./../../../../static/homeImg/Ellipse662.png") ;
    background-size: cover;
  }
  .iphoneFooter{
       /*height: 100px;*/
    background:linear-gradient(86deg,rgba(32,112,212,1),rgba(37,80,183,1));
  }
   .linkList>li{
       margin-top: calc(100vw*(20/1920));
   }
   .linkList>li>a{
       color: #DCDBE7;
     cursor: pointer;
   }
.home-footer {
  /*padding-bottom: 20px;*/
  width: 100%;
  /*height: calc(100vw * (242 / 1920));*/
  /*background-color: #293150;*/
  background-image: linear-gradient(-180deg, #2070D4 100%, #2550B7 100%);
}
.home-content {
  display: flex;
  width: calc(100vw * 0.525);
  height: 84%;
  margin: auto;
  /*overflow: hidden;*/
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
.product {
  height: calc(100vw * (153 / 1920));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.footer-logo {
  width: calc(100vw * (82 / 1920));
  height: calc(100vw * (82 / 1920));
  /*height: calc(100vw * (60 / 1920));*/
}
.footer-email-logo {
  width: calc(100vw * (25 / 1920));
  height: calc(100vw * (24 / 1920));
  margin-right: 14px;
  vertical-align: middle !important;
}
.foot-email-span {
  font-size: calc(100vw * (16 / 1920));
  color: white;
  white-space: nowrap;
  min-width: 300px;
  text-overflow:ellipsis;
  overflow: hidden;
  display: inline-block;
}

.link-style1 {
  width: calc(100vw * (170 / 1920));
  height: calc(100vw * (36 / 1920));
  position: relative;
  text-align: center;
  line-height: calc(100vw * (36 / 1920));
  color: white;
  font-size: calc(100vw * (16 / 1920));
  margin-bottom: calc(100vw * (20 / 1920));
  margin-right: calc(100vw * (40 / 1920));
  border-radius: 18px;

}
.link-style1 .link-style1-icon{
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: calc(100vw * (36 / 1920));
}
.link-style1-content {
  width: calc(100vw * (170 / 1920));
  height: calc(100vw * (36 / 1920));
  /*background-color: #293150;*/
  border-radius: 17px;
  margin-top: 1px;
  margin-left: 1px;
}

.link-style2 {
  width: 280px;
  height: 36px;
  border-radius: 36px;
  border: 1px white solid;
  text-align: center;
  line-height: 36px;
  color: white;
  font-size: 16px;
}
.logo{
  background-image: url("../../../../static/homeImg/emtc.jpg");
  background-size: cover;
  width: 80px;
  height: 80px;
  border-radius: 100%;
  margin: 0px auto;
}
.qr-code {
  width: calc(100vw * (116 / 1920));
  height: calc(100vw * (116 / 1920));
}
</style>
