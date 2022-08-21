<template>
    <el-icon>
        <IEpHomeFilled v-if="type==='HomeFilled'" />
        <IEpGrid v-if="type==='Grid'" />
        <IEpMessage v-if="type==='Message'" />
        <IEpLock v-if="type==='Lock'" />
    </el-icon>
</template>

<script setup>
defineProps({
  type: String
})
</script>

<style lang='stylus' scoped>
</style>
