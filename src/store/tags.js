import { defineStore } from 'pinia'
export const useTagsStore = defineStore('tags', {
  state: () => {
    return {
      list: []
    }
  },
  getters: {
    // 标签栏显隐
    show: (state) => {
      return state.list.length > 0
    }
    // nameList: (state) => {
    //   return state.list.map(item => item.name)
    // }
  },
  actions: {
    // 添加新标签
    setTagsItem (data) {
      this.list.push(data)
    },
    // 删除标签
    delTagsItem (index) {
      this.list.splice(index, 1)
    },
    // 清空标签
    clearTags () {
      this.list = []
    },
    // 关闭其他标签
    closeTagsOther (data) {
      console.log(data)
      this.list = []
      this.list.push(data)
    }
  }
})
