<template>
<div>
<Title />
<div class="container">
    <div class="handle_box">
        <el-select v-model="query.address" placeholder="地址" class="handle_select mr10">
            <el-option key="1" label="广东省" value="广东省"></el-option>
            <el-option key="2" label="湖南省" value="湖南省"></el-option>
        </el-select>
        <el-input v-model="query.name" placeholder="用户名" class="handle_input mr10"></el-input>
        <el-button type="primary" @click="handleSearch"><IEpSearch/>搜索</el-button>
    </div>
    <el-table :data="tableData" border class="table">
        <el-table-column v-for="(item,i) in tableColumn" :key="i" :prop='item.prop' :label='item.label' :width='item.width'
align='center'>
            <template #default='scope'>
                <el-tag v-if="item.prop==='state'" :type="'scope.row.state'==='成功'?'success':'scope.row.state'==='失败'?'danger':''">{{scope.row.state}}</el-tag>
                <span v-else>{{scope.row[item.prop]}}</span>
            </template>
        </el-table-column>
        <el-table-column label='操作' width='180' align='center'>
            <template  #default>
              <el-link type="primary"><el-icon><IEpEdit /></el-icon>编辑</el-link>
              <el-link type="danger" style="margin-left: 10px;"><el-icon><IEpDelete /></el-icon>删除</el-link>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="query.pageIndex"
      v-model:page-size="query.pageSize"
      :page-sizes="[10, 20, 30, 50]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
</div>
</div>
</template>

<script setup>
import { tableColumn } from './config'
import { getTableData } from '@/api/api.js'
const query = reactive({
  address: '',
  name: '',
  pageIndex: 1,
  pageSize: 10
})
const handleSearch = async (query) => {
  console.log('search')
}

const tableData = ref([])
// const pageTotal = ref(0)
const getData = async (query) => {
  try {
    const res = await getTableData(query)
    if (res.success) {
      tableData.value = res.data.list
    //   pageTotal = res.data.pageTotal
    }
  } catch (error) {
    console.error(error)
    Elmessage.error('获取表格数据失败')
  }
}
getData(query)

const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}
</script>

<style lang='stylus' scoped>
.handle_box
    margin-bottom 20px
    .handle_select
        width 120px
    .handle_input
        width 300px
.table
    width 100%
    font-size 14px
    margin-bottom 10px
.mr10
    margin-right 10px
</style>
