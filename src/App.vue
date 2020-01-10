<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  .btn-prev,.btn-next,.number,.el-icon{
    color: white!important;
  }
    /*解决input文本框移动端点击出钱边框问题*/
input{
  outline: none;
}

  .el-scrollbar{
    background:rgba(28,138,236,0.5)
  }
  .popper__arrow{
    display: none!important;
  }
  .el-select-dropdown__item.selected{
    color: white!important;
  }
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    background: rgba(25, 124, 212, 0.5)
  }
  #app {
    width: 100%;
    min-height: 100vh;
    background: #F7F7F7;
  }

  input {
    background: rgba(0, 0, 0, 0);
    border: none;
  }

  .el-table th, .el-table tr {
    background: rgba(0, 0, 0, 0) !important;
  }

  .el-table tbody tr:hover > td {
    background: rgba(0, 0, 0, 0) !important;
  }

  .el-input__inner {
    border: none !important;
    font-size: 32px;
    padding-left: 0;
    height: 60px;
    width: 100%;
  }

  .el-icon-search {
    font-size: 30px;
    display: flex;
    align-items: center;
  }
  /*.el-input__inner {*/
    /*width: 100%;*/
  /*}*/
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
  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .el-pager li {
    margin: 0;
  }
  .el-pagination button:disabled {
    background: rgba(0,0,0,0) !important;
  }
  .el-pagination .btn-next, .el-pagination .btn-prev {
    background: rgba(0,0,0,0);
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #2F93ED !important;
    color: white;
  }
  .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
    background: rgba(0,0,0,0) !important;
    color: #6E7594;
  }

  .distpicker-address-wrapper select {
    width: 610px !important;
    margin: auto !important;
    font-size: 26px !important;
    padding: 40px 0 !important;
    appearance: none;
    border: none;
    background: #ffffff;
    border-bottom: 1px solid #f2f2f2;
    background: white;
    border-radius: 0;
    /*height: 104px;*/
    /*border-radius: 0 !important;*/
    /*border: none !important;*/
    /*outline: none !important;*/
    /*height: auto !important;*/
    /*border-bottom: 1px solid #f2f2f2 !important;*/
    color: #000 !important;
  }


</style>
