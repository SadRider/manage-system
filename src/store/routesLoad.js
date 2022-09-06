import { defineStore } from 'pinia'
export const routesLoadStore = defineStore('routesLoad', {
  state: () => {
    return {
      routesLoadMark: false // 路由是否加载标记
    }
  },
  getters: {

  },
  actions: {
    setRoutesLoadMark (data) {
      this.routesLoadMark = data
    }
  }
})
