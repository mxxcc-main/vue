var Sys = {};

import * as px2rem from 'px2rem-loader'

export function px2Rem (styleStr) {
  let style = `.test{ ${styleStr} }`
  return px2rem(style).replace(/[\r\n]/g, '').match(/\{(.+?)\}/)[1]
}

Date.prototype.format = function(format)
{
  var o = {
    "M+" : this.getMonth()+1, //month
    "d+" : this.getDate(), //day
    "h+" : this.getHours(), //hour
    "m+" : this.getMinutes(), //minute
    "s+" : this.getSeconds(), //second
    "q+" : Math.floor((this.getMonth()+3)/3), //quarter
    "S" : this.getMilliseconds() //millisecond
  }
  if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
    (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,
      RegExp.$1.length==1 ? o[k] :
        ("00"+ o[k]).substr((""+ o[k]).length));
  return format;
};

export function formatSqlTime(dateTime) {
  if (!dateTime) {
    return ''
  }
  const date = new Date(dateTime * 1000)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('-')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function detectiveBrowse() {
  var ua = navigator.userAgent.toLowerCase();
  var s;
  (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
      (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
        (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
          (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
}

/**
 * 判断是否null
 * @param data
 */

//提取富文本的纯文本
export function repalceHtml(str) {
  if(typeof(str) == 'string'){
    var dd = str.replace(/<\/?.+?>/g, "");
    var dds = dd.replace(/ /g, "");//dds为得到后的内容
    return dds;
  }
}

export function isNull(data) {
  return (data == "" || data == undefined || data == null);
}

// 检查手机号
export function checkMobile(s) {
  if (!(/^1[345789]\d{9}$/.test(s))) {
    return false;
  }
  return true;
};

//校验QQ
export function checkQQ(s) {
  var patrn = /^[1-9]\d{4,9}$/;
  if (!patrn.exec(s)) return false
  return true
}

//校验微信号
export function checkWeixin(s) {
  var patrn = /^[a-zA-Z\d_]{5,}$/;
  if (!patrn.exec(s)) return false
  return true
}

//校验密码：只能输入6-20个字母、数字、下划线
export function checkPasswd(s) {
  var patrn = /^(\w){6,20}$/;
  if (!patrn.exec(s)) return false
  return true
}

//校验是否全由数字组成
export function checkDigit(s) {
  var patrn = /^[0-9]{1,20}$/;
  if (!patrn.exec(s)) return false
  return true
}

//一般格式化到时间   new Date(时间戳)
export function formatTime(date) {
  let Y = date.getFullYear();
  let M =date.getMonth() + 1;
  let D = date.getDate();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  M = M < 10 ? `0${M}` : M;
  D = D < 10 ? `0${D}` : D;
  h = h < 10 ? `0${h}` : h;
  m = m < 10 ? `0${m}` : m;s
  s = s < 10 ? `0${s}` : s;
  let time = `${Y}-${M}-${D} ${h}:${m}:${s}`
  return time
}

/*
* 时间戳格式化到天
* @param data {*} - 需要格式化的时间
* @param timeType {*} - 时间的格式 0: Date格式 1:时间戳秒格式
* */
export function formatDay(date, timeType) {
  if(timeType == 1){
    date = new Date(date * 1000);
  }
  let Y = date.getFullYear();
  let M =date.getMonth() + 1;
  let D = date.getDate();
  // let h = date.getHours();
  // let m = date.getMinutes();
  // let s = date.getSeconds();
  M = M < 10 ? `0${M}` : M;
  D = D < 10 ? `0${D}` : D;
  // h = h < 10 ? `0${h}` : h;
  // m = M < 10 ? `0${m}` : m;
  // s = s < 10 ? `0${s}` : s;
  let day = `${Y}-${M}-${D}`
  return day
}

export function getRandomStr(len) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}


export function detectiveNumber(number) {
  var reg = /^[0-9]*$/;
  return reg.test(number);
}


export const QQ_KEY = 'RU7BZ-JPZWQ-M5V52-GUQGH-K5QX6-6QFK4'

//检查以|分隔的价格信息
export function checkPrice(data) {
  if (!/^(\d+\|)*\d+$/.test(data)) {
    return false
  }
  return true
}

//检查以|分隔的规格信息
export function checkSpec(data) {
  if (!/^(.+\|)*.+$/.test(data)) {
    return false
  }
  return true
}

//检查以|分隔的电话号码正确验证
export function checkPhone(data) {
  if (!/^(1[34578]\d{9}\|)*(1[34578]\d{9})$/.test(data)) {
    return false
  }
  return true
}

//邮箱正则
export function checkMail(data) {
  if (!/^(\w+@[0-9a-zA-Z\-]+(\.[a-zA-Z]{2,6}){1,2},)*(\w+@[0-9a-zA-Z\-]+(\.[a-zA-Z]{2,6}){1,2})$/g.test(data)) {
    return false
  }
  return true
}

//检查以,分隔的电话号码正确验证
export function checkTelphone(data) {
  var pattern = /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)/;
  if (pattern.test(data)) {
    return true;
  } else {
    return false;
  }
  // if (!/^(1[34578]\d{9},)*(1[34578]\d{9})$/.test(data)) {
  //   return false
  // }
  // return true
}

// 处理空格
export function dealWidthSpace(data) {
  let newString = data.replace(/\n/g, '_@').replace(/\r/g, '_#');
  newString = newString.replace(/_#_@/g, '<br/>'); //IE7-8
  newString = newString.replace(/_@/g, '<br/>'); //IE9、FF、chrome
  newString = newString.replace(/\s/g, '&nbsp;'); //空格处理
  return newString;
}

export const RegexMatch = [{
  title: '手机号',
  value: '^1[34578]\\d{9}$'
}, {
  title: '身份证',
  value: '(^\\d{15}$)|(^\\d{17}(x|X|\\d)$)'
}, {
  title: '邮箱',
  value: '^\\w+@[0-9a-zA-Z\\-]+(\\.[a-zA-Z]{2,6}){1,2}$'
}, {
  title: '中文',
  value: '^[\u4e00-\u9fa5]+$'
}, {
  title: '数字',
  value: '^[0-9]+$'
}, {
  title: '不限',
  value: ''
}]

export function SectionToChinese(sectionOrigin) {
  var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  var chnUnitChar = ["", "十", "百", "千", "万", "亿", "万亿", "亿亿"];
  var strIns = '', chnStr = '';
  var unitPos = 0;
  var zero = true;
  let section = sectionOrigin
  if (section == 0) {
    return "零";
  }
  if(section >= 10 && section < 20){
    section = section % 10;
    chnStr = "十"
    if(section > 0){
      chnStr += chnNumChar[section]
    }
    return chnStr;
  }
  while (section > 0) {
    var v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    }else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
}


export function formatSecond(second, _this) {
  let D = Math.floor(second / (3600 * 24));
  let h = Math.floor((second -  D * 24 * 3600) / 3600);
  let m = Math.floor((second - D * 24 * 3600 - h * 3600) / 60);
  let s = second - D * 24 * 3600 - h * 3600 - m * 60;
  let str = '';
  if (D) {
    str += `${D}${_this.$t('common.day1')}`;
    str += `${h}${_this.$t('common.hour1')}`;
    str += `${m}${_this.$t('common.minute1')}`;
  } else if (h){
    str += `${h}${_this.$t('common.hour1')}`;
    str += `${m}${_this.$t('common.minute1')}`;
  } else if (m) {
    str += `${m}${_this.$t('common.minute1')}`;
  }

  str += `${s}${_this.$t('common.seconds1')}`;
  return str;
}

export function scrollToButtom () {
  setTimeout(() => {
    const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
    window.scrollTo(0, Math.max(scrollHeight - 1, 0))
  }, 100)
}

export function getHashParameters() {
  var arr = (location.hash || "").replace(/^\#/, '').split("&");
  var params = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].indexOf("?") != -1) {
      var data = arr[i].split("?")[1].split("=");
    } else {
      var data = arr[i].split("=");
    }
    if (data.length == 2) {
      params[data[0]] = data[1];
    }
  }
  return params;
}

export function browser() {
  let ua = navigator.userAgent.toLowerCase()
  let vendor = navigator.vendor.toLowerCase()
  if (/iphone|ipad|ipod/.test(ua) && /apple/.test(vendor)) {
    return 'iphone'
  } else if (/android/.test(ua)) {
    return "android"
  } else {
    return 'pc'
  }
}

// 判断一年有多少周
export function getNumOfWeeks(year){
  var d=new Date(year,0,1);
  var yt=( ( year%4==0 && year%100!=0) || year%400==0)? 366:365;
  return Math.ceil((yt-d.getDay())/7.0);
}

/**
 * 获取一年中第几周 -
 * @param date {*} - 时间戳-到秒
 * */
export function getYearWeek(date) {
  date = new Date(date * 1000);
  var date2 = new Date(date.getFullYear(), 0, 1);
  var day1 = date.getDay();
  if (day1 == 0) day1 = 7;
  var day2 = date2.getDay();
  if (day2 == 0) day2 = 7;
  let d = Math.round((date.getTime() - date2.getTime() + (day2 - day1) * (24 * 60 * 60 * 1000)) / 86400000);
  return Math.ceil(d / 7) + 1;
}


function getFirstAndEnd(d)
{
  var w = d.getDay(), n = 24*60*60*1000;
  var first = new Date(d.getTime() - parseInt("6012345".charAt(w))*n);
  var end = new Date(d.getTime() + parseInt("0654321".charAt(w))*n);
  console.log("------first---", first);
  console.log("------end---", end);
  return {first: first, end: end};
}

/**
 * 将一年中的第几周换算成具体日期 - 一月的第一个星期日算这一年的第一周
 * @param theyear {*} - 年
 * @param weekcount {*} - 第几周
 * */
export function getWeekDate(theyear,weekcount) {
  var year = Number(theyear);
  var week = Number(weekcount) - 1;
  if(year=="" || week=="") return;

  var d = new Date(year, 0, 1);
  // console.log("------d---", d);
  d.setDate(parseInt("1065432".charAt(d.getDay())) + week * 7);
  var fe = getFirstAndEnd(d);
  return fe.first.format("MM月dd日")+"-"+ fe.end.format("MM月dd日");
}
