<template>
  <div>
    <Title />
    <div class="container">
        <h1>管理员权限页面</h1>
        <p>只有用户名为admin的管理员账号才能进入本页面，其他用户无法进入本页面，通过地址栏输入地址或其他方式尝试进入，则会跳转到404页面。</p>
        <p>该功能通过动态路由实现，在登陆时由后端判断权限，登陆成功后返回本页面路由，在路由守卫beforeEach中使用addRoute方法注册路由。具体实现代码请看路由文件。</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
