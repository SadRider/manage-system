<template>
  <div>
    <div class="tags" v-if="tags.show">
      <ul>
        <li class="tags_li" v-for="(item,index) in tags.list" :key="index" :class="{'active':isActive(item.path)}" @contextmenu.prevent="openMenu($event,item)">
          <router-link :to="item.path" class="tags_li_title">{{item.title}}</router-link>
          <span class="tags_li_icon"><!--@click="closeTags(index)"-->
            <el-icon><IEpClose /></el-icon>
          </span>
        </li>
      </ul>
    </div>
    <div class="tags_close_box" v-show="visible" :style="{top:top+'px',left:left+'px'}">
      <ul>
        <li @click="closeTagsOther">关闭其他标签</li>
        <li @click="clearTags">关闭所有标签</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useTagsStore } from '@/store/tags'
import { onBeforeRouteUpdate } from 'vue-router'
// 右键菜单显示条件
const visible = ref(false)
// top、left:右键菜单的坐标
const top = ref(0)
const left = ref(0)
// 记录被右键的标签
let activeTags = {}
const route = useRoute()
const router = useRouter()
// 选择赋予样式
const isActive = (path) => {
  return path === route.fullPath
}
const tags = useTagsStore()

// 添加标签
const setTags = (route) => {
  // some函数：遍历list找出符合条件“item.path === route.fullPath”的item，符合则返回true，否则false
  // 在这里，true表示传入参数的页标签存在
  const isExist = tags.list.some(item => {
    return item.path === route.fullPath
  })
  // 传入参数的页标签不存在，则添加
  if (!isExist) {
    tags.setTagsItem({
      name: route.name,
      title: route.meta.title,
      path: route.fullPath
    })
  }
}
setTags(route)
onBeforeRouteUpdate((to) => {
  setTags(to)
})

// 右键菜单
const openMenu = (e, item) => {
  console.log(e)
  visible.value = true
  activeTags = item
  top.value = e.layerY
  left.value = e.layerX
}

const closeMenu = () => {
  visible.value = false
}
// 关闭页签
// const closeTags = (index) => {
//   tags.delTagsItem(index)
// }
// 关闭其他页签
const closeTagsOther = () => {
  tags.closeTagsOther(activeTags)
  visible.value = false
}
const clearTags = () => {
  tags.clearTags()
  router.push('/')
  visible.value = false
}
// 监听visible，为true添加关闭菜单监听事件，为false时移除事件
watch(visible, (newVal, oldVal) => {
  if (newVal) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
</script>

<style lang='stylus' scoped>
.tags
  position relative
  height 30px
  overflow hidden
  background #fff
  padding-right 120px
  box-shadow 0 5px 10px #ddd
  ul
    box-sizing border-box
    width 100%
    height 100%
    .tags_li
      float left
      margin 3px 5px 2px 3px
      border-radius 3px
      font-size 12px
      cursor pointer
      height 23px
      line-height 23px
      border 1px solid #e9eaec
      background #fff
      padding 0 5px 0 12px
      vertical-align middle
      color #666
      -webkit-transition all 0.3s ease-in
      -moz-transition all 0.3s ease-in
      transition all 0.3s ease-in
      overflow hidden
      &:not(.active):hover
        background #f8f8f8
      .tags_li_title
        float left
        max-width 80px
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        margin-right 5px
        color: #666
    .active
      color #fff
      border: 1px solid #409EFF
      background-color #409EFF
      .tags_li_title
        color #fff
.tags_close_box
  width 150px
  height 80px
  z-index 999
  border 1px solid #e9eaec
  border-radius 3px
  background #fff
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  position absolute
  top 100px
  left 100px
  ul
    box-sizing border-box
    width 100%
    height 100%
    list-style none
    display flex
    flex-direction column
    justify-content center
    li
      // width 100%
      height 30px
      line-height 30px
      color: #666
      cursor pointer
      display inline-block
      padding 0 10px
      &:hover
        background-color #409EFF
        color #fff
</style>
