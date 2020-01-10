import storage from 'good-storage'

const ROLE_ACCOUNT = '__account__'; // 账号

function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare) // 查找数组中是否有某个元素
  if (index === 0) { // 第一条数据,就不需要做
    return
  }
  if (index > 0) { // 不是第一条时
    arr.splice(index, 1) // 先删除
  }
  arr.unshift(val) // 再插入到第一条
  if (maxLen && arr.length > maxLen) { // 如果长度有限制,则去除最后一条
    arr.pop()
  }
}

export function saveRoleAccount(account) {
  storage.set(ROLE_ACCOUNT, account)
  return account
}

export function loadRoleAccount() {
  return storage.get(ROLE_ACCOUNT, '')
}

export function clearRoleAccount() {
  storage.remove(ROLE_ACCOUNT)
  return -1
}
