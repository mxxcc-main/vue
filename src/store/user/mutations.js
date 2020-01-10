import * as types from './mutation-types'

const mutations = {
  [types.SET_ACCOUNT] (state, account) {
    state.account = account
  },
  [types.CLEAR_ACCOUNT](state) {
    state.account = ''
  }
}

export default mutations
