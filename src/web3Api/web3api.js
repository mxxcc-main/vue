import Web3 from "web3"
export default {
  install: function (Vue, options) {
    var web3 = window.web3
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider)//http://47.74.44.123:7575
    } else {//https://mainnet.infura.io/mew
      web3 = new Web3(new Web3.providers.HttpProvider('http://47.74.242.199:7575'))
    }
    Vue.prototype.$web3 = web3
  }
}
