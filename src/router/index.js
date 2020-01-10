import Router from 'vue-router'

import Frame from '@/components/Frame'

import Home from '@/pages/Home'
// 地址搜索页面
import AddressSearch from '@/components/AddressSearch/addressSearch'
// 区块搜索页面
import BlockSearch from '@/components/BlockSearch/BlockSearch'
// 哈希搜索页面
import HashSearch from '@/components/HashSearch/HashSearch'
// 所有区块页面
import AllBlockList from '@/components/AllBlockList/AllBlockList'
// 所有交易页面
import AllTradeList from '@/components/AllTradeList/AllTradeList'
// 交易详情页面 - 移动端
import TradeDetailPhone from '@/components/TradeDetailPhone/TradeDetailPhone'
// 区块详情页面 - 移动端
import BlockDetailPhone from '@/components/BlockDetailPhone/BlockDetailPhone'
//发送方接收方交易详情
import  ToFromPhone from'@/components/TradeDetailPhone/ToFromPhone'
import receiver from '@/components/AddressSearch/receiver'


let router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Frame,
      children: [{
        path: '/home',
        name: 'home',
        component: Home
      },{
        path: '/addresssearch',
        name: 'addresssearch',
        component: AddressSearch
      },{
        path: '/blocksearch',
        name: 'blocksearch',
        component: BlockSearch
      },{
        path: '/hashsearch',
        name: 'hashsearch',
        component: HashSearch
      },{
        path: '/allblocklist',
        name: 'allblocklist',
        component: AllBlockList
      },{
        path: '/alltradelist',
        name: 'alltradelist',
        component: AllTradeList
      },{
        path: '/tradedetailphone',
        name: 'tradedetailphone',
        component: TradeDetailPhone
      },{
        path: '/blockdetailphone',
        name: 'blockdetailphone',
        component: BlockDetailPhone
      },{
        path: '/toFromPhone',
        name: 'toFromPhone',
        component: ToFromPhone
      },

        {
          path: '/receiver',
          name: 'receiver',
          component: receiver
        },


      ]
    },
    {
      path: '/home',
      component: Frame,
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    // TODO 标题国际化
    document.title = to.meta.title
  }
  next()
})

export default router
