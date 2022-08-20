<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <MenuIcon :type='meta.icon' />
                {{meta.title}}
            </el-breadcrumb>
        </div>
    </div>
</template>

<script setup>
const route = useRoute()
const meta = route.meta
console.log(JSON.parse(JSON.stringify(route)))
</script>

<style lang="stylus" scoped>
.el-icon
    color #ccc
</style>
