<template>
  <div class="message_wrapper">
    <Title />
    <div class="container">
        <div class="explain">模拟了消息列表，各个按钮均有对应功能（无详情页）。</div>
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
                            <el-button size='small' @click="handleRead(scope.row)">标为已读</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="handle_row">
                    <el-button type="primary" @click="handleAllRead" :disabled='!messageList.unread.length'>全部标为已读</el-button>
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
                            <el-button size='small' @click="handleDel(scope.row)" type='danger'>删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="handle_row">
                    <el-button type="danger" @click="handleAllDel" :disabled='!messageList.read.length'>全部删除</el-button>
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
                            <el-button type='success' size='small' @click="handleRestore(scope.row)">还原</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="handle_row">
                    <el-button type="success" @click="handleAllRestore" :disabled='!messageList.recycle.length'>全部还原</el-button>
                    <el-button type="danger" @click="handleAllClear" :disabled='!messageList.recycle.length'>清空回收站</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { getMessageList, readMessage, readAllMessage, delMessage, delAllMessage, returnMessage, returnAllMessage, clearAllMessage } from '@/api/api.js'
const message = ref('first')
const messageList = reactive({
  unread: [],
  read: [],
  recycle: []
})

// 这些都是按钮操作的接口，其实功能重复的接口是可以合并起来的
const getMessage = async () => {
  try {
    const res = await getMessageList()
    if (res.success) {
      Object.keys(res.data.messageList).forEach(key => {
        messageList[key] = res.data.messageList[key]
      })
    }
  } catch (error) {
    console.error(error)
    ELMessage.error('获取消息列表失败')
  }
}
getMessage()

const handleRead = async (data) => {
  try {
    const res = await readMessage(data)
    if (res.success) {
      getMessage()
    }
  } catch (error) {
    console.error(error)
    ELMessage.error('已读失败')
  }
}
const handleDel = async (data) => {
  try {
    const res = await delMessage(data)
    if (res.success) {
      getMessage()
    }
  } catch (error) {
    console.error(error)
    ELMessage.error('删除失败')
  }
}
const handleRestore = async (data) => {
  try {
    const res = await returnMessage(data)
    if (res.success) {
      getMessage()
    }
  } catch (error) {
    console.error(error)
    ELMessage.error('还原失败')
  }
}
const handleAllRead = async () => {
  try {
    const res = await readAllMessage()
    if (res.success) {
      getMessage()
    }
  } catch (error) {
    console.error(error)
    ELMessage.error('已读失败')
  }
}
const handleAllDel = async () => {
  try {
    const res = await delAllMessage()
    if (res.success) {
      getMessage()
    }
  } catch (error) {
    console.error(error)
    ELMessage.error('删除失败')
  }
}
const handleAllRestore = async () => {
  try {
    const res = await returnAllMessage()
    if (res.success) {
      getMessage()
    }
  } catch (error) {
    console.error(error)
    ELMessage.error('还原失败')
  }
}
const handleAllClear = async () => {
  try {
    const res = await clearAllMessage()
    if (res.success) {
      getMessage()
    }
  } catch (error) {
    console.error(error)
    ELMessage.error('还原失败')
  }
}
</script>

<style lang='stylus' scoped>
    .title
        cursor pointer
    .handle_row
        margin-top 20px
</style>
