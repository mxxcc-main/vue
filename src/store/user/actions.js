import * as types from './mutation-types'
import {
  saveRoleAccount,
  clearRoleAccount
} from 'common/js/cache.js'

export const saveRoleAccountAction = function ({commit}, account) {
  commit(types.SET_ACCOUNT, saveRoleAccount(account))
}

export const clearRoleAccountAction = function ({commit}) {
  commit(types.CLEAR_ACCOUNT, clearRoleAccount())
}

