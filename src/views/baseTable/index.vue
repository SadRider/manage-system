<template>
<div>
<Title />
<div class="container">
    <div class="explain">基础表格，可根据条件搜索，可编辑、删除行，以及分页功能。</div>
    <div class="handle_box">
        <el-select v-model="query.address" placeholder="地址" class="handle_select mr10" clearable>
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
                <el-tag v-if="item.prop==='state'" :type="scope.row.state===true?'success':'danger'">{{scope.row.state}}</el-tag>
                <span v-else>{{scope.row[item.prop]}}</span>
            </template>
        </el-table-column>
        <el-table-column label='操作' width='180' align='center'>
            <template  #default='scope'>
              <el-link type="primary" @click="editRow(scope.row)"><el-icon><IEpEdit /></el-icon>编辑</el-link>
              <el-link type="danger" style="margin-left: 10px;" @click="delRow(scope.row)"><el-icon><IEpDelete /></el-icon>删除</el-link>
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
      :total="pageTotal"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
</div>
<!-- 编辑框 -->
  <el-dialog title="编辑" v-model="editVisible" width="30%">
    <el-form label-width="70px">
        <el-form-item label="用户名">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
            <el-input v-model="form.address"></el-input>
        </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
    </template>
  </el-dialog>
</div>
</template>

<script setup>
import { tableColumn } from './config'
import { getTableData, delTableData, updateTableData } from '@/api/api.js'
import { reactive } from 'vue'
const query = reactive({
  address: '',
  name: '',
  pageIndex: 1,
  pageSize: 10
})
// 搜索
const handleSearch = async () => {
  console.log('search')
  getData(query)
}

// 模拟获取表格数据
const tableData = ref([])
const pageTotal = ref(0)
const getData = async (query) => {
  try {
    const res = await getTableData(query)
    if (res.success) {
      tableData.value = res.data.tableList
      pageTotal.value = res.data.total
    }
  } catch (error) {
    console.error(error)
    Elmessage.error('获取表格数据失败')
  }
}
getData(query)

// 分页器相关
const handleSizeChange = (val) => {
  query.pageSize = val
  getData(query)
}
const handleCurrentChange = (val) => {
  query.pageIndex = val
  getData(query)
}
// 编辑
const editVisible = ref(false)
const form = reactive({
  id: '',
  name: '',
  address: ''
})
const editRow = (row) => {
  // console.log(row)
  // 字段多写个循环更好
  form.id = row.id
  form.name = row.name
  form.address = row.address

  editVisible.value = true
}
const saveEdit = async () => {
  try {
    const res = await updateTableData(form)
    if (res.success) {
      ElMessage.success(res.message)
      editVisible.value = false
      getData(query)
    }
  } catch (error) {
    console.error(error)
    ElMessage.error('更新失败')
  }
}
// 删除
const delRow = (row) => {
  ElMessageBox.confirm(
    '确定要删除这条内容吗？',
    '警号',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      delTableData(row).then(res => {
        if (res.success) {
          getData(query)
          ElMessage.success(res.message)
        }
      })
        .catch(() => {
          ElMessage.error('删除失败')
        })
    })
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
