<template>
  <!-- 通过多个v-for把多层路由遍历成菜单栏,但只考虑到三层菜单的情况 -->
  <!-- 后面可尝试用递归实现多层遍历 -->
  <div class="sidebar">
    <el-menu
      class="sidebar_el_menu"
      :default-active="onRoutes"
      :collapse="sidebar.collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in menuList">
        <template v-if="item.children">
          <el-sub-menu :index="item.path" :key="item.path">
            <template #title>{{ item.meta.title }}</template>
            <template v-for="child in item.children">
              <el-sub-menu
                v-if="child.children"
                :index="child.path"
                :key="child.path"
              >
                <template #title>{{ child.meta.title }}</template>
                <el-menu-item
                  v-for="(item, i) in child.children"
                  :key="i"
                  :index="item.path"
                >
                  {{ item.meta.title }}
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="child.path" :key="child.path">
                <template #title>{{ child.meta.title }}</template>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path" :key="item.path">
            <!-- <component :is="`IEp${item.meta.icon}`" /> -->
            <MenuIcon :type='item.meta.icon' />
            <template #title>{{ item.meta.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { useSidebarStore } from '@/store/sidebar'
const route = useRoute()
const onRoutes = computed(() => {
  return route.path
})
const sidebar = useSidebarStore()
const router = useRouter()
const menuList = router.options.routes[2].children
</script>

<style lang='stylus' scoped>
.sidebar
  width 250px
  display flex
  flex-direction column
  height calc(100vh - 70px)
  /deep/ .el-menu
    flex 1
</style>
