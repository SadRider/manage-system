<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="header_left">
      <div class="collapse_btn" @click="collapseChange">
        <IEpFold v-if="!sidebar.collapse" />
        <IEpExpand v-else />
      </div>
      <div class="logo" @click="jumpToHome">后台管理系统</div>
    </div>
    <div class="header_right">
      <div class="header_user_con">
        <!-- 消息中心 -->
        <div class="btn_bell">
          <el-tooltip
            effect="dark"
            :content="message ? `有${message}条未读信息` : `消息中心`"
            placement="bottom"
          >
            <el-icon @click="toMessage"><IEpBell /></el-icon>
          </el-tooltip>
          <span class="btn_bell_badge" v-if="message"></span>
        </div>
        <!-- 头像 -->
        <div class="user_avator">
          <img src="../../../public/img/avatar.jpg" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user_name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            admin
            <IEpArrowDown />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="user">个人中心</el-dropdown-item>
              <el-dropdown-item divided command="loginout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- github -->
        <div class="git_avator" @click="jumpToGitHub">
          <img src="../../../public/img/github.jpeg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSidebarStore } from '@/store/sidebar'
const message = 10
const router = useRouter()
// =====================侧边栏折叠=========================
// sidebar:实例化store,可以直接在 store 上访问 state、getters 和 actions 中定义的任何属性
const sidebar = useSidebarStore()
const jumpToHome = () => {
  router.push('/')
}
// 侧边栏折叠
const collapseChange = () => {
  sidebar.handleCollapse()
}

onMounted(() => {
  if (document.body.clientWidth < 1500) {
    collapseChange()
  }
})
// ======================================================

// =======================消息===========================
const toMessage = () => {
  router.push('/message')
}
// ======================================================

// =================用户名下拉菜单事件=====================
const handleCommand = (command) => {
  console.log(command)
  if (command === 'loginout') {
    localStorage.removeItem('ms_username')
    localStorage.removeItem('ms_routes')
    localStorage.removeItem('404')
    router.push('/login')
  } else {
    // router.push('/user')
  }
}
// ======================================================

// 跳转到个人github
const jumpToGitHub = () => {
  window.open('https://github.com/SadRider/manage-system', '_blank')
}
</script>

<style lang='stylus' scoped>
.header
  position relative
  box-sizing border-box
  width 100%
  height 70px
  font-size 22px
  color #fff
  background-color #242f42
  display flex
  justify-content space-between
  .header_left
    display flex
    align-items center
    .collapse_btn
      padding 0 21px
      cursor pointer
    // line-height 70px
    .logo
      margin-left 20px
      cursor pointer
      line-height 70px
  .header_right
    padding-right 50px
    .header_user_con
      display flex
      height 70px
      align-items center
    .btn_bell
      position relative
      width 30px
      height 30px
      text-align center
      border-radius 15px
      cursor pointer
      .btn_bell_badge
        position absolute
        right 0
        top -2px
        width 8px
        height 8px
        border-radius 4px
        background #f56c6c
        color #fff
    .user_avator, .git_avator
      margin-left 20px
    img
      display block
      width 40px
      height 40px
      border-radius 50%
    .git_avator
      cursor pointer
    .user_name
      margin-left 10px
      .el-dropdown-link
        color #fff
        cursor pointer
        display flex
        align-items center
      .el-dropdown-menu__item
        text-align center
</style>
