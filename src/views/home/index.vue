<template>
  <div>
    <Header />
    <Menu />
    <div class="content_box" :class="{'content_collapse':sidebar.collapse}">
      <Tags />
      <div class="content">
        <router-view v-slot="{ Component }">
            <transition name="move" mode="out-in">
                <keep-alive :include="tags.nameList">
                    <component :is="Component" />
                </keep-alive>
            </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSidebarStore } from '@/store/sidebar'
import { useTagsStore } from '@/store/tags'
const sidebar = useSidebarStore()
const tags = useTagsStore()
</script>

<style lang='stylus'>
.content_box
  position: absolute
  left: 250px
  right: 0
  top: 70px
  bottom: 0
  padding-bottom: 30px
  -webkit-transition: left .3s ease-in-out
  transition: left .3s ease-in-out
  background: #f0f0f0
  .content
    width: auto
    height: 100%
    padding: 10px
    overflow-y: scroll
    box-sizing: border-box
.content_collapse
  left: 65px

</style>
