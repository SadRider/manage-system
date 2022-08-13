<template>
  <div>
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/layout/header.vue";
export default {
  name: "homePage",
  components: {
    Header,
  },
};
</script>

<style>
</style>