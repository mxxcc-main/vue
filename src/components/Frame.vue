<template>
  <div class="frame">
    <m-header :browserType="browserType" :phoneSize="phoneSize"></m-header>

    <transition name="fade">
      <router-view></router-view>
    </transition>
    <gw-footer ></gw-footer>
  </div>
</template>

<script>
  import MHeader from './gw/model/header'
  import gwFooter from './gw/model/footer'
  import {browser} from '@/common/js/utils'

  export default {
    components: {
      MHeader,
      gwFooter
    },
    data() {
      return {
        browserType: '',
        phoneSize: false,
      }
    },
    computed: {

    },
    mounted() {
      this.browserType = browser();
      if(window.innerWidth < 1000) {
        this.phoneSize = true;
      } else {
        this.phoneSize = false;
      }
      window.onresize = () => {
        return (() => {
          if(window.innerWidth < 1000) {
            this.phoneSize = true;
          } else {
            this.phoneSize = false;
          }
          this.$customEvent.$emit('onresize', {
            phoneSize: this.phoneSize
          });
        })()
      }
    }
  }
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    opacity: 1;
    transition: opacity .3s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }



.frame {
  /*background-color: rgb(29, 35, 58);*/
}
</style >
