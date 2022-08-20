<template>
    <el-icon>
        <IEpHomeFilled v-if="type==='HomeFilled'" />
        <IEpGrid v-if="type==='Grid'" />
    </el-icon>
</template>

<script setup>
defineProps({
  type: String
})
</script>

<style lang='stylus' scoped>
</style>
