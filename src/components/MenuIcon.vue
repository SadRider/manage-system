<template>
    <el-icon>
        <IEpHomeFilled v-if="type==='HomeFilled'" />
    </el-icon>
</template>

<script setup>
defineProps({
  type: String
})
</script>

<style lang='stylus' scoped>
</style>
