<template>
  <div class="login_container">
    <img src="../../../public/img/workRoom.jpeg">
    <div class="ms_login">
      <div class="ms_title">后台管理系统</div>
      <el-form
        :model="param"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="ms_content"
      >
        <el-form-item prop="username">
          <el-input v-model="param.username" placehoder="username">
            <template #prepend>
              <el-button><IEpUser /></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="param.password"
            placeholder="password"
            @keyup.enter="submitForm"
          >
            <template #prepend>
              <el-button><IEpLock /></el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="login_btn">
          <el-button type="primary" @click="submitForm(login)">登录</el-button>
        </div>
        <p class="login_tips">提示：管理员账户：adimi 管理员密码：123456</p>
        <p class="login_tips">普通用户名及密码随意填写</p>

      </el-form>
    </div>
  </div>
</template>

<script setup>
import { userLogin } from '@/api/api'
const router = useRouter()
// 登录表单
const param = reactive({
  username: 'admin',
  password: '123456'
})
// 使用组合式 API，ref引用将存储在与名字匹配的 ref 里(Vue2:this.$refs.login)
const login = ref(null)
// 表单规则
const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // mock的登录接口，登陆成功后会返回路由
      userLogin(param)
        .then((res) => {
          console.log(res)
          if (res.success) {
            ElMessage.success(res.message)
            localStorage.setItem('ms_username', param.username)
            // 保存路由
            localStorage.setItem('ms_routes', JSON.stringify(res.data.router))
            localStorage.setItem('404', JSON.stringify(res.data.notFound))
            router.push('/')
          } else {
            ElMessage.error(res.message)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    } else {
      console.log(fields)
      ElMessage.success(res.message)
      return false
    }
  })
}
</script>

<style lang='stylus' scoped>
.login_container
  position relative
  width 100%
  height 100%
  background-size 100%
  img
    width 100%
    height 100vh
  .ms_login
    position absolute
    left 50%
    top 50%
    transform translate(-50%, -50%) // 相对自身移动50%形成居中
    width 350px
    border-radius 5px
    background rgba(255, 255, 255, 0.3)
    overflow hidden
    .ms_title
      width 100%
      line-height 50px
      text-align center
      font-size 30px
      color #fff
      border-bottom 1px solid #ddd
    .ms_content
      padding 30px
      .login_btn
        text-align center
        button
          width 100%
          height 36px
          margin-bottom 10px
      .login_tips
        font-size 12px
        line-height 30px
        color #000
</style>
