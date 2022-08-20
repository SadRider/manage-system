<!-- 系统首页 -->
<template>
<div id="dashboard">
    <el-row :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover" class="mgb20 card_a">
        <div class="user_info">
          <img src="../../../public/img/avatar.jpg"  class="user_avator"/>
          <div class="user_info_cont">
            <div class="user_info_name">{{name}}</div>
            <div>{{role}}</div>
          </div>
        </div>
        <div class="user_info_list">
          上次登录时间：<span>2022-01-01</span>
        </div>
        <div class="user_info_list">
          上次登录地址：<span>广东省-广州市</span>
        </div>
      </el-card>
      <el-card shadow="hover" class="card_a">
        <template #header>
          <div class="clearfix">
            <span>语言详情</span>
          </div>
        </template>
        Vue <el-progress :percentage="80" color="#42b983"></el-progress>
        JavaScript <el-progress :percentage="70" color="#f1e05a"></el-progress>
        HTML <el-progress :percentage="60"></el-progress>
        CSS <el-progress :percentage="50" color="#f56c6c"></el-progress>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-row :gutter="20" class="mgb20">
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{padding:'0px'}">
            <div class="grid_content grid_con_1">
              <el-icon class="grid_con_icon">
                <IEpUserFilled />
              </el-icon>
              <div class="grid_cont_right">
                <div class="grid_num">1234</div>
                <div>用户访问量</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{padding:'0px'}">
            <div class="grid_content grid_con_2">
              <el-icon class="grid_con_icon">
                <IEpBellFilled />
              </el-icon>
              <div class="grid_cont_right">
                <div class="grid_num">1234</div>
                <div>系统消息</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{padding:'0px'}">
            <div class="grid_content grid_con_3">
              <el-icon class="grid_con_icon">
                <IEpBriefcase />
              </el-icon>
              <div class="grid_cont_right">
                <div class="grid_num">1234</div>
                <div>数量</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-card shadow="hover" class="card_b">
        <template #header>
          <div class="clearfix">
            <span>待办事项</span>
            <el-button type="text">添加</el-button>
          </div>
        </template>
        <el-table :show-header="false" :data="todoList" style="width: 100%;">
          <el-table-column width="40">
            <template #default="scope">
              <el-checkbox v-model="scope.row.status"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column #default="scope">
            <div class="todo_item" :class="{'todo_item_del':scope.row.status}">
              {{scope.row.title}}
            </div>
          </el-table-column>
          <el-table-column width="150px">
            <template  #default>
              <el-link type="primary"><el-icon><IEpEdit /></el-icon>编辑</el-link>
              <el-link type="danger" style="margin-left: 10px;"><el-icon><IEpDelete /></el-icon>删除</el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card shadow="hover" class="chart">
        <div id="chart_1" style="width: 100%;height: 400px;"></div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card shadow="hover" class="chart">
        <div id="chart_2" style="width: 100%;height: 400px;"></div>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script setup>
import { getTodoListByUsername, getChartsData } from '@/api/api.js'
import * as echarts from 'echarts'
// 这里是用户名卡片相关得
const name = localStorage.getItem('ms_username')
const role = name === 'admin' ? '管理员' : '普通用户'

// 这里是模拟待办列表从接口获取数据
const todoList = reactive([])
const getTodoList = async () => {
  try {
    const data = {
      username: name
    }
    const res = await getTodoListByUsername(data)
    if (res.success) {
      todoList.push(...res.data.todoList)
    }
  } catch (err) {
    console.error(err)
    ElMessage.error('获取待办失败')
  }
}
getTodoList()

// 这里是模拟统计图数据从接口获取
const optionsA = ref({})
const optionsB = ref({})
const getCharts = async () => {
  try {
    const res = await getChartsData()
    if (res.success) {
      optionsA.value = res.data.charts[0]
      optionsB.value = res.data.charts[1]
      const chartA = echarts.init(document.getElementById('chart_1'))
      chartA.setOption(optionsA.value)
      const chartB = echarts.init(document.getElementById('chart_2'))
      chartB.setOption(optionsB.value)
    }
  } catch (err) {
    console.error(err)
    ElMessage.error('获取统计失败')
  }
}
getCharts()
</script>

<style lang="stylus" scoped>
.el-row
  margin-bottom 20px
.mgb20
  margin-bottom 20px
.card_a
  height 252px
.card_b
  height 403px
.user_info
  display flex
  align-items center
  padding-bottom 20px
  border-bottom 2px solid #ccc
  margin-bottom 20px
  .user_avator
    width 120px
    height 120px
    border-radius 50%
  .user_info_cont
    padding-left 50px
    flex 1
    font-size 14px
    color #999
    .user_info_name
      font-size 30px
      color #222
.user_info_list
  font-size 14px
  color #999
  line-height 25px
.grid_content
  display flex
  align-items center
  height 100px
  .grid_con_icon
    font-size 50px
    width 100px
    height 100px
    text-align center
    line-height 100px
    color #fff
  .grid_cont_right
    flex 1
    text-align center
    font-size 14px
    color #999
    .grid_num
      font-size 30px
      font-weight bold
.grid_con_1 .grid_con_icon
  background #2d8cf0
.grid_con_1 .grid_num
  color #2d8cf0
.grid_con_2 .grid_con_icon
  background #64d572
.grid_con_2 .grid_num
  color #64d572
.grid_con_3 .grid_con_icon
  background #f25e43
.grid_con_3 .grid_num
  color #f25e43
.clearfix
  display flex
  justify-content space-between
.todo_item
  font-size 14px
.todo_item_del
  text-decoration line-through
  color #999
.chart
  height 400px
</style>
