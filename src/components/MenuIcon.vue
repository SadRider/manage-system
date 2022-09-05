<template>
    <el-icon>
        <IEpHomeFilled v-if="type==='HomeFilled'" />
        <IEpGrid v-if="type==='Grid'" />
        <IEpMessage v-if="type==='Message'" />
        <IEpLock v-if="type==='Lock'" />
        <IEpPlatform v-if="type==='Platform'"/>
        <IEpSetting v-if="type==='Setting'" />
        <IEpEditPen v-if="type==='EditPen'" />
        <IEpHistogram v-if="type==='Histogram'"/>
        <IEpDocument v-if="type==='Document'"/>
    </el-icon>
</template>

<script setup>
defineProps({
  type: String
})
</script>

<style lang='stylus' scoped>
</style>
