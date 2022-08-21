<template>
  <div class="message_wrapper">
    <Title />
    <div class="container">
        <el-tabs v-model="message">
            <!-- 这里应该封装一个复用 -->
            <el-tab-pane :label="`未读消息（${messageList.unread.length}）`" name="first">
                <el-table :data="messageList.unread" :show-header="false" style="width: 100%">
                    <el-table-column>
                        <template #default="scope">
                            <el-link><span class="title">{{scope.row.title}}</span></el-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop='date' width='180'></el-table-column>
                    <el-table-column width="120">
                        <template #default="scope">
                            <el-button size='small' @click="handleRead(scope.$index)">标为已读</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="handle_row">
                    <el-button type="primary" @click="handleAllRead">全部标为已读</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="`已读消息（${messageList.read.length}）`" name="second">
                <el-table :data="messageList.read" :show-header="false">
                    <el-table-column>
                        <template #default="scope">
                            <el-link><span class="title">{{scope.row.title}}</span></el-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop='date' width='180'></el-table-column>
                    <el-table-column width="120">
                        <template #default="scope">
                            <el-button size='small' @click="handleDel(scope.$index)" type='danger'>删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="handle_row">
                    <el-button type="danger" @click="handleAllDel">全部删除</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="`回收站（${messageList.recycle.length}）`" name="third">
                <el-table :data="messageList.recycle" :show-header="false">
                    <el-table-column>
                        <template #default="scope">
                            <el-link><span class="title">{{scope.row.title}}</span></el-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop='date' width='180'></el-table-column>
                    <el-table-column width="120">
                        <template #default="scope">
                            <el-button type='success' size='small' @click="handleRestore(scope.$index)">还原</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="handle_row">
                    <el-button type="success" @click="handleAllRestore">全部还原</el-button>
                    <el-button type="danger" @click="handleAllClear">清空回收站</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { getMessageList } from '@/api/api.js'
const message = ref('first')
const messageList = reactive({
  unread: [],
  read: [],
  recycle: []
})

const getMessage = async () => {
  try {
    const res = await getMessageList()
    if (res.success) {
      Object.keys(res.data.messageList).forEach(key => {
        messageList[key].push(...res.data.messageList[key])
      })
    }
  } catch (error) {
    console.error(error)
    ELMessage.error('获取消息列表失败')
  }
}
getMessage()

const handleRead = () => {
  console.log('A')
}
const handleDel = () => {
  console.log('B')
}
const handleRestore = () => {
  console.log('C')
}
const handleAllRead = () => {
  console.log('D')
}
const handleAllDel = () => {
  console.log('E')
}
const handleAllRestore = () => {
  console.log('F')
}
const handleAllClear = () => {
  console.log('G')
}
</script>

<style lang='stylus' scoped>
    .title
        cursor pointer
    .handle_row
        margin-top 20px
</style>
